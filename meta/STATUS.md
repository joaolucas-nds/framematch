# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log do dia.
> Médio e longo prazo NÃO ficam aqui — ficam no ROADMAP.

---

## Versão Atual
**[0.4.0]** — 2026-11-03 — nome **FrameMatch** + stepper editável no Passo 5; validada no Figma Desktop (roteiro de 12 itens).

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

## 🔧 Em Progresso

- Nada em progresso. Próxima frente no Backlog.

## ❌ Quebrado / Com Problema

- Nenhum bug ativo conhecido.

## 📋 Backlog (curto prazo — itens acionáveis)

- [ ] **Retomar o desenvolvimento:** Offset X/Y no Passo 5 + posição do template ao excluir (F4), depois `clientStorage` (F5).

## 💬 Última conversa

**2026-11-03 (tarde)** — **0.4.0 lançada:** roteiro de 12 itens no Figma Desktop, todos ok (nome, Passo 5, geração com os valores, espaços duplos, múltiplos slots, PNG transparente). Criado `.gitattributes` (`*.sh text eol=lf`) para o `check.sh` não quebrar com CRLF (CONTEXT, armadilha #8). Instruções do Projeto já coladas no painel. Próximo passo: F4 — Offset X/Y + posição do template ao excluir.

**2026-11-03** — Merge do template-update do KCM **v1.133.0** e migração do modo de trabalho para **Claude Code + WO** (DEC-009, substitui DEC-008). CEREBRO adotado do kit, com a seção «Técnicas específicas» do FrameMatch; criados na raiz `INSTRUCOES-DO-PROJETO.md` e `CLAUDE.md`; `.claude/` com `settings.json` e as skills `/apply-wo`, `/wrap`, `/sondar`; `scripts/check.sh` (guarda ES5 + `node --check`); `HISTORICO.md` → `HISTORY.md`; Arquivos Críticos movidos para o CONTEXT; `meta/ASU/` arquivado fora do repo. A 0.4.0 foi commitada (`f83a66d`) antes do merge. Próximo passo óbvio: testar a 0.4.0 no Figma Desktop (backlog acima).

**2026-07-17** — Corrigido o layout do Passo 5: os 3 steppers voltaram a ficar **lado a lado** (compactos, sem gaps inúteis); a pilha vertical foi revertida (DEC-006 atualizado). Comparado o pacote **template-update do KCM v1.72.0** contra os docs vivos — reporte de novidades/choques entregue ao usuário, **nada aplicado** (ele decide os merges). Confirmado que `figma.clientStorage` = 5 MB, só no `code.js`, e some se o `id` mudar (rename foi na hora certa). Capturada a ideia "ao excluir template, gerar o grid na posição dele" (IDEAS). Pesquisa dos 5 plugins de referência reforça F5 (perfis de mapeamento) como a melhor melhoria a importar. Próximo passo: decidir os merges do kit e qual ideia de F4/F5 implementar primeiro.

**2026-07-17 (fecho da sessão)** — Fechada a **decisão de modo de trabalho** (DEC-008): ASU ativo, com o chat escolhendo entre arquivo inteiro e delta ASU; Code+specs descartado como overkill (plugin de 3 arquivos, valida só no Figma). Estudado o formato ASU (`meta/ASU/`). Confirmado que os docs sempre estiveram em `meta/` e que passamos a usar `HISTORY.md`. **Pendente p/ a próxima conversa:** aplicar o merge do kit v1.72.0 (CEREBRO/INSTRUCOES) e renomear HISTORICO→HISTORY. Sessão encerrada para transferência — HANDOFF-BRIEF gerado.

**2026-06-15** — Renomeado o projeto para **FrameMatch** (DEC-007). Implementado o **stepper editável** no Passo 5: um único controle `[−] [caixa] [+]` para os 3 campos numéricos, com helper genérico `stepField`/`clampField` (DEC-006). Pesquisa de domínio (plugins de catálogo no Figma) e investigação de WebP: **o Figma não aceita WebP** em `figma.createImage` (só PNG/JPEG/GIF) — virou armadilha #7 no CONTEXT e ideia descartada no IDEAS. Item 6 (matching por nome de frame / modo índice) descartado: concorre com o paradigma de clonar template e o caso de múltiplas imagens já é resolvido por múltiplos slots (DEC-005). Próximo passo óbvio: testar o stepper e o novo nome no Figma Desktop.
