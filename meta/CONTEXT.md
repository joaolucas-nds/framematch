# CONTEXT.md — FrameMatch

> Arquivo **estável**. O assistente lê ao abrir cada conversa para se ambientar.
> Muda pouco: só em alteração estrutural (stack, arquitetura, escopo, nova armadilha descoberta).
> Mantenha enxuto — descreve o que o projeto É, não o que está acontecendo agora (isso é o STATUS).

---

## Visão Geral

FrameMatch é um plugin para Figma que preenche frames de catálogo de produtos em massa a partir de uma planilha CSV e uma pasta de imagens. Resolve o problema de ferramentas genéricas (*Paste Data*, *Multi Images Importer*) que dependem da ordem hierárquica das camadas — o FrameMatch mapeia por **nome de camada**, tornando o processo robusto a reorganizações no Figma. O usuário-alvo é um designer/operador que produz catálogos e cartazes de produtos com frequência, a partir de uma planilha Google Sheets.

## Stack Tecnológica

- **Linguagem:** JavaScript vanilla — **ES5 estrito** (sem arrow functions, `let`/`const`, `??`, template literals). O motor JS do sandbox do Figma é antigo e rejeita sintaxe moderna silenciosamente ou com erro de inicialização. Ver DEC-001.
- **Front-end / UI:** HTML + CSS inline, sem frameworks ou bundlers.
- **API:** Figma Plugin API 1.0.0 (`figma.showUI`, `figma.ui.onmessage`, `figma.getNodeById`, `figma.createImage`).
- **Persistência:** nenhuma — toda a configuração vive em memória durante a execução.
- **Testes:** sem suíte. `bash scripts/check.sh` confere só a **sintaxe** (guarda ES5 + `node --check` de `code.js` e do `<script>` do `ui.html`); o **comportamento** só se valida manualmente no Figma Desktop (Windows).
- **Deploy:** arquivos locais, carregados pelo Figma Desktop via `manifest.json`.

## Estrutura do Projeto

```
framematch/
├── code.js                   # thread principal do Figma — acessa a API (figma.*); preenche frames
├── ui.html                   # interface do plugin (iframe isolado) — toda a lógica de matching e UI
├── manifest.json             # metadados: nome, id, entrypoints
├── scripts/check.sh          # validação de sintaxe (ES5 + node --check) — ver Testes
├── CLAUDE.md                 # guia do Claude Code (raiz, lido em todo turno)
├── INSTRUCOES-DO-PROJETO.md  # fonte das Instruções do Projeto (cópia colada no painel do claude.ai)
├── .claude/                  # settings.json + skills /apply-wo, /wrap, /sondar
├── meta/                     # documentos de contexto; meta/workorders/ = WOs (DEC-009)
└── logs/                     # log do dia (AAAA-MM-DD.md)
```

Não há build step nem dependências npm. O plugin em si continua sendo só os três primeiros arquivos.

## Convenções de Código

- **Nomes:** arquivos, funções e variáveis em inglês.
- **Comentários:** em PT-BR; docstring/comentário onde a lógica não é óbvia ou há decisão não-trivial.
- **Commits:** imperativo curto em PT-BR.
- **Estilo:** ES5 estrito (`var`, `function() {}`, concatenação de string com `+`); legibilidade primeiro, performance só se medida.
- **Regra de ouro:** a lógica de normalização **nunca se duplica de forma divergente** — se mudar `norm()` no `code.js`, mude `normName()` no `ui.html` junto (ver armadilha #3).

## Como a arquitetura de dois threads funciona (CRÍTICO)

O Figma executa plugins em dois contextos isolados que só se comunicam via `postMessage`:

- **`code.js`** roda na thread principal do Figma. Tem acesso à API (`figma.*`), mas **não tem acesso ao DOM nem ao filesystem**.
- **`ui.html`** roda num iframe sandboxed. Tem acesso ao DOM e às APIs do browser (FileReader, etc.), mas **não tem acesso à API do Figma**.

Fluxo de uma geração:
1. UI lê o CSV via `FileReader` e armazena em memória.
2. UI lê os arquivos de imagem via `FileReader` → `ArrayBuffer`.
3. Ao clicar "Gerar", UI converte ArrayBuffers em `Array.from(new Uint8Array(...))` e envia tudo via `parent.postMessage`.
4. `code.js` recebe o payload, itera pelos produtos, clona o frame template, preenche textos e imagens.
5. `code.js` envia mensagens de progresso (`prog`) e resultado (`done`/`err`) de volta para a UI.

**Por que `Array.from(Uint8Array)` e não Base64?** Base64 exige decodificação em `code.js`, que não tem `atob` disponível no sandbox. Arrays de inteiros são reconstruídos com `new Uint8Array(arr)` diretamente — ver DEC-004.

## Como o matching de imagens funciona (CRÍTICO)

Há **duas funções de normalização** com papéis distintos — confundi-las foi a fonte de todos os bugs de imagem:

| Função | Onde vive | O que faz | Para que serve |
|---|---|---|---|
| `normName(s)` | `ui.html` e `code.js` (como `norm`) | `trim + toLowerCase` apenas | **Chave de dicionário** — deve ser idêntica nos dois lados |
| `normForMatch(s)` | `ui.html` apenas | Remove **tudo** que não é letra/número | **Comparar** arquivo com CSV (resolve `*`, `/`, `_`, `#`, espaços duplos) |

Fluxo do matching para uma imagem:
1. `buildCsvImageSet(slotIdx)` percorre o CSV e cria um dicionário:
   - chave = `normForMatch(v)` — para achar o arquivo
   - valor = `{ imgsKey: normName(v), display: v }` — `imgsKey` é o que `code.js` vai buscar
2. Para cada arquivo na pasta: `normForMatch(basename)` → busca no dicionário → se encontrou, carrega com chave `entry.imgsKey`.
3. `code.js` busca a imagem com `norm(row[col])`, que é igual a `normName(v)` — chaves coincidem.

**Invariante:** `normName` em `ui.html` deve ser **bit-a-bit idêntico** a `norm` em `code.js`. Qualquer diferença (ex: colapsar espaços) quebra o matching silenciosamente.

## Arquitetura — pontos-chave

> Cada ponto é uma decisão estrutural; o raciocínio completo está no DECISIONS.md.

- ES5 estrito em todo o código — ver DEC-001.
- Imagens sem compressão, bytes crus via ArrayBuffer (nunca canvas) — ver DEC-002.
- Duas funções de normalização com papéis distintos (`normName` × `normForMatch`) — ver DEC-003.
- Transferência de imagens como array de inteiros, não Base64 — ver DEC-004.
- Múltiplos slots de imagem com uma única pasta de origem — ver DEC-005.
- Stepper editável unificado nos 3 campos do Passo 5 — ver DEC-006.
- Nome do projeto: FrameMatch (antes CatalogFiller) — ver DEC-007.

## Armadilhas Conhecidas (o que NÃO fazer)

> A parte mais valiosa do arquivo. Cada armadilha já custou tempo uma vez.
> Formato: o que parece certo → por que está errado → o que fazer em vez disso.

1. **Sintaxe moderna no código** (`??`, `?.`, `const`, arrow function, template literal) — causa erro silencioso ou crash na inicialização; o Figma não reporta claramente. → Sempre ES5; rodar `bash scripts/check.sh` e testar no Figma Desktop após editar `code.js` ou `ui.html`.
2. **Canvas/compressão para pré-processar imagem** — `canvas.toBlob(..., 'image/jpeg')` converte o canal alpha para preto. → Nunca usar canvas; enviar bytes crus via `ArrayBuffer`. Ver DEC-002/FIX-002.
3. **`normName` ≠ `norm`** — se `normName` colapsar espaços múltiplos e `norm` não, produtos com dois espaços no CSV nunca encontram a imagem. → As duas funções devem ser idênticas. Ver FIX-001.
4. **Base64 no sandbox** — `code.js` não tem `atob`; imagem como Base64 vira lixo. → Sempre array de inteiros. Ver DEC-004/FIX-003.
5. **Payload grande no `postMessage`** — imagem acima de ~4MB como array de inteiros explode o JSON (cada byte vira ~1–3 chars) e trava o runtime WASM. → Limitar por `SIZE_LIMIT_MB` e alertar. Ver DEC-003 e HISTORY §2.
6. **`getNodeByIdAsync`** — na API 1.0.0 `figma.getNodeById` é síncrono; não usar a versão async. Ver DEC-001.
7. **WebP enviado ao `figma.createImage`** — o Figma aceita só **PNG, JPEG e GIF** (até 4096px); WebP retorna "unsupported image type". Converter WebP→PNG via canvas cairia na corrupção de transparência da armadilha #2. → Usar PNG/JPG; para reduzir tamanho mantendo alpha, comprimir offline em PNG. Detalhe em HISTORY §4 / DEC nenhum (constraint externo, registrado no IDEAS como descartado).
8. **Script `.sh` com fim de linha CRLF** — o `core.autocrlf` do Git no Windows converte LF→CRLF no checkout, e o bash falha com `$'\r': command not found` ao rodar `scripts/check.sh`. → O `.gitattributes` fixa `*.sh text eol=lf`; script novo de shell herda a regra.

## 📁 Arquivos Críticos (não mexer sem contexto)

> Conhecimento **estável**, não estado do agora — por isso vive aqui, e não no STATUS (movido de lá em 2026-11-03, merge do kit v1.133.0).

- `code.js` — thread principal do Figma. Usa `norm()` (trim+lowercase, sem colapsar espaços). Qualquer mudança aqui exige verificar `normName()` no `ui.html` para manter paridade. Suporta `imageMappings` (array) e `deleteTemplate` — versões antigas do ui.html são incompatíveis.
- `ui.html` — toda a lógica de matching e UI. As funções `normName` e `normForMatch` são o coração do sistema de imagens — leia DEC-003 e FIX-001 antes de tocar. O Passo 5 usa o helper `stepField`/`clampField` para os steppers (DEC-006).
- `manifest.json` — o `id` (`framematch-plugin-v1`) não muda: o `clientStorage` está preso a ele (DEC-007).

## Contexto de Produto

- **Usuário-alvo:** designer/operador que monta catálogos e cartazes de produtos a partir de planilhas Google Sheets, no Figma Desktop (Windows).
- **Dor que resolve:** plugins genéricos (Paste Data, Multi Images Importer) dependem de ordenação hierárquica de camadas, quebrando com qualquer reorganização. O FrameMatch mapeia por nome, é previsível.
- **O que é sucesso:** gerar 100+ frames de produto com texto e imagem corretos, sem travar o Figma, em menos de 2 minutos.
- **O que o projeto deliberadamente NÃO é:** editor de template, gerador de PDF, ferramenta de versionamento de catálogo. O Figma faz o layout; o plugin só preenche dados.
