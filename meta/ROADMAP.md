# ROADMAP.md — Plano Intencional de Evolução

> **Opcional.** Use quando o projeto tem um plano em fases — não para tarefas soltas (isso é o Backlog do STATUS) nem para brainstorm (isso é o IDEAS).
> Cada fase tem um objetivo e um critério de conclusão. Estado: 🟢 concluída · 🟡 em curso/próxima · 🔵 futura · 🚫 descartada.
> Médio e longo prazo vivem AQUI, não no STATUS.

---

## 🟢 F1 — Plugin funcional para texto *(concluída)*
**Objetivo:** plugin que preenche campos de texto em frames do Figma a partir de CSV, mapeando por nome de camada.
**Critério de conclusão:** gerar catálogos e cartazes em massa com texto correto, sem depender de ordenação de camadas.
- Fluxo de 5 passos funcional.
- Auto-mapeamento por nome.
- Grade configurável.
- Compatibilidade com ES5 (sandbox do Figma).

## 🟢 F2 — Matching de imagens robusto *(concluída)*
**Objetivo:** suporte a imagens com matching inteligente que trate caracteres especiais e limitação de tamanho.
**Critério de conclusão:** produto com `*`, `/`, `_`, `#` ou espaços duplos no CSV encontra o arquivo correto; imagens grandes são sinalizadas sem travar.
- `normForMatch` resolve todos os casos de caracteres especiais.
- Limitador de tamanho com chip laranja.
- Correção do bug de espaços duplos (FIX-001).

## 🟢 F3 — Múltiplos slots e melhorias de UX *(concluída — 2026-05-30)*
**Objetivo:** suportar múltiplos campos de imagem por produto e tornar o fluxo mais rápido para uso recorrente.
**Critério de conclusão:** usuário consegue mapear 2+ imagens por produto; template detectado automaticamente; Passo 4 pulado quando não há imagens.
- Slots dinâmicos com auto-mapeamento.
- Auto-detecção de template por nome.
- Skip P4, botões +/−, excluir template.

## 🟡 F4 — Identidade e refino de UX *(em curso — 2026-06-15)*
**Objetivo:** dar nome próprio à ferramenta e polir os controles do Passo 5 para uso rápido e consistente.
**Critério de conclusão:** plugin renomeado e testado no Figma; os 3 campos de grade ajustáveis por botão e por digitação direta.
- 🟢 Rename CatalogFiller → **FrameMatch** (DEC-007) — *lançado na 0.4.0 (2026-11-03).*
- 🟢 **Stepper editável** nos 3 campos do Passo 5 (DEC-006) — *lançado na 0.4.0 (2026-11-03).*
- 🟢 **Offset X/Y do grid** + catálogo no lugar do template ao excluir (DEC-010) — *implementado, aguardando teste.*
- [ ] **Detecção de re-geração** — avisar se já existem clones do template antes de gerar.

## 🔵 F5 — Persistência de configuração *(futuro)*
**Objetivo:** eliminar a necessidade de refazer o mapeamento para templates recorrentes.
- **Persistência automática via `figma.clientStorage`** — lembra último mapeamento, grade e checkboxes entre sessões (caso comum). Momento bom agora que o `id` do plugin foi fixado (DEC-007).
- **Exportar/importar mapeamento como JSON** — para portar configuração entre máquinas ou templates diferentes; importar pré-preenche os slots no Passo 3.

## 🔵 F6 — Ferramenta Python de compressão em lote *(futuro)*
**Objetivo:** resolver o gargalo de imagens acima de 4 MB sem corromper transparência — criando cópias comprimidas em lote, fora do Figma.
- CLI ou GUI simples (Python + Pillow).
- Limite configurável por interface.
- Move originais para `_originais/`, nunca renomeia.
- **Saída em PNG/JPG, nunca WebP** (o Figma rejeita WebP — ver CONTEXT armadilha #7). PNG otimizado preserva alpha.

## 🔵 F7 — Envio de imagens por lote (chunk) *(futuro, avaliação)*
**Objetivo:** remover o limitador de 4 MB enviando imagens progressivamente, permitindo catálogos com imagens grandes sem ferramenta externa.
- Mudança de arquitetura significativa: geração frame-a-frame com handshake.
- Avaliar apenas se F6 (compressão externa) não resolver o problema na prática.

---

## 🚫 Itens descartados desta visão
- **Editor de template** — fora de escopo. O Figma já faz isso; o plugin só preenche dados.
- **Geração de PDF** — fora de escopo. O Figma exporta PDF nativamente após a geração.
- **Suporte a WebP no envio ao Figma** — `figma.createImage` não aceita WebP (só PNG/JPEG/GIF). Ver IDEAS (Descartadas) e CONTEXT armadilha #7.
- **Matching por nome de frame (modo índice)** — concorre com o paradigma de clonar template; o caso de múltiplas imagens já é coberto por slots (DEC-005). Pode reviver no IDEAS se surgir o fluxo "preencher frames já diagramados à mão".
