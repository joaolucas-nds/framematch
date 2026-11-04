# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log do dia.
> Médio e longo prazo NÃO ficam aqui — ficam no ROADMAP.

---

## Versão Atual
**[0.6.1]** — 2026-11-04 — versão a publicar na Community: 0.6.0 + FIX-005 (camada de texto não é renomeada para o conteúdo); validada no Figma Desktop.

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
- Nome **FrameMatch** no Figma (`id` `framematch-plugin-v1`, DEC-007).
- Passo 5 com stepper editável `[−] [caixa] [+]` nos 3 campos, clamp ao sair do campo (Por linha ≥ 1, Espaços ≥ 0) e geração usando os valores (DEC-006).
- Offset X/Y no Passo 5 (passo 10, aceita negativos, vazio → 0) somado ao ponto de partida; ponto de partida segue «Excluir template» (no lugar dele ou à direita, +60 px); origem calculada com o template na hora de gerar (DEC-010).
- UI em inglês; manifest `dynamic-page` + sem rede (`getNodeByIdAsync`); erro de geração com frase + detalhe; aviso se a exclusão do template falhar (DEC-011). README com guia e prints.
- Camadas de texto dos frames gerados mantêm o nome do template (`Name`, `Brand`…) — frame gerado serve de template de novo (FIX-005).

## 🔧 Em Progresso

- Nada em progresso. Próximo passo é do dono: Publish (Backlog).

## ❌ Quebrado / Com Problema

- Nenhum bug ativo conhecido.

## 📋 Backlog (curto prazo — itens acionáveis)

- [ ] **Conferir a página do repo** (`https://github.com/joaolucas-nds/framematch`): imagens do README aparecem; About e Release `v0.6.1` — feitos pela WO 0008 via `gh`; se o relatório dela disser que não deu, fazer pela página (texto no relatório).
- [ ] **Publicar:** anúncio pronto em `../261104-figma-listing/` (textos com contato, ícone, capa, carrossel de 6 slides); ligar a 2FA na conta do Figma e clicar «Publish» no app desktop.
- [ ] **Depois do Publish:** trocar o `id` do `manifest.json` pelo que o Figma atribuir (WO pequena) — só então a F5 (`clientStorage`).

## 💬 Última conversa

**2026-11-04 (fim da noite)** — **0.6.1 lançada** (roteiro de 3 itens, todos ok) — é a versão que vai para a Community. Tag `v0.6.1` + Release e About do GitHub pela WO 0008 (`gh` instalado pelo dono; autenticação é dele). Guia do Publish entregue no chat. `zz_backups/` conferido: cópias de 2026-07-18 do DECISIONS/STATUS, 100% contidas no git (`f83a66d`) — liberado para o dono apagar.

**Correção de estado (WO 0008, fecho):** só a tag `v0.6.1` saiu (`4721d50`). About e Release **NÃO** foram criados — `gh` fora do PATH da sessão (`gh: command not found`; o binário existe em `C:\Program Files\GitHub CLI`). Pendente: rodar 5c/5d da WO 0008 numa sessão nova do Code, ou colar na página do repo.

**2026-11-04 (noite)** — WO 0006 (0.6.0 lançada, tag `v0.6.0` em `437f09d`) e WO 0007 (FIX-005, `1179a13`) aplicadas e empurradas. Pendente com o dono: roteiro curto da 0.6.1 no Figma, About do GitHub, Publish. A tag `v0.6.0` marca o código SEM o FIX-005; a 0.6.1 ganha tag própria após o teste.

**2026-11-04 (tarde)** — **0.6.0 lançada** (roteiro de 10 itens, todos ok; o dono aprovou o inglês). README ganhou prints de cada passo, o resultado e a dica de Auto Layout (`docs/images/`), contato de suporte (e-mail + Issues). Carrossel de 6 slides montado com os prints do dono. Tag `v0.6.0`. Achado nos prints: o Figma renomeia a camada de texto para o conteúdo (`autoRename`) — FIX-005 vai na WO 0007.

**2026-11-04** — Preparação da publicação na Community como **0.6.0** (decisão do dono: pública, UI em inglês): spec, DEC-011, WO 0005 (manifest `dynamic-page`, `getNodeByIdAsync`, tradução, README, erro amigável, aviso de exclusão). Pacote do anúncio (textos, ícone, capa, roteiro de prints, CSV e imagens de exemplo) em `../261104-figma-listing/`. **WO 0005 aplicada e empurrada (`b122194`)**; `check.sh` verde, ainda sem teste no Figma Desktop.

**2026-11-03 (fim da noite)** — **0.5.0 lançada** (roteiro de 11 itens no Figma, todos ok). Pesquisados os requisitos de publicação na Community: o manifest precisa de `documentAccess: "dynamic-page"` e, com ele, `figma.getNodeById` (síncrono, usado no `code.js`) passa a lançar erro — trocar por `getNodeByIdAsync`; o `id` é atribuído pelo Figma ao publicar. Ideias de publicação, UI em inglês e README registradas no IDEAS. Regra nova no CEREBRO: roteiro do dono sai no mesmo turno da WO de código.

**2026-11-03 (noite)** — F4: spec do Offset X/Y + catálogo no lugar do template aprovada (`meta/specs/`, primeira spec do projeto) e implementada pela WO 0003 (DEC-010). Aguarda o roteiro de teste no Figma para virar 0.5.0.

**2026-11-03 (tarde)** — **0.4.0 lançada:** roteiro de 12 itens no Figma Desktop, todos ok (nome, Passo 5, geração com os valores, espaços duplos, múltiplos slots, PNG transparente). Criado `.gitattributes` (`*.sh text eol=lf`) para o `check.sh` não quebrar com CRLF (CONTEXT, armadilha #8). Instruções do Projeto já coladas no painel. Próximo passo: F4 — Offset X/Y + posição do template ao excluir.

**2026-11-03** — Merge do template-update do KCM **v1.133.0** e migração do modo de trabalho para **Claude Code + WO** (DEC-009, substitui DEC-008). CEREBRO adotado do kit, com a seção «Técnicas específicas» do FrameMatch; criados na raiz `INSTRUCOES-DO-PROJETO.md` e `CLAUDE.md`; `.claude/` com `settings.json` e as skills `/apply-wo`, `/wrap`, `/sondar`; `scripts/check.sh` (guarda ES5 + `node --check`); `HISTORICO.md` → `HISTORY.md`; Arquivos Críticos movidos para o CONTEXT; `meta/ASU/` arquivado fora do repo. A 0.4.0 foi commitada (`f83a66d`) antes do merge. Próximo passo óbvio: testar a 0.4.0 no Figma Desktop (backlog acima).

**2026-07-17** — Corrigido o layout do Passo 5: os 3 steppers voltaram a ficar **lado a lado** (compactos, sem gaps inúteis); a pilha vertical foi revertida (DEC-006 atualizado). Comparado o pacote **template-update do KCM v1.72.0** contra os docs vivos — reporte de novidades/choques entregue ao usuário, **nada aplicado** (ele decide os merges). Confirmado que `figma.clientStorage` = 5 MB, só no `code.js`, e some se o `id` mudar (rename foi na hora certa). Capturada a ideia "ao excluir template, gerar o grid na posição dele" (IDEAS). Pesquisa dos 5 plugins de referência reforça F5 (perfis de mapeamento) como a melhor melhoria a importar. Próximo passo: decidir os merges do kit e qual ideia de F4/F5 implementar primeiro.

**2026-07-17 (fecho da sessão)** — Fechada a **decisão de modo de trabalho** (DEC-008): ASU ativo, com o chat escolhendo entre arquivo inteiro e delta ASU; Code+specs descartado como overkill (plugin de 3 arquivos, valida só no Figma). Estudado o formato ASU (`meta/ASU/`). Confirmado que os docs sempre estiveram em `meta/` e que passamos a usar `HISTORY.md`. **Pendente p/ a próxima conversa:** aplicar o merge do kit v1.72.0 (CEREBRO/INSTRUCOES) e renomear HISTORICO→HISTORY. Sessão encerrada para transferência — HANDOFF-BRIEF gerado.

**2026-06-15** — Renomeado o projeto para **FrameMatch** (DEC-007). Implementado o **stepper editável** no Passo 5: um único controle `[−] [caixa] [+]` para os 3 campos numéricos, com helper genérico `stepField`/`clampField` (DEC-006). Pesquisa de domínio (plugins de catálogo no Figma) e investigação de WebP: **o Figma não aceita WebP** em `figma.createImage` (só PNG/JPEG/GIF) — virou armadilha #7 no CONTEXT e ideia descartada no IDEAS. Item 6 (matching por nome de frame / modo índice) descartado: concorre com o paradigma de clonar template e o caso de múltiplas imagens já é resolvido por múltiplos slots (DEC-005). Próximo passo óbvio: testar o stepper e o novo nome no Figma Desktop.
