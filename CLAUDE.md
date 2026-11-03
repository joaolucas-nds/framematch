# FrameMatch — guia para o Claude Code

> Arquivo-raiz lido pelo Claude Code em todo turno. Mantenha CURTO (< 200 linhas).
> Regra prática: se remover uma linha e o Claude ainda acerta, ela não pertence aqui. Procedural detalhado → skill em `.claude/skills/`.
> O comportamento detalhado do assistente está em `meta/CEREBRO.md`.

## Ritual de início
Leia `meta/CEREBRO.md` → `meta/CONTEXT.md` → `meta/STATUS.md` antes de agir. Confirme em uma frase o que entendeu.

## O projeto em 3 linhas
Plugin do Figma (3 arquivos: `code.js`, `ui.html`, `manifest.json`) que preenche frames em massa a partir de CSV + pasta de imagens, casando por nome de camada. Sem build, sem dependências, sem suíte de testes. O único ambiente que roda o plugin é o Figma Desktop — o Code não o executa.

## Validação
- **Antes de commitar código:** `bash scripts/check.sh` — guarda ES5 + `node --check` de `code.js` e do `<script>` do `ui.html`. Saída 0 = limpo. Responde «a sintaxe é ES5?», NÃO «o plugin funciona?».
- **«Funciona?» é do dono, no Figma Desktop.** Mudança de comportamento ou de UI fecha com um roteiro de teste manual no relatório (o que abrir, o que fazer, o que se vê quando está certo). Nunca declare testado o que só passou no `check.sh`.
- Mudança só de doc (`meta/`) NÃO precisa de validação; a rede é o `git diff`.

## Regras que não se negociam (detalhe em `meta/CONTEXT.md`, armadilhas)
- **ES5 estrito** em `code.js` e `ui.html` (DEC-001): `var`, `function(){}`, `+` — nada de arrow, `let`/`const`, template literal, `??`, `?.`.
- **`normName` (ui.html) ≡ `norm` (code.js)** bit a bit (DEC-003, FIX-001). Tocou numa, confira a outra.
- **Imagem é byte cru:** `ArrayBuffer` → `Array.from(Uint8Array)`. Nunca canvas/compressão (FIX-002), nunca Base64 (FIX-003). WebP não serve em `figma.createImage`.
- **`id` do `manifest.json` não muda** — o `clientStorage` some junto (DEC-007).

## Convenções
- Nomes em inglês; comentários em PT-BR. Mensagens de commit em PT-BR, imperativo curto, **sem acento**.
- Edições nos `meta/` são **append-only** pelo Code (STATUS, DECISIONS, CHANGELOG, log do dia); curadoria que reescreve vem do chat (arquivo inteiro OU WO).
- Ao aplicar uma WO de `meta/workorders/`: ache cada âncora exatamente; se não achar, PARE e reporte. Não mexa fora das edições nomeadas. `git diff` antes do commit.
- **Ao fechar a tarefa, RELATE o trabalho** — o que fez, achados e desvios do que a tarefa pedia, arquivos tocados, resultado da validação e o commit. **Não** copie o bloco de fecho do `meta/CEREBRO.md`: aquele é da raia de planejamento.

## Quando eu pedir medição
- Se eu pedir para **medir**, o pedido não tem âncora nem commit: não edite, não conserte, não sugira.
- Responda com o **número cru e o comando que o produziu**. Suspeita, se houver, vem depois e separada.
- Alvo fora da raiz depende de `permissions.additionalDirectories` no `.claude/settings.json`. Leitura negada: DIGA — não estime.

## Push e relatório — nesta ordem, sempre
- **Verde** (`check.sh` passou, ou WO só de doc com o `git diff` conferido) → `add`, `commit` e **`push`, sem perguntar.**
- **Vermelho** (validação falhou, âncora não encontrada, `git diff` com arquivo fora do previsto) → **não commite e não empurre.** Feche com menu de opções pela ferramenta `AskUserQuestion` (recomendada em 1); sem a ferramenta, menu numerado em texto, dizendo que caiu no fallback.
- **O relatório é o ÚLTIMO passo** — só depois de resolvido o push, dizendo o que de fato aconteceu (empurrado com o hash, ou não empurrado com o motivo).

## Relatório em arquivo (sempre, sem pedir)
- Ao fechar QUALQUER tarefa (`/apply-wo`, `/wrap`, `/sondar`), grave o MESMO relatório em `../AAMMDD-HHMM-code-framematch-<ato>-<alvo>.txt` (pasta-pai, fora do git). `<ato>` ∈ `apply` · `wrap` · `probe` · `explore`. `<alvo>` = a WO (`wo0001`) ou duas/três palavras com hífen. `AAMMDD-HHMM` sai de `date +%y%m%d-%H%M`, rodado na hora.
- Se a escrita for negada, DIGA e siga — o relatório no chat continua sendo a entrega.

## Config (modelo × esforço)
- WO com diff exato já validado → **Sonnet**, esforço baixo/médio.
- Tarefa com julgamento sem rede (código novo de F4/F5, WO que delega decisão) → **Opus**, esforço alto.
