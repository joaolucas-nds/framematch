# WO 0011 — Fecho da conversa: stand-by ate a resposta do Figma

> **Tipo:** WO de DOC (registro) + versiona 2 arquivos do chat. **Config sugerida:** Sonnet · `/effort low`.
> **Pre-requisito:** `main` em `230516a`, igual a `origin/main`; pendentes so os 2 arquivos abaixo e esta WO.
> **Base:** dono, 2026-11-06: «Vamos pausar o desenvolvimento… ficaremos em stand by» [relatado pelo dono].
> **Arquivos que o chat gravou no disco e esta WO versiona** (sha1 medido ao gravar — Edicao 0 confere):
>   - `meta/CEREBRO.md` — `8982a0771b6a8353ac27ae5fc06d28f82aa5c91f`
>   - `CLAUDE.md` — `6146b9cc14ee547061b2b629a8ff676a3e1ece1d`
> **Ancoras lidas em:** copiadas por script do disco NESTE turno e conferidas por simulacao: `meta/STATUS.md` (Em Progresso, item da F5 no Backlog, titulo Ultima conversa), `logs/2026-11-06.md` (ultima linha), `meta/IDEAS.md` (ultima linha).
> **Ancora semantica:** 1 ocorrencia, senao **PARE e reporte**. **Fim de linha:** LF. **Canal dos meta = CODE.**

---

## 1. Por que

Fechar a conversa com o estado real: desenvolvimento em stand-by ate o e-mail da revisao. A proxima conversa le o repo.

## Fora de escopo

Nada no codigo. O handoff fica na pasta-pai e NAO entra no git.

---

## Edicao 0 — conferir os arquivos do chat

```
sha1sum meta/CEREBRO.md CLAUDE.md
```

Hash diferente = **PARE e reporte**.

## Edicao 1a — `meta/STATUS.md` · corpo de «🔧 Em Progresso»

**Substituir.** Ancora:

```
- Nada em progresso. Próximo passo é do dono: Publish (Backlog).
```

**Texto novo:**

```
- **Stand-by** (decisão do dono, 2026-11-06 [relatado pelo dono]): desenvolvimento pausado até a resposta da revisão do Figma. Nada em progresso.
```

## Edicao 1b — `meta/STATUS.md` · Backlog, item da F5

**Substituir.** Ancora:

```
- [ ] **F5 (`clientStorage`) liberada pelo `id`** — e, quando entrar, **atualizar o formulário de segurança de dados**: a pergunta 4 passa a «stores data locally (figma.clientStorage)».
```

**Texto novo:**

```
- [ ] **F5 (`clientStorage`) — PAUSADA até a resposta do Figma** (decisão do dono, 2026-11-06). Liberada pelo `id` definitivo; quando entrar, atualizar a pergunta 4 do formulário de segurança de dados («stores data locally (figma.clientStorage)»). Primeiro passo: o chat escreve a spec.
```

## Edicao 1c — `meta/STATUS.md` · título da última seção

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
## 💬 Última conversa
```

**Texto novo:**

```
## 💬 Última conversa

**2026-11-06 (fecho)** — WO 0010 aplicada (`230516a`). **Stand-by** por decisão do dono até o e-mail da revisão do Figma; a F5 fica para depois da resposta. Conversa encerrada para transferência — handoff em `../261106-HANDOFF-BRIEF.md` (fora do git). Técnicas novas registradas: `gh` pelo caminho completo (CEREBRO, CLAUDE.md) e `python`/`python3` travando no Code (CLAUDE.md).
```

## Edicao 2a — `logs/2026-11-06.md` · fim do arquivo

**Substituir (âncora = última linha; repetida no texto novo).** Ancora:

```
- Em paralelo: spec da F5 (`clientStorage`) — lembrar de atualizar a pergunta 4 do formulário de segurança ao publicar.
```

**Texto novo:**

```
- Em paralelo: spec da F5 (`clientStorage`) — lembrar de atualizar a pergunta 4 do formulário de segurança ao publicar.

## Conversa 1 (fecho) — stand-by e transferência
- WO 0010 aplicada e empurrada (`230516a`).
- Decisão do dono: **pausar** o desenvolvimento até a resposta da revisão do Figma; a spec da F5 fica para depois [relatado pelo dono].
- CEREBRO («Técnicas específicas»): `gh` no PC do dono (caminho completo, conta `joaolucas-nds`, login é do dono) e a pasta do anúncio. CLAUDE.md: armadilhas do ambiente — `python`/`python3` travaram 120 s nos `/wrap` das WOs 0007 e 0009 [medido: relatórios]; `gh` pelo caminho completo.
- Feedback para o Kit: WO gerada por script e simulada a partir do próprio texto (IDEAS).
- Handoff: `../261106-HANDOFF-BRIEF.md` (pasta-pai, fora do git).
- WO 0011: este fecho.
```

## Edicao 3a — `meta/IDEAS.md` · fim do arquivo (último item de «Feedback para o Kit»)

**Substituir (âncora = última linha; repetida no texto novo).** Ancora:

```
- **[2026-11-03]** O modelo do `IDEAS.md` traz a seção «Feedback para o ASU» mesmo num pacote gerado com `ASU nao` — é sobra do modo desligado. Não adotada aqui.
```

**Texto novo:**

```
- **[2026-11-03]** O modelo do `IDEAS.md` traz a seção «Feedback para o ASU» mesmo num pacote gerado com `ASU nao` — é sobra do modo desligado. Não adotada aqui.
- **[2026-11-06]** WOs geradas por **script** no chat (âncora recortada do disco, contagem de ocorrência conferida) e **simuladas a partir do próprio texto da WO** numa cópia do repo antes de entregar: 11 WOs seguidas (0001–0011) sem âncora errada; os desvios relatados pelo Code foram só de mecânica (Edit × script), nunca de conteúdo. Vale virar recomendação do kit para a raia de planejamento quando ela tem shell.
```

## Depois de aplicar — conferencia antes do commit

- [ ] `git status --short` mostra **so**: `M` em `meta/CEREBRO.md`, `CLAUDE.md`, `meta/STATUS.md`, `meta/IDEAS.md`, `logs/2026-11-06.md`; `??` nesta WO.
- [ ] Saldo de linhas (`wc -l`, simulado pelo chat): `meta/STATUS.md` 73 → 75 · `meta/IDEAS.md` 100 → 101 · `logs/2026-11-06.md` 16 → 24.
- [ ] `grep -c 'Stand-by' meta/STATUS.md` → **1** · `grep -c '^## 💬 Última conversa' meta/STATUS.md` → **1**
- [ ] Depois do push: `git status -sb` → `## main...origin/main` sem nada pendente.

## Relatorio de aplicacao

Como manda `/apply-wo`; grave tambem em `../AAMMDD-HHMM-code-framematch-apply-wo0011.txt`. **Nao rode `/wrap` depois** — esta WO ja e o fecho do dia.

## Commit — blocos separados, mensagem SEM acento

```
git add meta/CEREBRO.md CLAUDE.md meta/STATUS.md meta/IDEAS.md logs/2026-11-06.md meta/workorders/261106-wo0011-fecho-stand-by.md
```

```
git commit -m "docs(status): fecha a conversa em stand-by ate a resposta do Figma" -m "Tecnicas do ambiente no CEREBRO e no CLAUDE.md (gh pelo caminho completo, python travando)."
```

```
git push
```

*Escrita a partir do modelo `meta/workorders/_TEMPLATE.md` (Kit de Contexto Universal v1.133.0).*
