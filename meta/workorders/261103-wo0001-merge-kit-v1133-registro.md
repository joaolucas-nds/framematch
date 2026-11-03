# WO 0001 — Registrar o merge do kit v1.133.0 e a troca para Claude Code (DEC-009)

> **Tipo:** WO de DOC (registro) + versiona os arquivos que o chat gravou.
> **Config sugerida:** Sonnet · `/effort medium` (diff exato, só doc).
> **Pre-requisito:** `main` em `f83a66d` (1 commit à frente de `origin/main`), arvore com os arquivos do chat listados abaixo ainda nao versionados. Nada de codigo do plugin muda.
> **Base:** conversa de 2026-11-03 (merge do pacote `../261103-kcm-update-v1.133.0/`); decisao do dono: «Aplica o merge como recomendado e escreve a wo0001».
> **Arquivos que o chat gravou no disco e esta WO versiona** (sha1 medido ao gravar — Edicao 0 confere):
>   - `meta/CEREBRO.md` — `173a69451eba07f2459b8f2bf7e86af18ac10091`
>   - `meta/CONTEXT.md` — `af5592cb6a72ee2a061dcd78a9405b0d12032be8`
>   - `meta/GLOSSARY.md` — `87af986e1359d37bb70039ad906c05e6eb3673b7`
>   - `meta/LOG-TEMPLATE.md` — `49782458bcd3bd86ed4e048a7c1a5b778d22d528`
>   - `meta/SPEC.md` — `8bf13dd5fe82759d316839a3b78cd6df214d3e38`
>   - `meta/workorders/_TEMPLATE.md` — `f59a41872a8411d19ff5bc2b5214395ec3c286c2`
>   - `INSTRUCOES-DO-PROJETO.md` — `43cef640368501b69f36dcc3180cae0e2560b003`
>   - `CLAUDE.md` — `fb6c2da4009cee5b1647e5fd365f8964b34bcd1e`
>   - `.claude/settings.json` — `8b9bd785cda5a09535bab3285f5194775a97947d`
>   - `.claude/skills/apply-wo/SKILL.md` — `675528f188fc09d9bc4dff231eec065410d29c04`
>   - `.claude/skills/wrap/SKILL.md` — `d6aa0ecbe40442c8cc3ba3c088b37700241c00c4`
>   - `.claude/skills/sondar/SKILL.md` — `8063ea403c991f03e9d6228bf67a13d0fefab771`
>   - `scripts/check.sh` — `46e1a79bb51f18d45709a23c6d1f7a120f956174`
>   - `.gitignore` — `1973bf5c9a259a57712d269e08eafbc743bb9d08`
>   - `.flatdropignore` — `b4800c4156f7d4a1c284d923ea2196b6c8aead24`
> **Ancora semantica:** se um trecho-ancora nao bater EXATAMENTE (1 ocorrencia), **PARE e reporte**.
> **Idempotencia:** antes de cada edicao, procure o texto NOVO inteiro; se ja esta e a ancora nao (salvo forma «trocar», em que o texto novo repete a ancora), PULE e diga no relatorio.
> **Ancoras lidas em:** todas lidas NESTE turno do chat, direto do disco, e conferidas por simulacao numa copia do repo (cada ancora com exatamente 1 ocorrencia): `meta/STATUS.md` (cabecalho, Backlog, «📁 Arquivos Criticos», «💬 Ultima Sessao»); `meta/DECISIONS.md` (linha de data da DEC-008, ultimo item da DEC-008, titulos FIX-001..004 + data); `meta/IDEAS.md` (ideia de chunk, Descartadas/WebP, «✅ Concluidas», ultima linha); `meta/CHANGELOG.md` (item «Passo 5 — stepper editavel unificado»); `meta/HISTORICO.md` (linhas 1 e 4). O trecho literal de cada uma esta no bloco «Ancora» da edicao.
> **Fim de linha:** todos os alvos sao LF na arvore e no indice (`git ls-files --eol`: `i/lf w/lf`). Ancoras de varias linhas casam com `\n`.

> **Canal dos meta neste ciclo = CODE.** Esta WO E o registro: aplique os appends e trocas abaixo; o chat nao entrega STATUS/DECISIONS/IDEAS/CHANGELOG por fora neste ciclo. CEREBRO, CONTEXT, GLOSSARY, LOG-TEMPLATE, SPEC e INSTRUCOES ja foram gravados inteiros pelo chat — aqui so entram no `git add`.

---

## 1. Por que

O dono trocou o modo de trabalho de ASU para Claude Code + WO (DEC-009) ao aplicar o template-update do KCM v1.133.0. O chat ja gravou os arquivos de curadoria e montou `.claude/`; falta registrar a decisao e o estado nos documentos que sao do Code, fazer o rename pendente desde julho (`HISTORICO.md` → `HISTORY.md`) e versionar tudo num commit, empurrando junto o `f83a66d` da 0.4.0.

## 2. Contexto factual

- **[medido]** `git log`: `f83a66d` (0.4.0) sobre `b40e3a4`; `origin/main` atras 1.
- **[medido]** O CHANGELOG ainda dizia que o Passo 5 virou pilha vertical; a DEC-006 registra que a pilha foi revertida em 2026-07-17 (3 lado a lado).
- **[medido]** O IDEAS apontava a ideia de chunk para «ROADMAP F6»; no ROADMAP, F6 e a ferramenta Python e F7 e o chunk.
- **[medido]** `meta/ASU/` (nao versionado) ja foi movido pelo chat para `../zz_notas-arquivadas/261103-meta-ASU/`.
- **[relatado pelo dono]** decisao de migrar para Code e de pôr `INSTRUCOES-DO-PROJETO.md` na raiz.

## Inventario — de onde saiu a lista de edicoes

- Referencias a `HISTORICO` em `meta/` (fora o proprio arquivo): `grep -rn HISTORICO meta/` no chat achou CONTEXT (2 — ja corrigidas pelo chat), IDEAS (1 → Edicao 4b), STATUS (2 linhas de relato + 1 item de backlog → 2c remove o item; relato fica), DECISIONS (1, relato dentro da DEC-008 → fica). Depois desta WO, nos arquivos `meta/CONTEXT.md meta/GLOSSARY.md meta/IDEAS.md meta/HISTORY.md` o esperado e **0**; em `meta/STATUS.md`, **2** (relato da conversa de 07-17 e da de hoje).
- Revogacao «sessao» (manifesto v1.106): trocas de MANDATO em STATUS (2a, 2e) e HISTORY (6c); CONTEXT, GLOSSARY, LOG-TEMPLATE e CEREBRO ja trocados pelo chat. Ficam de proposito: «entre sessoes» em IDEAS e ROADMAP (termo do produto — sessoes do usuario no Figma) e os relatos datados do STATUS e de `logs/2026-06-15.md`.

---

## Edicao 0 — conferir os arquivos do chat

Rode e compare com a lista do cabecalho. **Hash diferente = outro escritor mexeu: PARE e reporte.**

```
sha1sum meta/CEREBRO.md meta/CONTEXT.md meta/GLOSSARY.md meta/LOG-TEMPLATE.md meta/SPEC.md meta/workorders/_TEMPLATE.md INSTRUCOES-DO-PROJETO.md CLAUDE.md .claude/settings.json .claude/skills/apply-wo/SKILL.md .claude/skills/wrap/SKILL.md .claude/skills/sondar/SKILL.md scripts/check.sh .gitignore .flatdropignore
```

## Edicao 6a — `meta/HISTORICO.md` · rename para HISTORY

Rode **antes** das edicoes 6b/6c (as ancoras delas estao no arquivo renomeado):

```
git mv meta/HISTORICO.md meta/HISTORY.md
```

## Edicao 2a — `meta/STATUS.md` · cabeçalho do arquivo, 4ª linha

**Substituir.** Ancora:

```
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log da sessão.
```

**Texto novo:**

```
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log do dia.
```

## Edicao 2b — `meta/STATUS.md` · seção «📋 Backlog»

**Remover a linha inteira (com a quebra de linha).** Ancora:

```
- [ ] **Aplicar o merge do kit v1.72.0** (CEREBRO + INSTRUCOES): acrescentar as seções novas do CEREBRO (template-update, refino das instruções, recomendação de config), remover o apêndice velho de Claude Code, e somar as regras novas no INSTRUCOES — preservando todo o conteúdo específico do FrameMatch.
```

## Edicao 2c — `meta/STATUS.md` · seção «📋 Backlog»

**Remover a linha inteira (com a quebra de linha).** Ancora:

```
- [ ] **Renomear `HISTORICO.md` → `HISTORY.md`** e ajustar referências cruzadas (CONTEXT armadilha #7, GLOSSARY).
```

## Edicao 2d — `meta/STATUS.md` · fim do Backlog + seção «📁 Arquivos Críticos» inteira

**Substituir (as duas metades do MOVER: a seção já está no CONTEXT, aqui só sai).** Ancora:

```
- [ ] **Retomar o desenvolvimento:** Offset X/Y no Passo 5 + posição do template ao excluir (F4), depois `clientStorage` (F5).

## 📁 Arquivos Críticos (não mexer sem contexto)

- `code.js` — thread principal do Figma. Usa `norm()` (trim+lowercase, sem colapsar espaços). Qualquer mudança aqui exige verificar `normName()` no `ui.html` para manter paridade. Suporta `imageMappings` (array) e `deleteTemplate` — versões antigas do ui.html são incompatíveis.
- `ui.html` — toda a lógica de matching e UI. As funções `normName` e `normForMatch` são o coração do sistema de imagens — leia DEC-003 e FIX-001 antes de tocar. O Passo 5 usa o helper `stepField`/`clampField` para os steppers (DEC-006).
```

**Texto novo:**

```
- [ ] **Retomar o desenvolvimento:** Offset X/Y no Passo 5 + posição do template ao excluir (F4), depois `clientStorage` (F5).
- [ ] **Colar `INSTRUCOES-DO-PROJETO.md` no painel do Projeto do claude.ai** (o arquivo da raiz é a fonte; o painel é a cópia — DEC-009).
```

## Edicao 2e — `meta/STATUS.md` · título da última seção

**Substituir.** Ancora:

```
## 💬 Última Sessão
```

**Texto novo:**

```
## 💬 Última conversa

**2026-11-03** — Merge do template-update do KCM **v1.133.0** e migração do modo de trabalho para **Claude Code + WO** (DEC-009, substitui DEC-008). CEREBRO adotado do kit, com a seção «Técnicas específicas» do FrameMatch; criados na raiz `INSTRUCOES-DO-PROJETO.md` e `CLAUDE.md`; `.claude/` com `settings.json` e as skills `/apply-wo`, `/wrap`, `/sondar`; `scripts/check.sh` (guarda ES5 + `node --check`); `HISTORICO.md` → `HISTORY.md`; Arquivos Críticos movidos para o CONTEXT; `meta/ASU/` arquivado fora do repo. A 0.4.0 foi commitada (`f83a66d`) antes do merge. Próximo passo óbvio: testar a 0.4.0 no Figma Desktop (backlog acima).
```

## Edicao 3a — `meta/DECISIONS.md` · DEC-008, linha logo abaixo do título

**Substituir.** Ancora:

```
**Data:** 2026-07-17 · **Status:** aceita
```

**Texto novo:**

```
**Data:** 2026-07-17 · **Status:** substituída por DEC-009
```

## Edicao 3b — `meta/DECISIONS.md` · último item de «Consequências» da DEC-008

**Substituir (ancora no fim da DEC-008; o texto novo repete a ancora).** Ancora:

```
- Break-even do ASU é apertado com docs pequenos (menos de ~10-15KB); por isso o chat escolhe, não aplica cegamente.
```

**Texto novo:**

```
- Break-even do ASU é apertado com docs pequenos (menos de ~10-15KB); por isso o chat escolhe, não aplica cegamente.

---

## DEC-009 — Modo de trabalho: Claude Code + WO (substitui DEC-008)
**Data:** 2026-11-03 · **Status:** aceita

### Contexto
Chegou o template-update do KCM v1.133.0, gerado com `Code sim · ASU nao`. Desde a DEC-008 mudou o canal: o chat agora roda com a pasta do projeto **vinculada** (app desktop), lendo e gravando direto no disco — o mount achatado do FlatDrop virou canal de reserva. O dono decidiu migrar de modo em 2026-11-03.

### Decisão
Duas raias. **Chat (planejamento):** escreve inteiros CEREBRO, CONTEXT, GLOSSARY, `INSTRUCOES-DO-PROJETO.md`, análises e WOs; git só leitura. **Claude Code (execução):** código, appends em STATUS/DECISIONS/CHANGELOG, log do dia; aplica WOs de `meta/workorders/` com `/apply-wo`; valida com `bash scripts/check.sh`; commita e empurra. IDEAS e documento grande e vivo mudam por WO. **ASU desligado** — `meta/ASU/` arquivado em `../zz_notas-arquivadas/261103-meta-ASU/`.

### Alternativas consideradas
- **Manter ASU (DEC-008)** — o custo que o ASU atacava (regenerar doc grande por uma linha) a WO resolve do mesmo jeito, com âncora conferida e `git diff` de quem aplica; e o kit deixou de gerar o modo para este projeto.
- **Só chat + arquivo inteiro** — sem executor, ninguém roda a validação nem commita: o dono vira o executor manual.

### Consequências
- O argumento da DEC-008 contra o Code continua verdadeiro: **o Code não roda o plugin.** Mitigação: `scripts/check.sh` responde «a sintaxe é ES5?»; «funciona?» segue sendo roteiro manual do dono no Figma Desktop.
- Arquivos novos: `CLAUDE.md`, `INSTRUCOES-DO-PROJETO.md` (fonte das Instruções; o painel do Projeto é cópia), `.claude/`, `scripts/check.sh`, `meta/workorders/`, `meta/SPEC.md`.
- Fechadas as pendências da DEC-008: `HISTORICO.md` → `HISTORY.md`; Arquivos Críticos migraram do STATUS para o CONTEXT.
```

## Edicao 3c — `meta/DECISIONS.md` · título do FIX-001 + linha de data

**Substituir.** Ancora:

```
## FIX-001 — Bug de espaços duplos: normName colapsava espaços, norm() do code.js não
**Data:** 2026-05-30
```

**Texto novo:**

```
## FIX-001 — Bug de espaços duplos: normName colapsava espaços, norm() do code.js não
**Data:** 2026-05-30 · **Status:** resolvida
```

## Edicao 3d — `meta/DECISIONS.md` · título do FIX-002 + linha de data

**Substituir.** Ancora:

```
## FIX-002 — Canvas compression corrompeu PNG transparente
**Data:** 2026-05-30
```

**Texto novo:**

```
## FIX-002 — Canvas compression corrompeu PNG transparente
**Data:** 2026-05-30 · **Status:** resolvida
```

## Edicao 3e — `meta/DECISIONS.md` · título do FIX-003 + linha de data

**Substituir.** Ancora:

```
## FIX-003 — Base64 em v9: code.js não tem atob
**Data:** 2026-05-30
```

**Texto novo:**

```
## FIX-003 — Base64 em v9: code.js não tem atob
**Data:** 2026-05-30 · **Status:** resolvida
```

## Edicao 3f — `meta/DECISIONS.md` · título do FIX-004 + linha de data

**Substituir.** Ancora:

```
## FIX-004 — csvSet com duas chaves por produto causava chips duplicados
**Data:** 2026-05-30
```

**Texto novo:**

```
## FIX-004 — csvSet com duas chaves por produto causava chips duplicados
**Data:** 2026-05-30 · **Status:** resolvida
```

## Edicao 4a — `meta/IDEAS.md` · ideia «Envio de imagens por lote (chunk)» — F6 é a ferramenta Python; chunk é F7

**Substituir.** Ancora:

```
avaliar quando o limite for um problema real. → ROADMAP F6.
```

**Texto novo:**

```
avaliar quando o limite for um problema real. → ROADMAP F7.
```

## Edicao 4b — `meta/IDEAS.md` · Descartadas, item WebP

**Substituir.** Ancora:

```
Ver CONTEXT armadilha #7 / HISTORICO §4.
```

**Texto novo:**

```
Ver CONTEXT armadilha #7 / HISTORY §4.
```

## Edicao 4c — `meta/IDEAS.md` · título da seção Concluídas

**Substituir.** Ancora:

```
## ✅ Concluídas
```

**Texto novo:**

```
## 🛌 Adiadas
> Decisão consciente de não fazer agora. Cada item com **o gatilho que a traz de volta**: ideia adiada sem gatilho é ideia perdida.
- _(vazia)_

---

## ✅ Concluídas
```

## Edicao 4d — `meta/IDEAS.md` · último item de Descartadas (última linha do arquivo)

**Substituir (ancora = última linha do arquivo; o texto novo a repete).** Ancora:

```
- **Matching por nome de frame (modo índice, estilo CSV Data Merge)** — descartada porque concorre com o paradigma central de "clonar template". O caso prático que parecia exigir isso (vários frames de imagem por produto, ex: `frame 1`…`frame 4`) já é resolvido por **múltiplos slots de imagem** (DEC-005). Reabrir só se surgir o fluxo "preencher frames já diagramados à mão, sem clonar template".
```

**Texto novo:**

```
- **Matching por nome de frame (modo índice, estilo CSV Data Merge)** — descartada porque concorre com o paradigma central de "clonar template". O caso prático que parecia exigir isso (vários frames de imagem por produto, ex: `frame 1`…`frame 4`) já é resolvido por **múltiplos slots de imagem** (DEC-005). Reabrir só se surgir o fluxo "preencher frames já diagramados à mão, sem clonar template".

---

## 📮 Feedback para o Kit
> Observações e desvios estruturais sobre o próprio kit (KCM). É o que volta para evoluir o kit.

- **[2026-11-03]** A regra de higiene do CEREBRO diz que «a ponte do chat também não grava em `.claude/`». **Medido aqui, falso:** com a pasta vinculada pelo app desktop, o chat criou `.claude/settings.json` e as três skills sem bloqueio. Sugestão: qualificar a regra pelo canal (pode valer para outra ponte) e manter como motivo a divisão de raias — permissão do executor não se autoconcede —, não a impossibilidade técnica.
- **[2026-11-03]** A regra «Git pelo chat é só leitura» se justifica por «o chat não consegue apagar o `.git/index.lock`». **Medido aqui:** com a permissão de apagar concedida na conversa, o chat commitou (`f83a66d`) sem deixar `.lock`. A regra continua certa pela divisão de raias, mas a justificativa técnica não é absoluta — vale dizer que ela depende da permissão de apagar.
- **[2026-11-03]** Contradição interna no kit: o modelo do `DECISIONS.md` manda arquivar «quando passar de ~700 linhas» e o bloco FIX não tem campo `Status`; o CEREBRO (higiene) manda arquivar por EVENTO e exige `**Status:**` em toda entrada. Aqui: Status acrescentado aos FIX (`resolvida`); arquivamento por evento **não** aplicado, porque os FIX são lições vivas citadas pelas armadilhas do CONTEXT.
- **[2026-11-03]** O modelo do `IDEAS.md` traz a seção «Feedback para o ASU» mesmo num pacote gerado com `ASU nao` — é sobra do modo desligado. Não adotada aqui.
```

## Edicao 5a — `meta/CHANGELOG.md` · [Não lançado] → Modificado → item «Passo 5 — stepper editável unificado»

**Substituir (trecho dentro da linha do Passo 5).** Ancora:

```
Layout do Passo 5 passou de grid de 3 colunas para pilha vertical (label à esquerda, stepper à direita), para caber melhor na janela estreita do plugin.
```

**Texto novo:**

```
Layout do Passo 5 mantém os 3 campos lado a lado, compactos (uma pilha vertical foi tentada e revertida em 2026-07-17 — DEC-006).
```

## Edicao 6b — `meta/HISTORY.md` · 1ª linha (depois do `git mv` da Edição 6a)

**Substituir.** Ancora:

```
# HISTORICO.md — Conhecimento Consolidado
```

**Texto novo:**

```
# HISTORY.md — Conhecimento Consolidado
```

## Edicao 6c — `meta/HISTORY.md` · cabeçalho, 4ª linha

**Substituir.** Ancora:

```
> Não é lido no início da sessão; o assistente consulta sob demanda quando o assunto aparece.
```

**Texto novo:**

```
> Não é lido ao abrir a conversa; o assistente consulta sob demanda quando o assunto aparece.
```

## Edicao 7 — `logs/2026-11-03.md` · criar o log do dia

**Criar arquivo novo** (sem ancora). Se ja existir, NAO sobrescreva: acrescente o conteudo abaixo a partir de `## Conversa 1` e diga no relatorio.

````
# Log — 2026-11-03

## Conversa 1

### Objetivo do dia
Aplicar o template-update do KCM v1.133.0 e trocar o modo de trabalho de ASU para Claude Code + WO.

### Feito
- Commitada a 0.4.0 pendente antes do merge (`f83a66d`, ainda sem push na hora do commit).
- Varredura das linhas revogadas do manifesto (4 termos) em `meta/`, logs, ignores e no painel do Projeto; o que mandava foi trocado, o que relata ou é termo do produto («entre sessões» do usuário no Figma) ficou.
- CEREBRO adotado do kit v1.133.0 (o anterior era só texto genérico) + seção «Técnicas específicas» do FrameMatch.
- Criados `INSTRUCOES-DO-PROJETO.md` (raiz, 5.560 caracteres por `LC_ALL=C.UTF-8 wc -m`), `CLAUDE.md`, `.claude/settings.json`, skills `/apply-wo` `/wrap` `/sondar`, `meta/workorders/_TEMPLATE.md`, `meta/SPEC.md`, `.gitignore`, `.flatdropignore` novo, `scripts/check.sh`.
- `scripts/check.sh` rodou limpo no código atual e acusou código ES6 e `<script>` quebrado inseridos de propósito numa cópia (prova de vida).
- CONTEXT: Arquivos Críticos vindos do STATUS, estrutura e Testes atualizados, referências a HISTORY. GLOSSARY: WO, skills, `check.sh`.
- `meta/ASU/` movido para `../zz_notas-arquivadas/261103-meta-ASU/`.
- WO 0001: rename HISTORICO → HISTORY, STATUS, DECISIONS (DEC-009, Status dos FIX), IDEAS (Adiadas, Feedback para o Kit, F6→F7), CHANGELOG (layout do Passo 5) e este log.

### Decisões
- DEC-009 — Claude Code + WO; substitui a DEC-008.

### Bugs
- Nenhum no produto. Achados de documento corrigidos: o CHANGELOG ainda descrevia o Passo 5 em pilha vertical (revertida em 2026-07-17); o IDEAS apontava a ideia de chunk para «ROADMAP F6», que é a ferramenta Python (chunk é F7).

### Aprendizados / armadilhas
- O `ui.html` cita a tag `<script>` dentro de um comentário: extração ingênua do bloco de script pega o comentário. O `check.sh` casa só a tag sozinha na linha.
- O handoff de julho mandava acrescentar às Instruções «reler o mount ao sinal de upload» — comportamento revogado no kit v1.90. Não entrou.

### Onde parei
Merge do kit fechado no lado do chat; WO 0001 aplicada pelo Code fecha o registro e empurra os commits.

### Próximos passos
- Testar a 0.4.0 no Figma Desktop (backlog do STATUS).
- Colar `INSTRUCOES-DO-PROJETO.md` no painel do Projeto do claude.ai.
````

---

## Fora de escopo

- Nenhuma mudanca em `code.js`, `ui.html`, `manifest.json`.
- Nao mexer em CEREBRO, CONTEXT, GLOSSARY, LOG-TEMPLATE, SPEC, INSTRUCOES, CLAUDE.md, `.claude/`, `scripts/` — so `git add`.
- Nao arquivar FIX-001..004 (decisao registrada no Feedback para o Kit). Nao mover nada da pasta-pai.

## Armadilhas desta WO

- A Edicao 6a (`git mv`) vem antes de 6b/6c; o numero 6 so agrupa o arquivo.
- Ordem das edicoes no STATUS importa pouco (ancoras disjuntas), mas aplique 2b/2c antes de 2d: a ancora de 2d comeca no item «Retomar o desenvolvimento», que fica logo apos os dois removidos.

---

## Depois de aplicar — conferencia antes do commit

- [ ] `git status --short` mostra **so**: `R meta/HISTORICO.md -> meta/HISTORY.md`; `M` em `.flatdropignore`, `meta/CEREBRO.md`, `meta/CHANGELOG.md`, `meta/CONTEXT.md`, `meta/DECISIONS.md`, `meta/GLOSSARY.md`, `meta/IDEAS.md`, `meta/LOG-TEMPLATE.md`, `meta/STATUS.md`; e novos (`??`/`A`) `.claude/`, `.gitignore`, `CLAUDE.md`, `INSTRUCOES-DO-PROJETO.md`, `logs/2026-11-03.md`, `meta/SPEC.md`, `meta/workorders/`, `scripts/`. Arquivo fora disso: VERMELHO.
- [ ] Saldo de linhas (`wc -l`, simulado pelo chat numa copia): `meta/STATUS.md` 57 → 53 · `meta/DECISIONS.md` 202 → 222 · `meta/IDEAS.md` 65 → 81 · `meta/CHANGELOG.md` 67 → 67. Diferente: VERMELHO.
- [ ] `grep -c '^## DEC-009' meta/DECISIONS.md` → **1** (linhas)
- [ ] `grep -c 'Status:\*\* resolvida' meta/DECISIONS.md` → **4** (linhas)
- [ ] `grep -c '^## 📁 Arquivos Críticos' meta/STATUS.md` → **0** (linhas)
- [ ] `grep -c '^## 💬 Última conversa' meta/STATUS.md` → **1** (linhas)
- [ ] `grep -c '^\*\*2026-07-17\*\* — Corrigido o layout' meta/STATUS.md` → **1** (linhas)
- [ ] `grep -c '^## 📮 Feedback para o Kit' meta/IDEAS.md` → **1** (linhas)
- [ ] `grep -c '^- \*\*\[2026-11-03\]\*\*' meta/IDEAS.md` → **4** (linhas)
- [ ] `grep -c '^## 🛌 Adiadas' meta/IDEAS.md` → **1** (linhas)
- [ ] `grep -c HISTORICO meta/CONTEXT.md meta/GLOSSARY.md meta/IDEAS.md meta/HISTORY.md` → **0** em cada; `grep -c HISTORICO meta/STATUS.md` → **2** (relatos).
- [ ] `bash scripts/check.sh` → saida 0 (a WO nao toca codigo; isto e prova de vida do instrumento no Git Bash do Windows). Se disser «node ausente», relate e siga — a guarda ES5 basta.
- [ ] **Teste manual que a validacao NAO cobre:** nenhum nesta WO (so doc). A 0.4.0 continua sem teste no Figma — e item do backlog, do dono.

## Relatorio de aplicacao

Como manda `/apply-wo`; grave tambem em `../AAMMDD-HHMM-code-framematch-apply-wo0001.txt`.

## Commit — blocos separados, mensagem SEM acento

```
git add .claude .gitignore .flatdropignore CLAUDE.md INSTRUCOES-DO-PROJETO.md scripts logs/2026-11-03.md meta/CEREBRO.md meta/CHANGELOG.md meta/CONTEXT.md meta/DECISIONS.md meta/GLOSSARY.md meta/HISTORY.md meta/IDEAS.md meta/LOG-TEMPLATE.md meta/SPEC.md meta/STATUS.md meta/workorders
```

```
git commit -m "docs(kit): aplica template-update KCM v1.133.0 e adota modo Claude Code (DEC-009)" -m "CEREBRO e INSTRUCOES do kit, CLAUDE.md, .claude/ com skills apply-wo/wrap/sondar, scripts/check.sh (guarda ES5), HISTORICO renomeado para HISTORY, Arquivos Criticos movidos para o CONTEXT, DEC-009 substitui DEC-008."
```

```
git push
```

*Escrita a partir do modelo `meta/workorders/_TEMPLATE.md` (Kit de Contexto Universal v1.133.0).*
