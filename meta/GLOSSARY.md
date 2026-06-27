# GLOSSARY.md — Termos do Projeto

> **Opcional.** Vocabulário específico do FrameMatch que se repete entre sessões.
> Mantenha curto: só o que não é óbvio para alguém de fora.

---

## Conceitos do projeto

- **FrameMatch** — nome do plugin (antes "CatalogFiller", ver DEC-007). Preenche frames de catálogo em massa casando dados por nome de camada.
- **slot de imagem** — configuração que liga uma coluna CSV a uma camada não-texto do frame. Um produto pode ter N slots (ex: foto principal + foto ambiente). Cada slot tem coluna, camada e modo (Fit/Fill). É o mecanismo que cobre "vários frames de imagem por produto".
- **template** — frame do Figma que serve de modelo para cada produto. O plugin clona este frame para cada linha do CSV e preenche as camadas com os dados.
- **matching** — processo de associar um arquivo de imagem na pasta ao valor de uma coluna do CSV, ignorando diferenças de capitalização e caracteres especiais.
- **imgsKey** — chave usada para guardar uma imagem em `IMGS[]` e buscá-la em `images[]` no `code.js`. É sempre `normName(valorDoCSV)`.
- **matchKey** — chave usada para comparar nome de arquivo com entrada do CSV. É `normForMatch(valorDoCSV)`. Não é enviada ao Figma — serve só para o matching local no browser.

## Funções críticas

- **`normName(s)`** — normalização leve: `trim + toLowerCase` apenas. Usada como chave de dicionário. Deve ser **idêntica** a `norm(s)` no `code.js`.
- **`normForMatch(s)`** — normalização agressiva: remove tudo que não é letra ou número (`/[^a-z0-9]/g`). Usada só para comparar arquivo↔CSV. Resolve `*`, `/`, `_`, `#`, espaços duplos, MT², etc.
- **`norm(s)` (code.js)** — a versão do `code.js`. Idêntica a `normName`. Nunca mude uma sem mudar a outra.
- **`stepField(id, delta, min, step)`** — helper do Passo 5 (DEC-006): ajusta um input numérico pelo passo, respeita o mínimo e atualiza o resumo da grade. Usado pelos botões +/− dos 3 steppers.
- **`clampField(id, min)`** — helper do Passo 5: sanitiza o valor quando o usuário digita direto e sai do campo (evita vazio/negativo/abaixo do mínimo). Roda no `onchange` dos inputs do stepper.

## Arquiteturas / módulos

- **thread principal** — contexto onde `code.js` roda; tem acesso à API do Figma mas não ao DOM.
- **iframe / UI thread** — contexto onde `ui.html` roda; tem acesso ao DOM e às APIs do browser mas não ao Figma.
- **postMessage** — único canal de comunicação entre os dois threads. Serializa tudo como JSON.
- **num-stepper** — componente de UI do Passo 5 (DEC-006): `[−] [caixa editável] [+]`. Botões para ajuste fino; caixa para digitação direta de valores grandes.

## Comandos / artefatos

- **`code.js` / `ui.html` / `manifest.json`** — os três arquivos do plugin; ver CONTEXT (Estrutura).

## Identificadores

- **`SIZE_LIMIT_MB`** — constante no topo do `<script>` do `ui.html` que define o limite de tamanho de imagem em MB. Altere só aqui.
- **`TEMPLATE_NAMES`** — lista de nomes de frame (em minúsculas) que ativam auto-detecção no Passo 2. Altere só aqui.
- **`DEFAULT_HIDE_TEMPLATE`** / **`DEFAULT_DELETE_TEMPLATE`** — constantes que definem o padrão dos checkboxes no Passo 5. Altere só aqui.
- **`framematch-plugin-v1`** — `id` do plugin no `manifest.json` (DEC-007).
