# DECISIONS.md — Registro de Decisões

> Arquivo que **cresce devagar**. Guarda o PORQUÊ — o que o código sozinho não conta.
> Duas naturezas: **DEC** (decisões de arquitetura/design) e **FIX** (bugs graves resolvidos, para não repetir).
> Não reescreva entradas antigas; se uma decisão for substituída, marque «SUPERADA por DEC-N» e adicione a nova.
> Quando passar de ~700 linhas, mova as mais antigas para `DECISIONS-archive.md`.

---

## Como usar
Cada decisão recebe um ID sequencial (DEC-001, DEC-002…) e segue o formato ADR simplificado abaixo. Bugs graves usam FIX-001, FIX-002… com sintoma/causa/solução/lição.

---

## DEC-001 — ES5 estrito em todo o código
**Data:** 2026-05-30 · **Status:** aceita

### Contexto
O motor JavaScript do sandbox de plugins do Figma é antigo (baseado em V8 de versão desatualizada). Operadores modernos como `??`, `?.`, template literals e arrow functions causam erro de parsing na inicialização — frequentemente sem mensagem clara, apenas "ocorreu um erro ao executar o plugin".

### Decisão
Todo o código em `code.js` e `ui.html` usa ES5 estrito: `var`, `function() {}`, concatenação de string com `+`, sem `const`/`let`.

### Alternativas consideradas
- **Babel/transpiler** — adicionaria um build step e complexidade desnecessária para um projeto de dois arquivos.

### Consequências
Código mais verboso, mas 100% compatível. Qualquer contribuição futura deve respeitar ES5.

---

## DEC-002 — Imagens sem compressão (ArrayBuffer bruto)
**Data:** 2026-05-30 · **Status:** aceita

### Contexto
Versões intermediárias (v6–v8) usavam `canvas.toBlob(..., 'image/jpeg', 0.85)` para comprimir imagens antes de enviá-las ao Figma, com o objetivo de reduzir o payload do `postMessage`. O resultado foi catastrófico: PNGs com fundo transparente chegavam com fundo **preto**, porque o canvas converte alpha para branco/preto ao exportar como JPEG.

### Decisão
Imagens são lidas como `ArrayBuffer` puro via `FileReader.readAsArrayBuffer` e enviadas como `Array.from(new Uint8Array(buffer))` — sem canvas, sem compressão, sem reencoding.

### Alternativas consideradas
- **Canvas com PNG** — evitaria o fundo preto, mas ainda recodifica a imagem, pode alterar cores e é mais lento.
- **Compressão no lado do code.js** — code.js não tem acesso a APIs de imagem.

### Consequências
Imagens acima de ~4MB travam o runtime WASM do Figma (payload JSON muito grande). Mitigado pelo limitador `SIZE_LIMIT_MB`. Solução a longo prazo: ferramenta externa de compressão em lote (ver IDEAS.md / ROADMAP F4).

---

## DEC-003 — Duas funções de normalização com papéis distintos
**Data:** 2026-05-30 · **Status:** aceita

### Contexto
Matching de imagens envolve dois problemas distintos: (a) comparar nomes de arquivo com valores do CSV ignorando caracteres que o Windows remove/substitui, e (b) manter uma chave de dicionário consistente entre `ui.html` e `code.js`.

Usar uma única função para os dois papéis gera conflito: normalização agressiva (remover tudo não-alfanumérico) quebra a paridade com `norm()` do `code.js`; normalização fraca (só lowercase) não resolve `*`, `/`, `_`.

### Decisão
Duas funções separadas:
- `normName(s)` = `trim + toLowerCase` apenas → **chave de dicionário**, idêntica a `norm()` do `code.js`.
- `normForMatch(s)` = `trim + toLowerCase + replace(/[^a-z0-9]/g, '')` → **comparação** arquivo↔CSV.

### Alternativas consideradas
- **Uma função só** — simplificaria o código mas exigiria mudar `norm()` no `code.js`, arriscando regressões nos textos.

### Consequências
`normName` e `norm()` devem ser mantidas sincronizadas. Qualquer mudança em uma exige mudança na outra.

---

## DEC-004 — Transferência de imagens como array de inteiros
**Data:** 2026-05-30 · **Status:** aceita

### Contexto
`postMessage` aceita objetos serializáveis em JSON. ArrayBuffer não é diretamente serializável. As alternativas são: (a) Base64, (b) Array de inteiros.

Base64 foi tentado (v9): `code.js` não tem `atob` no sandbox do Figma, então `new Uint8Array("iVBOR...")` gera um array de códigos de caractere ASCII — lixo binário completamente diferente da imagem original.

### Decisão
Converter via `Array.from(new Uint8Array(buffer))` no `ui.html` antes de enviar. `code.js` reconstrói com `new Uint8Array(arr)` diretamente.

### Alternativas consideradas
- **Base64** — não funciona: `code.js` não tem `atob`. Ver FIX-003.
- **Transferable objects** — a API de `postMessage` do Figma pode não suportar `transfer`.

### Consequências
Array de inteiros tem overhead de ~3x em JSON (cada byte 0–255 ocupa 1–3 chars). Uma imagem de 4MB vira ~8–12MB de JSON. Daí o limitador de tamanho.

---

## DEC-005 — Múltiplos slots de imagem com uma única pasta de origem
**Data:** 2026-05-30 · **Status:** aceita

### Contexto
O usuário pediu suporte a múltiplos campos de imagem por produto (ex: foto principal + foto de detalhe). A questão de UX era: uma pasta por slot ou uma pasta para todos?

### Decisão
Uma única pasta de imagens alimenta todos os slots. O matching ocorre em paralelo: para cada arquivo, verifica contra todos os slots. Isso é possível porque os arquivos de imagem de slots diferentes têm nomes diferentes (vindos de colunas diferentes do CSV).

### Alternativas consideradas
- **Uma pasta por slot** — mais controle, mas obrigaria o usuário a selecionar pastas múltiplas vezes. Desnecessário se os nomes dos arquivos forem únicos por slot.

### Consequências
Se dois slots apontam para a mesma coluna CSV e os arquivos têm o mesmo nome, o segundo slot não carrega (o `break` do loop interrompe após o primeiro match). Caso incomum na prática. **Nota:** este é o mecanismo que cobre o caso "vários frames de imagem por produto" (ex: `frame 1`…`frame 4` como colunas/camadas) — não confundir com matching por nome de frame externo (descartado, ver IDEAS).

---

## DEC-006 — Stepper editável unificado no Passo 5
**Data:** 2026-06-15 · **Status:** aceita

### Contexto
No Passo 5, "Por linha" usava apenas botões +/− com um display estático (ótimo para ajuste fino, lento para saltos grandes), enquanto "Espaço X" e "Espaço Y" eram inputs numéricos crus, sem botões. Resultado: inconsistência visual e dificuldade de mudar valores grandes rapidamente.

### Decisão
Um único controle `num-stepper` no formato `[−] [caixa editável] [+]`, aplicado aos **3 campos** (Por linha, Espaço X, Espaço Y). Os botões fazem ajuste pelo passo (Por linha: passo 1, mín. 1; Espaços: passo 5, mín. 0); a caixa central aceita digitação direta para valores grandes. Toda a lógica é centralizada em dois helpers ES5: `stepField(id, delta, min, step)` e `clampField(id, min)` (sanitiza valor digitado ao sair do campo). As setas nativas do `input[type=number]` foram ocultadas (o ajuste é pelos botões). Layout do Passo 5 mudou de grid de 3 colunas para pilha vertical (label à esquerda, stepper à direita) para caber bem na largura estreita da janela do plugin.

### Alternativas consideradas
- **Só caixa de texto** — perderia o ajuste por clique, que o usuário considerou intuitivo.
- **Só botões (estado anterior do "Por linha")** — ruim para valores grandes.
- **Três colunas lado a lado** — não cabe confortavelmente na janela estreita do plugin; daí a pilha vertical.

### Consequências
Consistência visual e um único componente para manter. O `g-cols` deixou de ser `input[type=hidden]` e virou input visível, então a validação de mínimo precisa rodar tanto no clique (`stepField`) quanto na digitação direta (`clampField` no `onchange`). O payload de geração não mudou — `parseInt` lê os mesmos ids (`g-cols`, `g-cg`, `g-rg`).

---

## DEC-007 — Rename do projeto: CatalogFiller → FrameMatch
**Data:** 2026-06-15 · **Status:** aceita

### Contexto
O nome de trabalho "CatalogFiller" era descritivo, mas o usuário quis um nome próprio mais curto e memorável para a ferramenta. Candidatos avaliados: FrameMatch, LayerMatch, GridFill, Sheet2Grid, Catalogr, Frame-Match-Sheet.

### Decisão
O projeto passa a se chamar **FrameMatch** — curto, fácil de falar, e comunica o diferencial (casar dados por nome em frames). Alterados: `manifest.json` (`name` e `id` → `framematch-plugin-v1`), o cabeçalho de `code.js` e todos os documentos de contexto.

### Alternativas consideradas
- **Frame-Match-Sheet** — descritivo (cobre os três pilares), mas longo e hifenizado, incomum para nome de plugin.
- **LayerMatch / GridFill / Sheet2Grid / Catalogr** — viáveis; FrameMatch venceu por clareza + concisão.
- **Manter só o `name` e não mudar o `id`** — evitaria re-importar o manifest, mas deixaria o id antigo (`catalogfiller-...`) como inconsistência. Como ainda não há dados em `figma.clientStorage`, este é o melhor momento para trocar o id (antes da persistência entrar — ROADMAP F5).

### Consequências
Identidade do projeto unificada. **Atenção operacional:** como o `id` do manifest mudou, o Figma pode tratar o plugin como novo — se o nome não atualizar sozinho ao substituir os arquivos, basta re-importar o `manifest.json` uma vez (Plugins → Development → Import plugin from manifest). *(Não verifiquei se o re-import é estritamente necessário na sua versão do Figma; instrução conservadora.)*

---

## FIX-001 — Bug de espaços duplos: normName colapsava espaços, norm() do code.js não
**Data:** 2026-05-30

- **Sintoma:** CSV com `ARM ACO  AMEIXA` (dois espaços) aparecia como "encontrado" nos chips verdes, mas a imagem não era inserida no frame.
- **Causa raiz:** `normName` no `ui.html` aplicava `.replace(/\s+/g, ' ')` (colapsa múltiplos espaços em um). Então a chave salva em `IMGS` era `"arm aco ameixa"` (1 espaço). O `norm()` do `code.js` fazia só `trim + toLowerCase`, resultando em `"arm aco  ameixa"` (2 espaços). Chaves diferentes → `images[rawName]` retornava `null` → imagem ignorada silenciosamente.
- **Solução:** Remover o `.replace(/\s+/g, ' ')` de `normName`. Agora `normName` e `norm()` são bit-a-bit idênticos. O matching de arquivo continua via `normForMatch` (que remove tudo não-alfanumérico, resolvendo o espaço duplo por outro caminho).
- **Lição:** `normName` no `ui.html` deve ser **sempre idêntico** a `norm()` no `code.js`. Virou armadilha #3 no CONTEXT.md.

---

## FIX-002 — Canvas compression corrompeu PNG transparente
**Data:** 2026-05-30

- **Sintoma:** Imagens de louças e cubas (PNG com fundo transparente) apareciam com fundo **preto** no Figma após geração.
- **Causa raiz:** O `ui.html` usava `canvas.getContext('2d').drawImage` + `canvas.toBlob(..., 'image/jpeg', 0.85)` para comprimir imagens. O formato JPEG não suporta transparência — o canvas renderiza o canal alpha como preto.
- **Solução:** Remover completamente o pipeline de compressão via canvas. Usar `FileReader.readAsArrayBuffer` diretamente, sem reencoding. Imagens grandes são descartadas pelo limitador `SIZE_LIMIT_MB` em vez de comprimidas.
- **Lição:** Nunca usar canvas para pré-processar imagens que possam ter transparência. Virou armadilha #2 no CONTEXT.md.

---

## FIX-003 — Base64 em v9: code.js não tem atob
**Data:** 2026-05-30

- **Sintoma:** v9 encontrava as imagens (chips verdes), mas nenhuma era inserida no Figma.
- **Causa raiz:** v9 enviava imagens como Base64 (`btoa(binary)`). `code.js` tentava `new Uint8Array(base64String)` — que cria um Uint8Array do tamanho do string, preenchido com os code points dos caracteres ASCII, não com os bytes da imagem.
- **Solução:** Voltar para `Array.from(new Uint8Array(arrayBuffer))` no envio e `new Uint8Array(arr)` na reconstrução. Ver DEC-004.
- **Lição:** Não existe `atob` no sandbox de plugins do Figma.

---

## FIX-004 — csvSet com duas chaves por produto causava chips duplicados
**Data:** 2026-05-30

- **Sintoma:** Passo 4 mostrava cada produto duas vezes na lista de status (um chip verde e um vermelho para o mesmo produto).
- **Causa raiz:** Uma versão intermediária do `buildCsvImageSet` registrava `set[normName(v)] = v` E `set[normForMatch(v)] = v` para cada produto. Como o `renderImgStatus` iterava sobre todas as chaves do dicionário, produtos com caracteres especiais apareciam duas vezes.
- **Solução:** Estrutura nova com uma única chave por produto: `set[normForMatch(v)] = { imgsKey: normName(v), display: v }`. A chave de busca é `normForMatch`; o valor carrega a chave de dicionário (`imgsKey`) e o nome de exibição separados.
- **Lição:** Separar explicitamente "chave de busca", "chave de dicionário" e "valor de exibição" em estruturas de dados diferentes. Misturar papéis numa única chave gera bugs sutis.
