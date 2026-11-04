# WO 0005 — Preparar a publicação na Community (0.6.0): dynamic-page, UI em inglês, README

> **Tipo:** mista — WO de CODIGO (`manifest.json`, `code.js`, `ui.html`) + registro (`meta/`, log).
> **Config sugerida:** Opus · `/effort high` (muitas edicoes de codigo, todas exatas; a validacao real e do dono).
> **Pre-requisito:** `main` em `45d390d`, igual a `origin/main`; pendentes so os 4 arquivos do chat abaixo e esta WO.
> **Base:** spec `meta/specs/261104-publicacao-community-0.6.0.md`; decisao do dono em 2026-11-04 («Community publica, UI em ingles»).
> **Arquivos que o chat gravou no disco e esta WO versiona** (sha1 medido ao gravar — Edicao 0 confere):
>   - `meta/specs/261104-publicacao-community-0.6.0.md` — `1c7aba401a3d5ea85fd79bfdf79975fefc62ceb4`
>   - `README.md` — `88202a394ec03f9c5c02990aacc57f5f53a19116`
>   - `CLAUDE.md` — `bac60a0b951cd533a9b6f84e739887789bd3ac2d`
>   - `meta/CONTEXT.md` — `8b0893f1a9a03646245d6efc4ee5c0251f68311e`
> **Ancora semantica:** ancora que nao bater no numero de ocorrencias indicado = **PARE e reporte**. **Idempotencia:** texto novo inteiro presente e ancora ausente (salvo «trocar») = PULE e diga.
> **Ancoras lidas em:** todas copiadas por script do disco NESTE turno do chat (2026-11-04) e conferidas por simulacao a partir do texto desta WO, com contagem de ocorrencias: `manifest.json`, `code.js` (handler `get-selection`, inicio/fim de `runGenerate`), `ui.html` (todas as strings da Tabela T, `TEMPLATE_NAMES`, `updateGridInfo`, `btn-gen.onclick`, tela e handler `done`), `meta/DECISIONS.md` (ultimo item da DEC-010), `meta/STATUS.md`, `meta/CHANGELOG.md`, `meta/ROADMAP.md`, `meta/IDEAS.md`.
> **Fim de linha:** LF. Arquivos com emoji e caracteres como `＋` e `■`: aplique por script/Edit com UTF-8, nunca por `sed` de terminal do Windows.

> **Canal dos meta neste ciclo = CODE.** Esta WO e o registro (5a-6g e Edicao 7). Spec, README, CLAUDE.md e CONTEXT ja gravados pelo chat — so `git add`.

---

## 1. Por que

Publicar na Community exige `documentAccess: "dynamic-page"` (e com ele `getNodeById` sincrono lanca erro), pede UI fiel, sem erro tecnico cru e com documentacao. O dono decidiu: Community publica, UI em ingles (DEC-011).

## Fora de escopo

- Trocar o `id` do manifest (so depois do «Publish»). `.webp` escolhido segue falhando mudo (virou ideia, 6g). Bilingue (Adiadas). Comentarios de codigo continuam em PT-BR — **nao traduza comentarios**.
- Nao reformatar codigo vizinho.

---

## Edicao 0 — conferir os arquivos do chat

```
sha1sum meta/specs/261104-publicacao-community-0.6.0.md README.md CLAUDE.md meta/CONTEXT.md
```

Hash diferente do cabecalho = **PARE e reporte**.

## Edicao 1a — `manifest.json` · linha `ui`

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
  "ui": "ui.html",
```

**Texto novo:**

```
  "ui": "ui.html",
  "documentAccess": "dynamic-page",
  "networkAccess": { "allowedDomains": ["none"] },
```

## Edicao 2a — `code.js` · handler `get-selection`, mensagem de nada selecionado

**Substituir.** Ancora:

```
err: 'Nada selecionado. Selecione um frame no Figma primeiro.'
```

**Texto novo:**

```
err: 'Nothing is selected. Select a frame in Figma first.'
```

## Edicao 2b — `code.js` · início de `runGenerate`

**Substituir.** Ancora:

```
    var tpl = figma.getNodeById(msg.templateId);
    if (!tpl) { figma.ui.postMessage({ type: 'err', msg: 'Template nao encontrado. Volte ao Passo 2.' }); return; }
```

**Texto novo:**

```
    // dynamic-page (DEC-011): a leitura síncrona por id lança erro nesse modo; usar a versão Async.
    var tpl = await figma.getNodeByIdAsync(msg.templateId);
    if (!tpl) { figma.ui.postMessage({ type: 'err', msg: 'The template frame was not found (was it deleted?). Go back to Step 2 and select it again.' }); return; }
```

## Edicao 2c — `code.js` · exclusão do template

**Substituir.** Ancora:

```
    if (msg.deleteTemplate) { try { tpl.remove();         } catch(e) {} }
```

**Texto novo:**

```
    // Exclusão que falha (ex.: template travado) não pode ser muda: no modo «no lugar do
    // template» ele ficaria escondido sob o 1º frame. A UI avisa (DEC-011).
    var templateNotRemoved = false;
    if (msg.deleteTemplate) { try { tpl.remove(); } catch(e) { templateNotRemoved = true; } }
```

## Edicao 2d — `code.js` · mensagem `done`

**Substituir.** Ancora:

```
    figma.ui.postMessage({ type: 'done', count: msg.rows.length });
```

**Texto novo:**

```
    figma.ui.postMessage({ type: 'done', count: msg.rows.length, templateNotRemoved: templateNotRemoved });
```

## Edicao 2e — `code.js` · `catch` de `runGenerate`

**Substituir.** Ancora:

```
    figma.ui.postMessage({ type: 'err', msg: String(err.message || err) });
```

**Texto novo:**

```
    // Frase para o usuário + detalhe técnico para o suporte (diretrizes de revisão do Figma, DEC-011).
    figma.ui.postMessage({ type: 'err', msg: 'Something went wrong while generating. Details: ' + String(err.message || err) });
```

## Tabela T — `ui.html` · traducao dos textos visiveis (77 substituicoes)

Cada item: texto antigo EXATO → texto novo, com o numero de ocorrencias esperado no arquivo ANTES de aplicar. Conte antes (`grep -cF` conta linhas; use contagem de ocorrencias, ex. `python -c` com `.count()`); numero diferente = **PARE e reporte**. Troque **todas** as ocorrencias do item. Os itens sao disjuntos: a ordem nao importa.

### T01 — 1×

```
<html lang="pt-BR">
```

```
<html lang="en">
```

### T02 — 1×

```
<h2>📊 Planilha CSV</h2>
```

```
<h2>📊 CSV spreadsheet</h2>
```

### T03 — 1×

```
<p class="sub">Exporte do Google Sheets: <strong style="color:#ccc">Arquivo → Fazer download → CSV</strong> e carregue aqui.</p>
```

```
<p class="sub">Export from Google Sheets: <strong style="color:#ccc">File → Download → Comma-separated values (.csv)</strong> and load it here.</p>
```

### T04 — 1×

```
Clique para selecionar o CSV
```

```
Click to choose the CSV file
```

### T05 — 1×

```
ou arraste o arquivo aqui
```

```
or drag the file here
```

### T06 — 1×

```
<div class="card-title">Colunas</div>
```

```
<div class="card-title">Columns</div>
```

### T07 — 1×

```
Pré-visualização
```

```
Preview
```

### T08 — 1×

```
<h2>📐 Frame Template</h2>
```

```
<h2>📐 Template frame</h2>
```

### T09 — 1×

```
Selecione o frame template no Figma e clique abaixo. Se o frame tiver um nome padrão reconhecido, ele é detectado automaticamente.
```

```
Select the template frame in Figma and click below. If the frame has a recognized default name, it is detected automatically.
```

### T10 — 1×

```
💡 Camada de texto chamada <strong style="color:#ddd">Marca</strong> recebe a coluna <strong style="color:#ddd">Marca</strong>. Para imagem, o nome pode ser qualquer um — você mapeia no Passo 3.
```

```
💡 A text layer named <strong style="color:#ddd">Brand</strong> receives the <strong style="color:#ddd">Brand</strong> column. Image layers can have any name — you map them in Step 3.
```

### T11 — 1×

```
🎯 Frame detectado automaticamente pelo nome.
```

```
🎯 Frame detected automatically by its name.
```

### T12 — 1×

```
📌 Usar Frame Selecionado no Figma
```

```
📌 Use the frame selected in Figma
```

### T13 — 1×

```
<div class="card-title">Camadas</div>
```

```
<div class="card-title">Layers</div>
```

### T14 — 1×

```
<h2>🔗 Mapeamento</h2>
```

```
<h2>🔗 Mapping</h2>
```

### T15 — 1×

```
Conecte cada coluna CSV à camada correta no frame.
```

```
Connect each CSV column to the right layer in the frame.
```

### T16 — 1×

```
Campos de Texto
```

```
Text fields
```

### T17 — 2×

```
✨ Auto-mapear
```

```
✨ Auto-map
```

### T18 — 2×

```
>Coluna CSV</span>
```

```
>CSV column</span>
```

### T19 — 2×

```
>Camada Figma</span>
```

```
>Figma layer</span>
```

### T20 — 1×

```
Campos de Imagem
```

```
Image fields
```

### T21 — 2×

```
＋ Adicionar slot
```

```
＋ Add slot
```

### T22 — 1×

```
>Modo</span>
```

```
>Mode</span>
```

### T23 — 1×

```
Nenhum slot de imagem. Clique em
```

```
No image slots yet. Click
```

### T24 — 1×

```
ou use Auto-mapear.
```

```
or use Auto-map.
```

### T25 — 1×

```
<h2>🖼️ Imagens</h2>
```

```
<h2>🖼️ Images</h2>
```

### T26 — 1×

```
Selecione a pasta com <strong style="color:#ccc">todas</strong> as imagens. Apenas as que tiverem correspondência nos slots configurados serão carregadas.
```

```
Choose the folder with <strong style="color:#ccc">all</strong> the images. Only the ones that match the configured slots are loaded.
```

### T27 — 1×

```
<strong style="color:#ddd;">Matching inteligente:</strong> ignora caracteres especiais, espaços extras, *, #, _, / e similares — só letras e números importam na comparação. Imagens acima de 
```

```
<strong style="color:#ddd;">Smart matching:</strong> ignores special characters, extra spaces, *, #, _, / and the like — only letters and numbers count in the comparison. Images over 
```

### T28 — 1×

```
 são puladas (chip laranja).
```

```
 are skipped (orange chip).
```

### T29 — 1×

```
Clique para selecionar a pasta de imagens
```

```
Click to choose the image folder
```

### T30 — 1×

```
JPG, PNG, WEBP — subpastas incluídas automaticamente
```

```
JPG, PNG, GIF — subfolders included automatically
```

### T31 — 1×

```
⏳ Filtrando imagens...
```

```
⏳ Filtering images...
```

### T32 — 1×

```
arquivos na pasta
```

```
files in the folder
```

### T33 — 1×

```
serão inseridas
```

```
will be inserted
```

### T34 — 1×

```
Status por produto —
```

```
Status per product —
```

### T35 — 1×

```
■ grande
```

```
■ too large
```

### T36 — 1×

```
■ não encontrada
```

```
■ not found
```

### T37 — 1×

```
<h2>🚀 Configurar e Gerar</h2>
```

```
<h2>🚀 Set up and generate</h2>
```

### T38 — 1×

```
Configure o layout da grade e gere os frames do catálogo.
```

```
Set the grid layout and generate the catalog frames.
```

### T39 — 1×

```
<div class="card-title">Grade</div>
```

```
<div class="card-title">Grid</div>
```

### T40 — 1×

```
<label>Por linha</label>
```

```
<label>Per row</label>
```

### T41 — 1×

```
<label>Espaço X (px)</label>
```

```
<label>Gap X (px)</label>
```

### T42 — 1×

```
<label>Espaço Y (px)</label>
```

```
<label>Gap Y (px)</label>
```

### T43 — 1×

```
Ocultar template após gerar
```

```
Hide template after generating
```

### T44 — 1×

```
Excluir template após gerar
```

```
Delete template after generating
```

### T45 — 1×

```
⚠️ O frame template será <strong>removido permanentemente</strong> do Figma após a geração.
```

```
⚠️ The template frame will be <strong>permanently removed</strong> from Figma after generating.
```

### T46 — 4×

```
⚡ Gerar Catálogo
```

```
⚡ Generate catalog
```

### T47 — 1×

```
Gerando frames...
```

```
Generating frames...
```

### T48 — 1×

```
frames gerados!
```

```
frames generated!
```

### T49 — 1×

```
🔄 Gerar novamente
```

```
🔄 Generate again
```

### T50 — 1×

```
← Voltar
```

```
← Back
```

### T51 — 1×

```
<span id="step-label">Passo 1 de 5</span>
```

```
<span id="step-label">Step 1 of 5</span>
```

### T52 — 1×

```
Próximo →
```

```
Next →
```

### T53 — 1×

```
alert('Carregue o CSV primeiro.')
```

```
alert('Load the CSV first.')
```

### T54 — 1×

```
alert('Selecione um frame template primeiro.')
```

```
alert('Select a template frame first.')
```

### T55 — 1×

```
var TITLES = ['CSV', 'Template', 'Mapeamento', 'Imagens', 'Gerar'];
```

```
var TITLES = ['CSV', 'Template', 'Mapping', 'Images', 'Generate'];
```

### T56 — 1×

```
'Passo ' + CUR + ' de 5'
```

```
'Step ' + CUR + ' of 5'
```

### T57 — 1×

```
alert('CSV inválido ou vazio!')
```

```
alert('This CSV is empty or could not be read.')
```

### T58 — 1×

```
CSV.rows.length + ' produtos, ' + CSV.cols.length + ' colunas'
```

```
CSV.rows.length + ' products, ' + CSV.cols.length + ' columns'
```

### T59 — 1×

```
Nenhuma sub-camada.
```

```
No child layers.
```

### T60 — 1×

```
— não mapear —
```

```
— skip —
```

### T61 — 1×

```
— camada —
```

```
— layer —
```

### T62 — 1×

```
— coluna —
```

```
— column —
```

### T63 — 1×

```
title="Remover slot"
```

```
title="Remove slot"
```

### T64 — 1×

```
'✅ Feito!'
```

```
'✅ Done!'
```

### T65 — 1×

```
' imagem(ns) encontrada(s) mas acima de '
```

```
' image(s) found but over '
```

### T66 — 1×

```
' MB — serão puladas. Adicione manualmente no Figma (duplo clique no frame).'
```

```
' MB — they will be skipped. Add them by hand in Figma (double-click the frame).'
```

### T67 — 1×

```
'Acima de ' + SIZE_LIMIT_MB + ' MB — adicione manualmente'
```

```
'Over ' + SIZE_LIMIT_MB + ' MB — add it by hand'
```

### T68 — 1×

```
<span style="color:#555;">produtos</span>
```

```
<span style="color:#555;">products</span>
```

### T69 — 1×

```
<span style="color:#555;">campos de texto</span>
```

```
<span style="color:#555;">text fields</span>
```

### T70 — 1×

```
<span style="color:#555;">slot(s) de imagem</span>
```

```
<span style="color:#555;">image slot(s)</span>
```

### T71 — 1×

```
<span style="color:#555;">imagens carregadas</span>
```

```
<span style="color:#555;">images loaded</span>
```

### T72 — 1×

```
n + ' produtos → ' + c + ' por linha → ' + r + ' linha' + (r !== 1 ? 's' : '')
```

```
n + ' products → ' + c + ' per row → ' + r + ' row' + (r !== 1 ? 's' : '')
```

### T73 — 1×

```
'Ponto de partida: no lugar do template (ele será excluído)'
```

```
'Starting point: where the template is (it will be deleted)'
```

### T74 — 1×

```
'Ponto de partida: à direita do template (+' + GRID_GAP_RIGHT + ' px)'
```

```
'Starting point: to the right of the template (+' + GRID_GAP_RIGHT + ' px)'
```

### T75 — 1×

```
alert('Volte ao Passo 2 e selecione o template.')
```

```
alert('Go back to Step 2 and select the template.')
```

### T76 — 1×

```
alert('Volte ao Passo 1 e carregue o CSV.')
```

```
alert('Go back to Step 1 and load the CSV.')
```

### T77 — 1×

```
'⏳ Gerando...'
```

```
'⏳ Generating...'
```

## Edicao 3a — `ui.html` · `TEMPLATE_NAMES`, última linha da lista

**Substituir.** Ancora:

```
  'modelo de produto', 'modelo de produtos'
];
```

**Texto novo:**

```
  'modelo de produto', 'modelo de produtos',
  // equivalentes em inglês para a Community (DEC-011)
  'product', 'products', 'product template'
];
```

## Edicao 3b — `ui.html` · `updateGridInfo`, leitura de `c`

**Substituir.** Ancora:

```
  var c = parseInt(document.getElementById('g-cols').value) || 5;
  var n = CSV.rows.length;
```

**Texto novo:**

```
  // Mesmo piso do clampField: caixa vazia ou 0 mostra 1, que é o que a geração vai usar.
  var c = parseInt(document.getElementById('g-cols').value, 10);
  if (isNaN(c) || c < 1) { c = 1; }
  var n = CSV.rows.length;
```

## Edicao 3c — `ui.html` · `btn-gen.onclick`, leitura de `cols`

**Substituir.** Ancora:

```
  var cols = parseInt(document.getElementById('g-cols').value) || 5;
```

**Texto novo:**

```
  var cols = parseInt(document.getElementById('g-cols').value) || 1;  // mesmo piso do resumo e do clamp
```

## Edicao 3d — `ui.html` · tela de conclusão (HTML)

**Substituir.** Ancora:

```
      <div style="color:#555;margin-top:4px;font-size:11px;">Todos selecionados no Figma.</div>
```

**Texto novo:**

```
      <div style="color:#555;margin-top:4px;font-size:11px;">All of them are selected in Figma.</div>
      <div id="done-warn" style="display:none;margin-top:6px;font-size:10px;color:#ff9944;">⚠️ The template could not be deleted (is it locked?). It is still on the canvas, under the first frame.</div>
```

## Edicao 3e — `ui.html` · handler `done`

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
    document.getElementById('done-n').textContent = msg.count;
```

**Texto novo:**

```
    document.getElementById('done-n').textContent = msg.count;
    document.getElementById('done-warn').style.display = msg.templateNotRemoved ? 'block' : 'none';
```

## Edicao 5a — `meta/DECISIONS.md` · fim da DEC-010

**Substituir (âncora = último item da DEC-010; repetida no texto novo).** Ancora:

```
- `stepField`/`clampField` ganharam parâmetro opcional `fallback` (vazio → 0 nos offsets); os 3 campos antigos não mudam.
```

**Texto novo:**

```
- `stepField`/`clampField` ganharam parâmetro opcional `fallback` (vazio → 0 nos offsets); os 3 campos antigos não mudam.

---

## DEC-011 — Publicação na Figma Community: dynamic-page, UI em inglês, `id` do Figma
**Data:** 2026-11-04 · **Status:** aceita

### Contexto
O dono decidiu publicar o FrameMatch na Community, pública, com a UI em inglês (2026-11-04). Pesquisa nos docs do Figma (2026-11-03): plugin novo exige `documentAccess: "dynamic-page"`, modo em que `figma.getNodeById` síncrono lança erro; o `id` definitivo é atribuído pelo Figma ao publicar; as diretrizes de revisão pedem nada de erro técnico para o usuário e um link de documentação. Spec: `meta/specs/261104-publicacao-community-0.6.0.md`.

### Decisão
- Manifest com `documentAccess: "dynamic-page"` e `networkAccess: { allowedDomains: ["none"] }`; `getNodeById` → `await getNodeByIdAsync`.
- Todo texto visível em **inglês**, sem seletor de idioma; comentários seguem em PT-BR. Nomes de template em PT continuam na auto-detecção, e entram os equivalentes em inglês.
- Erro de geração: frase para o usuário + `Details:`; exclusão de template que falha passa a ser avisada.
- O `id` do manifest troca **uma vez**, para o que o Figma atribuir no «Publish» (commit pequeno depois); só então a F5 (`clientStorage`).

### Alternativas consideradas
- **UI bilíngue (pt-BR + en)** — adiada (IDEAS «Adiadas»): dobra cada string a manter; o único usuário hoje lê inglês.
- **Manter `getNodeById` sem `documentAccess`** — o Figma não publica plugin novo sem o campo.

### Consequências
- A armadilha #6 do CONTEXT foi invertida: antes dizia para **não** usar a versão async.
- A premissa da DEC-007 («`id` fixado») vale só depois da troca pelo `id` do Figma.
- Assets do anúncio (textos, ícone, capa, roteiro de prints) vivem fora do repo, em `../261104-figma-listing/`.
```

## Edicao 5b — `meta/STATUS.md` · corpo de «🔧 Em Progresso»

**Substituir.** Ancora:

```
- Nada em progresso. Próxima frente: decisão do dono (ver «Última conversa» e Backlog).
```

**Texto novo:**

```
- **0.6.0 — implementada, aguardando teste no Figma:** preparação da publicação na Community — manifest `dynamic-page` + sem rede, `getNodeByIdAsync`, UI em inglês, README, erro amigável, aviso de exclusão falha (spec `meta/specs/261104-publicacao-community-0.6.0.md`, DEC-011).
```

## Edicao 5c — `meta/STATUS.md` · corpo de «📋 Backlog»

**Substituir.** Ancora:

```
- [ ] **Decidir a próxima frente:** preparar a publicação na Community (recomendado ANTES da F5 — o Figma atribui um `id` novo ao publicar e o `clientStorage` fica preso a ele), detecção de re-geração (resto da F4) ou `clientStorage` (F5). Opções detalhadas no IDEAS (2026-11-03).
```

**Texto novo:**

```
- [ ] **Testar a 0.6.0 no Figma Desktop** — roteiro do chat (2026-11-04).
- [ ] **Publicar:** prints do carrossel com a UI em inglês, revisar os textos e o ícone em `../261104-figma-listing/`, 2FA ligado, «Publish» no app desktop.
- [ ] **Depois do Publish:** trocar o `id` do `manifest.json` pelo que o Figma atribuir (WO pequena) — só então a F5 (`clientStorage`).
```

## Edicao 5d — `meta/STATUS.md` · título da última seção

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
## 💬 Última conversa
```

**Texto novo:**

```
## 💬 Última conversa

**2026-11-04** — Preparação da publicação na Community como **0.6.0** (decisão do dono: pública, UI em inglês): spec, DEC-011, WO 0005 (manifest `dynamic-page`, `getNodeByIdAsync`, tradução, README, erro amigável, aviso de exclusão). Pacote do anúncio (textos, ícone, capa, roteiro de prints, CSV e imagens de exemplo) em `../261104-figma-listing/`.
```

## Edicao 5e — `meta/CHANGELOG.md` · topo, corpo de `[Não lançado]`

**Substituir.** Ancora:

```
## [Não lançado]

_(nada ainda)_
```

**Texto novo:**

```
## [Não lançado]

> Implementado em 2026-11-04, **aguardando teste no Figma**. Vira **0.6.0** após validação.

### Modificado
- **Interface em inglês** (DEC-011): todos os textos visíveis, `alert`s e mensagens do `code.js`; a auto-detecção de template passa a reconhecer também `product`, `products`, `product template`.
- `manifest.json` com `documentAccess: "dynamic-page"` e sem acesso à rede; `getNodeById` → `getNodeByIdAsync`.
- Erro inesperado na geração mostra uma frase para o usuário, com o detalhe técnico depois.

### Adicionado
- Aviso na tela de conclusão quando «Delete template» está marcado e a exclusão falha.
- `README.md` com o guia de uso em inglês (vira a documentação do anúncio).

### Corrigido
- O Passo 4 prometia WEBP (o Figma não aceita); agora diz JPG, PNG, GIF.
- Com «Per row» vazio, o resumo da grade mostrava 5; agora mostra 1, o mesmo piso do campo.
```

## Edicao 5f — `meta/ROADMAP.md` · antes da F5

**Substituir (âncora repetida no fim do texto novo).** Ancora:

```
## 🔵 F5 — Persistência de configuração *(futuro)*
```

**Texto novo:**

```
## 🟡 F4.5 — Publicação na Figma Community *(em curso — 2026-11-04)*
**Objetivo:** publicar o FrameMatch na Community, pública, com a UI em inglês (DEC-011).
**Critério de conclusão:** plugin aprovado na revisão e listado; `manifest.json` com o `id` atribuído pelo Figma.
- [ ] **0.6.0** — manifest `dynamic-page` + sem rede, `getNodeByIdAsync`, UI em inglês, README, erro amigável, aviso de exclusão — *implementado, aguardando teste.*
- [ ] Anúncio: textos, ícone 128×128, capa 1920×1080, carrossel (`../261104-figma-listing/`).
- [ ] «Publish» no app desktop (2FA) e aprovação na revisão.
- [ ] Trocar o `id` do manifest pelo do Figma.

## 🔵 F5 — Persistência de configuração *(futuro)*
```

## Edicao 6a — `meta/IDEAS.md` · ideia «— Preparar a publicação na Figma Community (c», fim do parágrafo

**Substituir (parágrafo inteiro; o texto novo o repete).** Ancora:

```
Pesquisado em 2026-11-03 (docs do Figma): (1) **bloqueante:** plugin novo precisa de `"documentAccess": "dynamic-page"` no manifest, e nesse modo `figma.getNodeById` **lança erro** — o `code.js` usa a versão síncrona em `runGenerate`; trocar por `await figma.getNodeByIdAsync`; (2) `"networkAccess": { "allowedDomains": ["none"] }` para o selo «sem acesso à rede» em vez de «Unknown»; (3) o `id` é **atribuído pelo Figma** ao publicar — trocar o `framematch-plugin-v1` pelo dele (DEC-007 previa `id` fixo; muda antes da F5); (4) conta com 2FA, publicar pelo app desktop, ícone 128×128, capa 1920×1080, descrição, categoria, contato de suporte; (5) diretrizes: sem bug óbvio, sem mensagem de erro de desenvolvedor para o usuário, descrição fiel, link de documentação. Privacidade simples: o plugin lê arquivos locais escolhidos pelo usuário e não usa rede.
```

**Texto novo:**

```
Pesquisado em 2026-11-03 (docs do Figma): (1) **bloqueante:** plugin novo precisa de `"documentAccess": "dynamic-page"` no manifest, e nesse modo `figma.getNodeById` **lança erro** — o `code.js` usa a versão síncrona em `runGenerate`; trocar por `await figma.getNodeByIdAsync`; (2) `"networkAccess": { "allowedDomains": ["none"] }` para o selo «sem acesso à rede» em vez de «Unknown»; (3) o `id` é **atribuído pelo Figma** ao publicar — trocar o `framematch-plugin-v1` pelo dele (DEC-007 previa `id` fixo; muda antes da F5); (4) conta com 2FA, publicar pelo app desktop, ícone 128×128, capa 1920×1080, descrição, categoria, contato de suporte; (5) diretrizes: sem bug óbvio, sem mensagem de erro de desenvolvedor para o usuário, descrição fiel, link de documentação. Privacidade simples: o plugin lê arquivos locais escolhidos pelo usuário e não usa rede. **Status:** virou a fase F4.5 do ROADMAP; código na 0.6.0 (WO 0005, DEC-011).
```

## Edicao 6b — `meta/IDEAS.md` · ideia «— UI em inglês (ou bilíngue) para a Community», fim do parágrafo

**Substituir (parágrafo inteiro; o texto novo o repete).** Ancora:

```
A interface é toda em pt-BR (`<html lang="pt-BR">`, textos e `alert`s). Na Community o público é global; inglês amplia o alcance. Opção barata: dicionário de strings `T.pt`/`T.en` escolhido por `navigator.language`. Só vale se a publicação for para o público geral.
```

**Texto novo:**

```
A interface é toda em pt-BR (`<html lang="pt-BR">`, textos e `alert`s). Na Community o público é global; inglês amplia o alcance. Opção barata: dicionário de strings `T.pt`/`T.en` escolhido por `navigator.language`. Só vale se a publicação for para o público geral. **Status:** só inglês na 0.6.0 (WO 0005, DEC-011); bilíngue em «Adiadas».
```

## Edicao 6c — `meta/IDEAS.md` · ideia «— README de uso (vira a documentação do anúnc», fim do parágrafo

**Substituir (parágrafo inteiro; o texto novo o repete).** Ancora:

```
O `README.md` tem só o título. As diretrizes do Figma pedem link de documentação de uso; um README com o fluxo dos 5 passos, formato do CSV, nomes de camada e limites (4 MB, PNG/JPG/GIF) serve aos dois. A estrutura do projeto estabilizou — é a hora.
```

**Texto novo:**

```
O `README.md` tem só o título. As diretrizes do Figma pedem link de documentação de uso; um README com o fluxo dos 5 passos, formato do CSV, nomes de camada e limites (4 MB, PNG/JPG/GIF) serve aos dois. A estrutura do projeto estabilizou — é a hora. **Status:** escrito em 2026-11-04 (inglês), versionado pela WO 0005.
```

## Edicao 6d — `meta/IDEAS.md` · ideia «— Resumo da grade com «Por linha» vazio mostr», fim do parágrafo

**Substituir (parágrafo inteiro; o texto novo o repete).** Ancora:

```
Medido no roteiro da 0.4.0 (item 8): com a caixa «Por linha» vazia ou `0`, o resumo diz «5 por linha» até sair do campo (`parseInt(...) || 5` em `updateGridInfo`). A geração está certa (o clamp corre antes); é só o texto. Correção de uma linha; juntar com outra mudança no Passo 5.
```

**Texto novo:**

```
Medido no roteiro da 0.4.0 (item 8): com a caixa «Por linha» vazia ou `0`, o resumo diz «5 por linha» até sair do campo (`parseInt(...) || 5` em `updateGridInfo`). A geração está certa (o clamp corre antes); é só o texto. Correção de uma linha; juntar com outra mudança no Passo 5. **Status:** corrigido na 0.6.0 (WO 0005).
```

## Edicao 6e — `meta/IDEAS.md` · ideia «— Avisar quando a exclusão do template falhar», fim do parágrafo

**Substituir (parágrafo inteiro; o texto novo o repete).** Ancora:

```
O `code.js` faz `try { tpl.remove(); } catch(e) {}`: se a exclusão falhar (template travado, por exemplo), ninguém fica sabendo — e no modo «no lugar do template» (DEC-010) ele fica escondido debaixo do 1º frame. Ideia: mandar um `warn` na mensagem `done` e mostrar no Passo 5. Pequena; sem pressa até alguém tropeçar.
```

**Texto novo:**

```
O `code.js` faz `try { tpl.remove(); } catch(e) {}`: se a exclusão falhar (template travado, por exemplo), ninguém fica sabendo — e no modo «no lugar do template» (DEC-010) ele fica escondido debaixo do 1º frame. Ideia: mandar um `warn` na mensagem `done` e mostrar no Passo 5. Pequena; sem pressa até alguém tropeçar. **Status:** implementado na 0.6.0 (WO 0005).
```

## Edicao 6f — `meta/IDEAS.md` · seção «🛌 Adiadas»

**Substituir.** Ancora:

```
- _(vazia)_
```

**Texto novo:**

```
- **UI bilíngue (pt-BR + en)** — adiada em 2026-11-04 porque dobra cada string a manter e o único usuário hoje lê inglês (DEC-011) — **volta quando** um usuário da Community pedir pt-BR, ou quando aparecer uma segunda língua.
```

## Edicao 6g — `meta/IDEAS.md` · título da seção do assistente

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
## 🤖 Ideias Ativas — Assistente
```

**Texto novo:**

```
## 🤖 Ideias Ativas — Assistente

### 2026-11-04 — Marcar arquivos WebP como «unsupported» no Passo 4
O seletor da pasta aceita `image/*`, então um `.webp` com nome certo casa, é enviado e falha em silêncio no `figma.createImage` (o `catch` só pula). Na Community, WebP é comum. Ideia: no Passo 4, chip próprio «unsupported format» para `.webp` (e outros que o Figma recusa), sem enviá-lo. Pequena.
```

## Edicao 7 — `logs/2026-11-04.md` · criar o log do dia

**Criar arquivo novo.** Se ja existir, acrescente a partir de `## Conversa 1` renumerando para a proxima conversa, e diga no relatorio.

````
# Log — 2026-11-04

## Conversa 1

### Objetivo do dia
Preparar a publicação do FrameMatch na Figma Community (decisão do dono: pública, UI em inglês) e montar o pacote do anúncio.

### Feito
- Spec `meta/specs/261104-publicacao-community-0.6.0.md`, DEC-011 e WO 0005 (código + registro), com roteiro de teste no mesmo turno (regra do CEREBRO).
- README em inglês (guia de uso, privacidade, suporte) — vira a documentação do anúncio.
- CONTEXT: armadilha #6 **invertida** (antes mandava não usar `getNodeByIdAsync`; com `dynamic-page` ele é obrigatório) e regra de texto visível em inglês. CLAUDE.md: as três regras novas.
- Pacote do anúncio em `../261104-figma-listing/`: textos (nome, tagline, descrição, categoria), ícone 128×128 gerado, capa 1920×1080 (rascunho), roteiro dos prints do carrossel, CSV e imagens de exemplo fictícios.

### Decisões
- DEC-011 — publicação: dynamic-page, UI só em inglês, `id` do Figma depois do Publish.

### Bugs
- Achado na leitura: o Passo 4 prometia WEBP (o Figma não aceita) → corrigido na 0.6.0. Arquivo `.webp` escolhido ainda falha mudo → ideia nova.

### Onde parei
WO 0005 entregue com o roteiro; o dono aplica, testa e então tira os prints com a UI em inglês.

### Próximos passos
- `/apply-wo` da WO 0005 e roteiro da 0.6.0.
- Prints do carrossel; revisar textos e ícone; Publish; WO do `id`.
````

---

## Armadilhas desta WO

- **ES5** nos trechos novos (DEC-001). `await` em `runGenerate` ja existia.
- Os textos novos **nao tem apostrofo** dentro de string JS de aspas simples (por isso «— skip —» e nao «don't map»).
- A Tabela T troca so texto: se alguma substituicao tocar um `id`, uma classe ou um nome de funcao, a ancora esta errada — PARE.

## Depois de aplicar — conferencia antes do commit

- [ ] `git status --short` mostra **so**: `M` em `manifest.json`, `code.js`, `ui.html`, `README.md`, `CLAUDE.md`, `meta/CONTEXT.md`, `meta/DECISIONS.md`, `meta/STATUS.md`, `meta/CHANGELOG.md`, `meta/ROADMAP.md`, `meta/IDEAS.md`; `??` em `meta/specs/261104-…`, `logs/2026-11-04.md` e nesta WO. Fora disso: VERMELHO.
- [ ] Saldo de linhas (`wc -l`, simulado pelo chat): `manifest.json` 9 → 11 · `code.js` 168 → 173 · `ui.html` 1052 → 1058 · `meta/DECISIONS.md` 246 → 269 · `meta/STATUS.md` 53 → 57 · `meta/CHANGELOG.md` 86 → 99 · `meta/ROADMAP.md` 62 → 70 · `meta/IDEAS.md` 92 → 95. Diferente: VERMELHO.
- [ ] `grep -c 'getNodeById(' code.js` → **0** · `grep -c 'getNodeByIdAsync' code.js` → **1**
- [ ] `grep -c 'dynamic-page' manifest.json` → **1**
- [ ] `grep -c '<html lang="en">' ui.html` → **1**
- [ ] Sobra de portugues visivel: `grep -cE 'Passo [0-9]|Gerar Cat|Selecione|Clique para|Mapeamento|Imagens|Próximo|Voltar' ui.html` → **7** (so comentarios podem citar; confira as linhas que sobrarem — devem comecar com `//` ou estar dentro de `<!-- -->`)
- [ ] `grep -c '^## DEC-011' meta/DECISIONS.md` → **1** · `grep -c '^## 🟡 F4.5' meta/ROADMAP.md` → **1**
- [ ] `bash scripts/check.sh` → saida 0.
- [ ] **Teste manual que a validacao NAO cobre:** roteiro da 0.6.0, entregue pelo chat no mesmo turno desta WO — e do dono. **Chega no ramo?** `runGenerate` (`getNodeByIdAsync`, `templateNotRemoved`), handlers `sel`/`done`/`err` e todos os paineis do `ui.html`. **Nao responde:** «o texto em ingles esta bom?» — isso e leitura do dono.

## Relatorio de aplicacao

Como manda `/apply-wo`; grave tambem em `../AAMMDD-HHMM-code-framematch-apply-wo0005.txt`.

## Commit — blocos separados, mensagem SEM acento

```
git add manifest.json code.js ui.html README.md CLAUDE.md meta/CONTEXT.md meta/specs/261104-publicacao-community-0.6.0.md meta/DECISIONS.md meta/STATUS.md meta/CHANGELOG.md meta/ROADMAP.md meta/IDEAS.md logs/2026-11-04.md meta/workorders/261104-wo0005-publicacao-0.6.0.md
```

```
git commit -m "feat(publish): prepara a publicacao na Community (0.6.0)" -m "Manifest dynamic-page e sem rede, getNodeByIdAsync, UI em ingles, README de uso, erro amigavel e aviso de exclusao falha (DEC-011). Aguarda teste no Figma."
```

```
git push
```

*Escrita a partir do modelo `meta/workorders/_TEMPLATE.md` (Kit de Contexto Universal v1.133.0).*
