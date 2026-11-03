# WO 0003 — F4: Offset X/Y no Passo 5 e catálogo no lugar do template (0.5.0)

> **Tipo:** mista — WO de CODIGO (`code.js`, `ui.html`) + registro (`meta/`, log).
> **Config sugerida:** Opus · `/effort high` (codigo; o diff e exato, mas a validacao real e do dono).
> **Pre-requisito:** `main` em `95db958`, igual a `origin/main`; pendentes so os 2 arquivos do chat abaixo e esta WO.
> **Base:** spec `meta/specs/261103-offset-e-posicao-do-grid.md` aprovada pelo dono em 2026-11-03 («Spec da F4 aprovada como esta»).
> **Arquivos que o chat gravou no disco e esta WO versiona** (sha1 medido ao gravar — Edicao 0 confere):
>   - `meta/specs/261103-offset-e-posicao-do-grid.md` — `07a5151c3ae0f6008be5c8c425e1bde1a325ef61`
>   - `meta/GLOSSARY.md` — `9e7fa7c550a3741c94cd705dd21a0a6baf75efdc`
> **Ancora semantica:** ancora que nao bater EXATAMENTE (1 ocorrencia) = **PARE e reporte**.
> **Idempotencia:** texto novo inteiro ja presente e ancora ausente (salvo forma «trocar») = PULE e diga no relatorio.
> **Ancoras lidas em:** todas lidas NESTE turno do chat, de copias tiradas do disco as 18h (`device_stage_files`, mtimes conferidos), e conferidas por simulacao a partir do texto desta WO: `code.js` (`figma.showUI`, `ox`/`oy` em `runGenerate`), `ui.html` (linha `grid-info`, `DEFAULT_DELETE_TEMPLATE`, fim de `updateDelWarn`, `stepField`, `clampField`, ligacoes de `g-rg`, leitura de `rg`, payload `grid`), `meta/DECISIONS.md` (ultimo item da DEC-009), `meta/STATUS.md`, `meta/CHANGELOG.md`, `meta/ROADMAP.md`, `meta/IDEAS.md`, `logs/2026-11-03.md`. Trecho literal no bloco «Ancora» de cada edicao.
> **Fim de linha:** alvos em LF. Se a copia de trabalho estiver em CRLF, ancora de varias linhas nao casa com `\n` — use a ferramenta Edit (lida com isso) e nao reescreva o arquivo inteiro.

> **Canal dos meta neste ciclo = CODE.** Esta WO e o registro (3a-3j). Spec e GLOSSARY ja gravados pelo chat — so `git add`.

---

## 1. Por que

Implementar a spec aprovada: Offset X/Y como ajuste do ponto de partida, catalogo no lugar do template quando ele e excluido, e a origem calculada com o template vivo (corrige o grid nascendo na posicao velha quando o template e movido depois do Passo 2).

## Fora de escopo

- Persistir offsets (F5). Template dentro de auto-layout. Deteccao de re-geracao. Aviso de `tpl.remove()` falho (virou ideia na 3i).
- Nao renomear nem reformatar codigo vizinho; nao mexer nos 3 steppers antigos alem da assinatura dos helpers.

---

## Edicao 0 — conferir os arquivos do chat

```
sha1sum meta/specs/261103-offset-e-posicao-do-grid.md meta/GLOSSARY.md
```

Hash diferente do cabecalho = **PARE e reporte**.

## Edicao 1a — `code.js` · topo do arquivo, chamada `figma.showUI`

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
figma.showUI(__html__, { width: 520, height: 700 });
```

**Texto novo:**

```
figma.showUI(__html__, { width: 520, height: 700 });

// Distância entre o template e o 1º frame quando o template NÃO é excluído (DEC-010).
// O ui.html tem um espelho desta constante só para o texto do Passo 5 — mantenha os dois iguais.
var GRID_GAP_RIGHT = 60;
```

## Edicao 1b — `code.js` · `runGenerate`, leitura de `ox`/`oy`

**Substituir.** Ancora:

```
    var ox = msg.grid.ox || 0;
    var oy = msg.grid.oy || 0;
```

**Texto novo:**

```
    // Origem do grid calculada com o template VIVO, na hora de gerar (não a posição lida no Passo 2).
    // Excluir template → o catálogo nasce no lugar dele; senão, à direita, a GRID_GAP_RIGHT px.
    // offX/offY = ajuste do usuário no Passo 5, padrão 0 (DEC-010).
    var offX = msg.grid.offX || 0;
    var offY = msg.grid.offY || 0;
    var ox = (msg.deleteTemplate ? tpl.x : tpl.x + W + GRID_GAP_RIGHT) + offX;
    var oy = tpl.y + offY;
```

## Edicao 2a — `ui.html` · HTML do Passo 5, linha `grid-info`

**Substituir (âncora repetida no texto novo).** Ancora:

```
    <div id="grid-info" style="margin-top:8px;color:#555;font-size:11px;"></div>
```

**Texto novo:**

```
    <!-- Offset X/Y — ajuste somado ao ponto de partida do grid (DEC-010); aceita negativos -->
    <div class="g-p5" style="margin-top:10px;">
      <div class="field-col">
        <label>Offset X (px)</label>
        <div class="num-stepper">
          <button class="btn-adj" id="btn-ox-minus" type="button">−</button>
          <input type="number" id="g-ox" value="0" step="10">
          <button class="btn-adj" id="btn-ox-plus" type="button">+</button>
        </div>
      </div>
      <div class="field-col">
        <label>Offset Y (px)</label>
        <div class="num-stepper">
          <button class="btn-adj" id="btn-oy-minus" type="button">−</button>
          <input type="number" id="g-oy" value="0" step="10">
          <button class="btn-adj" id="btn-oy-plus" type="button">+</button>
        </div>
      </div>
    </div>
    <div id="grid-info" style="margin-top:8px;color:#555;font-size:11px;"></div>
    <div id="grid-origin" style="margin-top:3px;color:#555;font-size:11px;"></div>
```

## Edicao 2b — `ui.html` · constantes do topo do `<script>`, linha `DEFAULT_DELETE_TEMPLATE`

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
var DEFAULT_DELETE_TEMPLATE = true;   // ← mude aqui: Excluir template
```

**Texto novo:**

```
var DEFAULT_DELETE_TEMPLATE = true;   // ← mude aqui: Excluir template

// Espelho do GRID_GAP_RIGHT do code.js — usado só no texto do ponto de partida (DEC-010).
// Se mudar lá, mude aqui.
var GRID_GAP_RIGHT = 60;
```

## Edicao 2c — `ui.html` · fim de `updateDelWarn()`

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
  document.getElementById('lbl-hide').style.opacity = del ? '0.4' : '1';
```

**Texto novo:**

```
  document.getElementById('lbl-hide').style.opacity = del ? '0.4' : '1';
  // Ponto de partida do grid segue o "Excluir template" — mesmo critério do code.js (DEC-010)
  document.getElementById('grid-origin').textContent = del
    ? 'Ponto de partida: no lugar do template (ele será excluído)'
    : 'Ponto de partida: à direita do template (+' + GRID_GAP_RIGHT + ' px)';
```

## Edicao 2d — `ui.html` · `stepField` — assinatura e fallback do NaN

**Substituir.** Ancora:

```
// stepField — ajusta o input pelo passo, respeita o mínimo, atualiza o resumo.
function stepField(id, delta, min, step) {
  var inp = document.getElementById(id);
  var cur = parseInt(inp.value, 10);
  if (isNaN(cur)) { cur = min; }
```

**Texto novo:**

```
// stepField — ajusta o input pelo passo, respeita o mínimo, atualiza o resumo.
// fallback (opcional): valor de partida quando a caixa está vazia; sem ele, usa o mínimo.
function stepField(id, delta, min, step, fallback) {
  var inp = document.getElementById(id);
  var cur = parseInt(inp.value, 10);
  if (isNaN(cur)) { cur = (fallback !== undefined) ? fallback : min; }
```

## Edicao 2e — `ui.html` · `clampField` — assinatura e fallback do NaN

**Substituir.** Ancora:

```
function clampField(id, min) {
  var inp = document.getElementById(id);
  var v = parseInt(inp.value, 10);
  if (isNaN(v) || v < min) { v = min; }
```

**Texto novo:**

```
// fallback (opcional): valor quando a caixa está vazia/não numérica; sem ele, usa o mínimo.
// Os offsets precisam disso: vazio vira 0, não o mínimo de -100000 (DEC-010).
function clampField(id, min, fallback) {
  var inp = document.getElementById(id);
  var v = parseInt(inp.value, 10);
  if (isNaN(v)) { v = (fallback !== undefined) ? fallback : min; }
  if (v < min) { v = min; }
```

## Edicao 2f — `ui.html` · ligações dos steppers, depois de Espaço Y

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
document.getElementById('g-rg').onchange = function() { clampField('g-rg', 0); };
```

**Texto novo:**

```
document.getElementById('g-rg').onchange = function() { clampField('g-rg', 0); };

// Offset X/Y — passo 10, aceita negativos; vazio vira 0 (DEC-010)
var OFFSET_MIN = -100000;
document.getElementById('btn-ox-minus').onclick = function() { stepField('g-ox', -1, OFFSET_MIN, 10, 0); };
document.getElementById('btn-ox-plus').onclick  = function() { stepField('g-ox',  1, OFFSET_MIN, 10, 0); };
document.getElementById('g-ox').onchange = function() { clampField('g-ox', OFFSET_MIN, 0); };
document.getElementById('btn-oy-minus').onclick = function() { stepField('g-oy', -1, OFFSET_MIN, 10, 0); };
document.getElementById('btn-oy-plus').onclick  = function() { stepField('g-oy',  1, OFFSET_MIN, 10, 0); };
document.getElementById('g-oy').onchange = function() { clampField('g-oy', OFFSET_MIN, 0); };
```

## Edicao 2g — `ui.html` · `btn-gen.onclick`, leitura de `rg`

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
  var rg   = parseInt(document.getElementById('g-rg').value)   || 0;
```

**Texto novo:**

```
  var rg   = parseInt(document.getElementById('g-rg').value)   || 0;
  var offX = parseInt(document.getElementById('g-ox').value, 10) || 0;
  var offY = parseInt(document.getElementById('g-oy').value, 10) || 0;
```

## Edicao 2h — `ui.html` · `btn-gen.onclick`, campo `grid` do payload

**Substituir.** Ancora:

```
    grid: { cols: cols, cGap: cg, rGap: rg, ox: TPL.x + TPL.w + 60, oy: TPL.y },
```

**Texto novo:**

```
    // A origem (ox/oy) é calculada no code.js com o template vivo; aqui vai só o ajuste (DEC-010)
    grid: { cols: cols, cGap: cg, rGap: rg, offX: offX, offY: offY },
```

## Edicao 3a — `meta/DECISIONS.md` · fim da DEC-009

**Substituir (âncora = último item da DEC-009; repetida no texto novo).** Ancora:

```
- Fechadas as pendências da DEC-008: `HISTORICO.md` → `HISTORY.md`; Arquivos Críticos migraram do STATUS para o CONTEXT.
```

**Texto novo:**

```
- Fechadas as pendências da DEC-008: `HISTORICO.md` → `HISTORY.md`; Arquivos Críticos migraram do STATUS para o CONTEXT.

---

## DEC-010 — Ponto de partida do grid: segue o «Excluir template», com Offset X/Y como ajuste
**Data:** 2026-11-03 · **Status:** aceita

### Contexto
O grid nascia sempre 60 px à direita do template, com a posição lida no Passo 2. Com «Excluir template» marcado (padrão) sobrava um buraco no lugar do template, e não havia como escolher onde o catálogo nasce. Spec: `meta/specs/261103-offset-e-posicao-do-grid.md` (aprovada pelo dono).

### Decisão
- O **ponto de partida** segue o checkbox «Excluir template»: marcado → no lugar do template; desmarcado → à direita, a `GRID_GAP_RIGHT` (60 px). «Ocultar template» não muda o ponto de partida.
- **Offset X/Y** no Passo 5 é um AJUSTE somado ao ponto de partida, padrão 0/0, aceita negativos.
- A origem é calculada no `code.js` com o template **vivo** (`tpl.x`, `tpl.y`, `tpl.width`) na hora de gerar; o `ui.html` manda só `offX`/`offY`.

### Alternativas consideradas
- **Coordenada absoluta do canvas** — obrigaria a ler X/Y no Figma e digitar; padrão dependeria do template.
- **Offset padrão 60 como distância do template** — teria de virar 0 ao marcar «Excluir»: estado escondido.
- **Seletor «Posição do catálogo»** — controle a mais para o que o checkbox já decide.

### Consequências
- Offset 0/0 reproduz o comportamento da 0.4.0 quando «Excluir» está desmarcado.
- Corrige o defeito latente da posição velha (template movido depois do Passo 2).
- `GRID_GAP_RIGHT` existe nos dois lados (o `ui.html` só para o texto); divergir quebra só o texto, não a geração.
- `stepField`/`clampField` ganharam parâmetro opcional `fallback` (vazio → 0 nos offsets); os 3 campos antigos não mudam.
```

## Edicao 3b — `meta/STATUS.md` · corpo de «🔧 Em Progresso»

**Substituir.** Ancora:

```
- Nada em progresso. Próxima frente no Backlog.
```

**Texto novo:**

```
- **0.5.0 — implementada, aguardando teste no Figma:** Offset X/Y no Passo 5 + catálogo no lugar do template ao excluir + origem calculada com o template vivo (spec `meta/specs/261103-offset-e-posicao-do-grid.md`, DEC-010).
```

## Edicao 3c — `meta/STATUS.md` · corpo de «📋 Backlog»

**Substituir.** Ancora:

```
- [ ] **Retomar o desenvolvimento:** Offset X/Y no Passo 5 + posição do template ao excluir (F4), depois `clientStorage` (F5).
```

**Texto novo:**

```
- [ ] **Testar a 0.5.0 no Figma Desktop** — roteiro do chat a partir dos critérios de aceite da spec.
- [ ] Depois: detecção de re-geração (resto da F4) ou `clientStorage` (F5).
```

## Edicao 3d — `meta/STATUS.md` · título da última seção

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
## 💬 Última conversa
```

**Texto novo:**

```
## 💬 Última conversa

**2026-11-03 (noite)** — F4: spec do Offset X/Y + catálogo no lugar do template aprovada (`meta/specs/`, primeira spec do projeto) e implementada pela WO 0003 (DEC-010). Aguarda o roteiro de teste no Figma para virar 0.5.0.
```

## Edicao 3e — `meta/CHANGELOG.md` · topo, corpo de `[Não lançado]`

**Substituir.** Ancora:

```
## [Não lançado]

_(nada ainda)_
```

**Texto novo:**

```
## [Não lançado]

> Implementado em 2026-11-03, **aguardando teste no Figma**. Vira **0.5.0** após validação.

### Adicionado
- **Offset X/Y no Passo 5** (DEC-010): dois steppers (passo 10, aceitam negativos) que deslocam o catálogo a partir do ponto de partida; padrão 0/0.
- **Catálogo no lugar do template:** com «Excluir template após gerar» marcado, o 1º frame nasce na posição do template, sem deixar buraco. Uma linha no Passo 5 diz o ponto de partida.

### Corrigido
- A origem do grid usava a posição do template lida no Passo 2; agora usa a posição na hora de gerar (template movido depois da seleção).
```

## Edicao 3f — `meta/ROADMAP.md` · F4, item do Offset

**Substituir.** Ancora:

```
- [ ] **Offset X/Y do grid** configurável no Passo 5 (onde os frames aparecem no canvas).
```

**Texto novo:**

```
- 🟢 **Offset X/Y do grid** + catálogo no lugar do template ao excluir (DEC-010) — *implementado, aguardando teste.*
```

## Edicao 3g — `meta/IDEAS.md` · ideia de 2026-07-17 «Ao excluir o template…», campo Status

**Substituir (trecho no fim da linha).** Ancora:

```
**Status:** não implementada; não estava registrada até agora (relacionada, mas distinta, da ideia de "offset X/Y configurável").
```

**Texto novo:**

```
**Status:** implementada na WO 0003, aguardando teste (DEC-010, spec `meta/specs/261103-offset-e-posicao-do-grid.md`).
```

## Edicao 3h — `meta/IDEAS.md` · ideia de 2026-05-30 «Offset X/Y configurável», fim do texto

**Substituir (trecho no fim da linha).** Ancora:

```
Encaixa bem agora que o Passo 5 ganhou o componente de stepper (DEC-006).
```

**Texto novo:**

```
Encaixa bem agora que o Passo 5 ganhou o componente de stepper (DEC-006). **Status:** implementada na WO 0003 como ajuste somado ao ponto de partida, aguardando teste (DEC-010).
```

## Edicao 3i — `meta/IDEAS.md` · título da seção do assistente

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
## 🤖 Ideias Ativas — Assistente
```

**Texto novo:**

```
## 🤖 Ideias Ativas — Assistente

### 2026-11-03 — Avisar quando a exclusão do template falhar
O `code.js` faz `try { tpl.remove(); } catch(e) {}`: se a exclusão falhar (template travado, por exemplo), ninguém fica sabendo — e no modo «no lugar do template» (DEC-010) ele fica escondido debaixo do 1º frame. Ideia: mandar um `warn` na mensagem `done` e mostrar no Passo 5. Pequena; sem pressa até alguém tropeçar.
```

## Edicao 3j — `logs/2026-11-03.md` · fim do arquivo

**Substituir (âncora = última linha do arquivo; repetida no texto novo).** Ancora:

```
- Próximo: F4 — Offset X/Y + posição do template ao excluir.
```

**Texto novo:**

```
- Próximo: F4 — Offset X/Y + posição do template ao excluir.

### Noite — F4 (Offset X/Y + catálogo no lugar do template)
- Spec escrita e aprovada pelo dono: `meta/specs/261103-offset-e-posicao-do-grid.md` (a pasta `meta/specs/` nasce aqui).
- Achado na leitura do código: a origem do grid usava a posição do template do Passo 2 (template movido depois ficava com a posição velha) → corrigido movendo o cálculo para o `code.js`.
- Achado: `clampField` mandaria vazio para o mínimo (−100000 nos offsets) → helpers ganharam `fallback` opcional; registrado na spec (decisão 4) e na DEC-010.
- Achado: o `code.js` já usa `async`/`await` e funciona no sandbox; a regra ES5 segue valendo para código novo.
- DEC-010 registrada; WO 0003 implementa (código + registro). Ideia nova: avisar quando `tpl.remove()` falhar.
- O shell do chat no computador do dono ficou indisponível nesta parte; leitura e gravação foram feitas por cópia de arquivos.
```

---

## Armadilhas desta WO

- **ES5** nos dois arquivos (DEC-001): o texto novo so usa `var`, `function`, `+` e ternario. O `code.js` ja tem `async`/`await` — nao e licenca para arrow/`let`/`const`.
- Os `−` dos botoes novos sao o caractere U+2212 (igual aos botoes existentes), nao hifen.

## Depois de aplicar — conferencia antes do commit

- [ ] `git status --short` mostra **so**: `M` em `code.js`, `ui.html`, `meta/GLOSSARY.md`, `meta/DECISIONS.md`, `meta/STATUS.md`, `meta/CHANGELOG.md`, `meta/ROADMAP.md`, `meta/IDEAS.md`, `logs/2026-11-03.md`; `??` em `meta/specs/` e nesta WO. Fora disso: VERMELHO.
- [ ] Saldo de linhas (`wc -l`, simulado pelo chat): `code.js` 159 → 168 · `ui.html` 1008 → 1052 · `meta/DECISIONS.md` 222 → 246 · `meta/STATUS.md` 48 → 51 · `meta/CHANGELOG.md` 73 → 80 · `meta/ROADMAP.md` 62 → 62 · `meta/IDEAS.md` 81 → 84 · `logs/2026-11-03.md` 41 → 49. Diferente: VERMELHO.
- [ ] `grep -c '^var GRID_GAP_RIGHT = 60;' code.js ui.html` → **1** e **1**
- [ ] `grep -c 'ox: TPL.x' ui.html` → **0** (o calculo antigo saiu)
- [ ] `grep -c '^## DEC-010' meta/DECISIONS.md` → **1**
- [ ] `grep -c 'id="g-o[xy]"' ui.html` → **2** (linhas)
- [ ] `bash scripts/check.sh` → saida 0 (ES5: 0 violacoes; node --check ok). Responde so «a sintaxe e ES5?».
- [ ] **Teste manual que a validacao NAO cobre:** o comportamento no Figma e do dono — o chat entrega o roteiro (formato do `_TEMPLATE`) a partir dos criterios de aceite da spec. **Chega no ramo?** o roteiro passa por `runGenerate` (`code.js`, calculo de `ox`/`oy`) e por `btn-gen.onclick`/`updateDelWarn`/`stepField`/`clampField` (`ui.html`). **Pergunta que este checklist NAO responde:** «presta?» — so o X/Y do 1º frame no Figma responde.

## Relatorio de aplicacao

Como manda `/apply-wo`; grave tambem em `../AAMMDD-HHMM-code-framematch-apply-wo0003.txt`.

## Commit — blocos separados, mensagem SEM acento

```
git add code.js ui.html meta/specs/261103-offset-e-posicao-do-grid.md meta/GLOSSARY.md meta/DECISIONS.md meta/STATUS.md meta/CHANGELOG.md meta/ROADMAP.md meta/IDEAS.md logs/2026-11-03.md meta/workorders/261103-wo0003-f4-offset-grid.md
```

```
git commit -m "feat(grid): offset X/Y no Passo 5 e catalogo no lugar do template ao excluir" -m "Origem do grid calculada no code.js com o template vivo; offX/offY somados ao ponto de partida (DEC-010). Spec em meta/specs. Aguarda teste no Figma para virar 0.5.0."
```

```
git push
```

*Escrita a partir do modelo `meta/workorders/_TEMPLATE.md` (Kit de Contexto Universal v1.133.0).*
