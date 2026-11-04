# IDEAS.md — Brainstorm e Visão

> **Segundo cérebro** do projeto. Captura TUDO que for mencionado, mesmo solto ou no meio de outro assunto.
> Nunca perde: ideia implementada vai para «Concluídas»; ideia recusada vai para «Descartadas» com o motivo.
> Separar por autor (você × assistente) ajuda a lembrar de onde veio cada coisa.

---

## 💡 Ideias Ativas — Usuário

### 2026-05 — Ferramenta Python de compressão em lote
Ferramenta separada (Python + Pillow) que:
- Percorre uma pasta raiz e subpastas
- Para cada imagem **acima de um limite configurável** (ex: 4 MB), cria uma cópia comprimida no mesmo local e move o original para uma subpasta `_originais/` (preservando o nome)
- Imagens abaixo do limite não são tocadas (sem duplicatas desnecessárias)
- Interface simples (CLI ou GUI básica) com o limite configurável
- Nunca renomeia — diferencia original de comprimido apenas por pasta
- **Saída sempre em PNG/JPG, NUNCA WebP** — o Figma rejeita WebP no `figma.createImage` (ver Descartadas). Para fotos sem transparência, JPG; para imagens com alpha, PNG otimizado (redução de paleta tipo *pngquant*) preserva a transparência e ainda encolhe bastante.

### 2026-05 — Exportar mapeamento atual (JSON)
Salvar a configuração de mapeamento (quais colunas → quais camadas, slots de imagem, grade) como JSON para reutilizar em sessões futuras sem refazer do zero. Especialmente útil quando o mesmo template é usado repetidamente. (Complementa a persistência via `clientStorage`, abaixo — o JSON serve para portar entre máquinas/templates diferentes.)

---

## 🤖 Ideias Ativas — Assistente

### 2026-11-04 — Nomear cada frame gerado pelo valor de uma coluna
Visto nos prints do dono: os 6 frames gerados se chamam todos «product template» no painel de camadas. Ideia: opção no Passo 5 «Name frames by column» (ex.: `Name`), para achar um produto no painel e exportar com nome certo. Pequena; casa com a F5 (lembrar a escolha).

### 2026-11-04 — Marcar arquivos WebP como «unsupported» no Passo 4
O seletor da pasta aceita `image/*`, então um `.webp` com nome certo casa, é enviado e falha em silêncio no `figma.createImage` (o `catch` só pula). Na Community, WebP é comum. Ideia: no Passo 4, chip próprio «unsupported format» para `.webp` (e outros que o Figma recusa), sem enviá-lo. Pequena.

### 2026-11-03 — Preparar a publicação na Figma Community (candidata a fase própria)
Pesquisado em 2026-11-03 (docs do Figma): (1) **bloqueante:** plugin novo precisa de `"documentAccess": "dynamic-page"` no manifest, e nesse modo `figma.getNodeById` **lança erro** — o `code.js` usa a versão síncrona em `runGenerate`; trocar por `await figma.getNodeByIdAsync`; (2) `"networkAccess": { "allowedDomains": ["none"] }` para o selo «sem acesso à rede» em vez de «Unknown»; (3) o `id` é **atribuído pelo Figma** ao publicar — trocar o `framematch-plugin-v1` pelo dele (DEC-007 previa `id` fixo; muda antes da F5); (4) conta com 2FA, publicar pelo app desktop, ícone 128×128, capa 1920×1080, descrição, categoria, contato de suporte; (5) diretrizes: sem bug óbvio, sem mensagem de erro de desenvolvedor para o usuário, descrição fiel, link de documentação. Privacidade simples: o plugin lê arquivos locais escolhidos pelo usuário e não usa rede. **Status:** virou a fase F4.5 do ROADMAP; código na 0.6.0 (WO 0005, DEC-011).

### 2026-11-03 — UI em inglês (ou bilíngue) para a Community
A interface é toda em pt-BR (`<html lang="pt-BR">`, textos e `alert`s). Na Community o público é global; inglês amplia o alcance. Opção barata: dicionário de strings `T.pt`/`T.en` escolhido por `navigator.language`. Só vale se a publicação for para o público geral. **Status:** só inglês na 0.6.0 (WO 0005, DEC-011); bilíngue em «Adiadas».

### 2026-11-03 — README de uso (vira a documentação do anúncio)
O `README.md` tem só o título. As diretrizes do Figma pedem link de documentação de uso; um README com o fluxo dos 5 passos, formato do CSV, nomes de camada e limites (4 MB, PNG/JPG/GIF) serve aos dois. A estrutura do projeto estabilizou — é a hora. **Status:** escrito em 2026-11-04 (inglês), versionado pela WO 0005.

### 2026-11-03 — Resumo da grade com «Por linha» vazio mostra 5
Medido no roteiro da 0.4.0 (item 8): com a caixa «Por linha» vazia ou `0`, o resumo diz «5 por linha» até sair do campo (`parseInt(...) || 5` em `updateGridInfo`). A geração está certa (o clamp corre antes); é só o texto. Correção de uma linha; juntar com outra mudança no Passo 5. **Status:** corrigido na 0.6.0 (WO 0005).

### 2026-11-03 — Avisar quando a exclusão do template falhar
O `code.js` faz `try { tpl.remove(); } catch(e) {}`: se a exclusão falhar (template travado, por exemplo), ninguém fica sabendo — e no modo «no lugar do template» (DEC-010) ele fica escondido debaixo do 1º frame. Ideia: mandar um `warn` na mensagem `done` e mostrar no Passo 5. Pequena; sem pressa até alguém tropeçar. **Status:** implementado na 0.6.0 (WO 0005).

### 2026-06-15 — Persistência automática via `figma.clientStorage` (recomendada)
Lembrar automaticamente o último mapeamento, a configuração de grade e os checkboxes entre sessões, sem o usuário precisar exportar/importar nada. É o padrão dos bons plugins de dados do Figma e ataca a dor real de refazer o Passo 3 a cada uso. Mais simples para o caso comum que o "exportar JSON" (que continua útil para portar entre máquinas). Bom momento para implementar agora que o `id` do plugin foi fixado (DEC-007). **Atenção (2026-11-03):** ao publicar na Community o Figma atribui um `id` novo e o `clientStorage` fica preso a ele — implementar só com o `id` definitivo (ver «Preparar a publicação»). → ROADMAP F5.

### 2026-05-30 — Detecção de re-geração (frames duplicados)
Antes de gerar, verificar se já existem clones do template no canvas para evitar sobreposição acidental. Poderia ser um aviso com opção de prosseguir ou cancelar.

### 2026-05-30 — Envio de imagens por lote (chunk)
Em vez de enviar todas as imagens num único `postMessage`, enviá-las uma por vez ou em grupos pequenos e gerar cada frame à medida que chega. Isso removeria o limitador de 4 MB e permitiria catálogos com imagens grandes. Mudança de arquitetura significativa — avaliar quando o limite for um problema real. → ROADMAP F7.

---

## 🛌 Adiadas
> Decisão consciente de não fazer agora. Cada item com **o gatilho que a traz de volta**: ideia adiada sem gatilho é ideia perdida.
- **UI bilíngue (pt-BR + en)** — adiada em 2026-11-04 porque dobra cada string a manter e o único usuário hoje lê inglês (DEC-011) — **volta quando** um usuário da Community pedir pt-BR, ou quando aparecer uma segunda língua.

---

## ✅ Concluídas

- **Dica de Auto Layout no template** (observação do dono, 2026-11-04: o Auto Layout «empurra» o conteúdo quando o nome é longo) — documentada no README e no carrossel do anúncio.

- **`normForMatch` para matching robusto** — implementada em 0.2.0.
- **Limitador de tamanho com chip laranja** — implementado em 0.2.0.
- **Múltiplos slots de imagem** — implementado em 0.3.0 / ver DEC-005.
- **Auto-mapeamento de imagens** — implementado em 0.3.0.
- **Auto-detecção do frame template por nome** — implementado em 0.3.0.
- **Pular Passo 4 quando sem imagens** — implementado em 0.3.0.
- **Botões +/− para "Por linha"** — implementado em 0.3.0 (evoluído para stepper editável em 0.4.0).
- **Excluir template após gerar** — implementado em 0.3.0.
- **Padrões dos checkboxes configuráveis** — implementado em 0.3.0.
- **Stepper editável (botões + caixa) nos 3 campos do Passo 5** — implementado em 0.4.0 / ver DEC-006.
- **Ao excluir o template, gerar o catálogo na posição dele** (ideia do dono, 2026-07-17) — implementada em 0.5.0 / ver DEC-010.
- **Offset X/Y configurável no Passo 5** — implementado em 0.5.0 como ajuste somado ao ponto de partida / ver DEC-010.

---

## 🚫 Descartadas

- **Compressão via canvas** — descartada porque `canvas.toBlob('image/jpeg')` destrói transparência de PNG. Ver FIX-002.
- **Base64 para transferência de imagens** — descartada porque `code.js` não tem `atob` no sandbox do Figma. Ver FIX-003.
- **Uma pasta por slot de imagem** — descartada em favor de uma pasta única (DEC-005): mais simples para o usuário, funciona bem porque arquivos de slots distintos têm nomes distintos.
- **WebP para envio ao Figma** — descartada porque `figma.createImage` aceita só **PNG, JPEG e GIF** (até 4096px); WebP retorna "unsupported image type". Os plugins que "importam WebP" convertem para PNG antes — o que cairia na corrupção de transparência do canvas (FIX-002) ou exigiria servidor externo. Para reduzir payload mantendo alpha, o caminho é PNG otimizado offline, não WebP. Ver CONTEXT armadilha #7 / HISTORY §4.
- **Matching por nome de frame (modo índice, estilo CSV Data Merge)** — descartada porque concorre com o paradigma central de "clonar template". O caso prático que parecia exigir isso (vários frames de imagem por produto, ex: `frame 1`…`frame 4`) já é resolvido por **múltiplos slots de imagem** (DEC-005). Reabrir só se surgir o fluxo "preencher frames já diagramados à mão, sem clonar template".

---

## 📮 Feedback para o Kit
> Observações e desvios estruturais sobre o próprio kit (KCM). É o que volta para evoluir o kit.

- **[2026-11-03]** A regra de higiene do CEREBRO diz que «a ponte do chat também não grava em `.claude/`». **Medido aqui, falso:** com a pasta vinculada pelo app desktop, o chat criou `.claude/settings.json` e as três skills sem bloqueio. Sugestão: qualificar a regra pelo canal (pode valer para outra ponte) e manter como motivo a divisão de raias — permissão do executor não se autoconcede —, não a impossibilidade técnica.
- **[2026-11-03]** A regra «Git pelo chat é só leitura» se justifica por «o chat não consegue apagar o `.git/index.lock`». **Medido aqui:** com a permissão de apagar concedida na conversa, o chat commitou (`f83a66d`) sem deixar `.lock`. A regra continua certa pela divisão de raias, mas a justificativa técnica não é absoluta — vale dizer que ela depende da permissão de apagar.
- **[2026-11-03]** Contradição interna no kit: o modelo do `DECISIONS.md` manda arquivar «quando passar de ~700 linhas» e o bloco FIX não tem campo `Status`; o CEREBRO (higiene) manda arquivar por EVENTO e exige `**Status:**` em toda entrada. Aqui: Status acrescentado aos FIX (`resolvida`); arquivamento por evento **não** aplicado, porque os FIX são lições vivas citadas pelas armadilhas do CONTEXT.
- **[2026-11-03]** O modelo do `IDEAS.md` traz a seção «Feedback para o ASU» mesmo num pacote gerado com `ASU nao` — é sobra do modo desligado. Não adotada aqui.
