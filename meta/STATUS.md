# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log da sessão.
> Médio e longo prazo NÃO ficam aqui — ficam no ROADMAP.

---

## Versão Atual
**[0.3.0]** — 2026-05-30 — última versão **validada** (múltiplos slots de imagem + correção do bug de espaços duplos).

> **0.4.0 (rename FrameMatch + stepper editável do Passo 5)** está implementado nesta sessão (2026-06-15), porém **ainda não testado no Figma** — está em "Em Progresso" e em `[Não lançado]` no CHANGELOG. Vira versão lançada após o primeiro teste bem-sucedido.

## ✅ Funcionando

- Preenchimento de texto em massa: coluna CSV → camada de texto no frame, mapeamento por nome, auto-mapeamento automático.
- Matching de imagens com `normForMatch`: resolve `*`, `/`, `_`, `#`, espaços duplos, MT² e qualquer caractere especial que o Windows remove de nomes de arquivo.
- Múltiplos slots de imagem (ex: imagem principal + secundária), cada um com coluna e camada independentes.
- Auto-mapeamento de slots de imagem: detecta camadas não-TEXT com nome igual a colunas do CSV.
- Auto-detecção do frame template por nome (lista configurável: `template`, `produto`, etc.).
- Pular Passo 4 automaticamente quando não há slots de imagem configurados.
- Limitador de tamanho (padrão: 4 MB): imagens grandes aparecem em laranja e são puladas.
- Checkboxes "Ocultar template" e "Excluir template" com padrões configuráveis no topo do script.
- Imagens transferidas como `ArrayBuffer → Array.from(Uint8Array)` — sem compressão, sem corrupção de transparência.

## 🔧 Em Progresso

- **0.4.0 — implementado, aguardando teste no Figma:**
  - Rename CatalogFiller → **FrameMatch** (manifest, `code.js`, documentos) — ver DEC-007.
  - **Stepper editável** nos 3 campos do Passo 5 (Por linha, Espaço X, Espaço Y): botões +/− para ajuste fino **e** caixa para digitar valores grandes — ver DEC-006.

## ❌ Quebrado / Com Problema

- Nenhum bug ativo conhecido.

## 📋 Backlog (curto prazo — itens acionáveis)

- [ ] **Testar o stepper editável (0.4.0):** clicar +/−, digitar valor direto, digitar valor inválido/vazio e sair do campo (clamp), conferir que o resumo da grade atualiza e que a geração usa os valores corretos.
- [ ] Confirmar que o Figma reflete o novo nome **FrameMatch** após substituir os arquivos; se não, re-importar o `manifest.json` uma vez (o `id` mudou — ver DEC-007).
- [ ] Testar 0.3.0/0.4.0 com um CSV real e pasta de imagens, confirmando o bug dos espaços duplos resolvido e múltiplos slots funcionando.
- [ ] Confirmar que PNG com transparência chega sem fundo preto.

## 📁 Arquivos Críticos (não mexer sem contexto)

- `code.js` — thread principal do Figma. Usa `norm()` (trim+lowercase, sem colapsar espaços). Qualquer mudança aqui exige verificar `normName()` no `ui.html` para manter paridade. Suporta `imageMappings` (array) e `deleteTemplate` — versões antigas do ui.html são incompatíveis.
- `ui.html` — toda a lógica de matching e UI. As funções `normName` e `normForMatch` são o coração do sistema de imagens — leia DEC-003 e FIX-001 antes de tocar. O Passo 5 usa o helper `stepField`/`clampField` para os steppers (DEC-006).

## 💬 Última Sessão

**2026-06-15** — Renomeado o projeto para **FrameMatch** (DEC-007). Implementado o **stepper editável** no Passo 5: um único controle `[−] [caixa] [+]` para os 3 campos numéricos, com helper genérico `stepField`/`clampField` (DEC-006). Pesquisa de domínio (plugins de catálogo no Figma) e investigação de WebP: **o Figma não aceita WebP** em `figma.createImage` (só PNG/JPEG/GIF) — virou armadilha #7 no CONTEXT e ideia descartada no IDEAS. Item 6 (matching por nome de frame / modo índice) descartado: concorre com o paradigma de clonar template e o caso de múltiplas imagens já é resolvido por múltiplos slots (DEC-005). Próximo passo óbvio: testar o stepper e o novo nome no Figma Desktop.
