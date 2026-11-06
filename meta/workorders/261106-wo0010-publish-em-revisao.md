# WO 0010 — Registrar o envio do FrameMatch para a revisao da Community

> **Tipo:** WO de DOC (registro). **Config sugerida:** Sonnet · `/effort low`.
> **Pre-requisito:** `main` em `7157f32`, igual a `origin/main`; arvore limpa (so esta WO como `??`).
> **Base:** dono, 2026-11-06: «Publiquei (com as respostas de seguranca), esta em review» [relatado pelo dono].
> **Ancoras lidas em:** copiadas por script do disco NESTE turno do chat e conferidas por simulacao: `meta/STATUS.md` (item «Publicar» do Backlog, titulo «Ultima conversa»), `meta/ROADMAP.md` (item do Publish na F4.5).
> **Ancora semantica:** 1 ocorrencia, senao **PARE e reporte**. **Fim de linha:** LF. **Canal dos meta = CODE.**

---

## 1. Por que

O plugin foi enviado para a revisao; o STATUS ainda diz «falta o dono clicar Publicar».

## Fora de escopo

Nada no codigo. Nao tocar no IDEAS.

---

## Edicao 1a — `meta/STATUS.md` · Backlog, item Publicar

**Substituir.** Ancora:

```
- [ ] **Publicar:** formulário preenchido e revisado pelo chat em 2026-11-04 (textos, imagens, segurança de dados, contato, `id`, «Sem acesso à rede») — falta o dono clicar «Publicar» e aguardar a revisão do Figma (e-mail).
```

**Texto novo:**

```
- [ ] **Revisão da Community:** enviado pelo dono até 2026-11-06, com o formulário de segurança de dados [relatado pelo dono]. Aguardar o e-mail do Figma; se recusar, o motivo vem no e-mail — trazer para o chat.
```

## Edicao 1b — `meta/STATUS.md` · título da última seção

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
## 💬 Última conversa
```

**Texto novo:**

```
## 💬 Última conversa

**2026-11-06** — **FrameMatch 0.6.1 enviado para a revisão da Figma Community** (público, com as respostas de segurança de dados). About e Release `v0.6.1` do GitHub feitos pela WO 0009. Enquanto a revisão corre: próxima frente candidata é a F5 (`clientStorage`), já liberada pelo `id` definitivo.
```

## Edicao 2a — `meta/ROADMAP.md` · F4.5, item do Publish

**Substituir.** Ancora:

```
- [ ] «Publish» no app desktop (2FA) e aprovação na revisão.
```

**Texto novo:**

```
- 🟡 «Publish» feito (até 2026-11-06, com segurança de dados) — *em revisão no Figma; a fase fecha com a aprovação.*
```

## Edicao 3 — `logs/2026-11-06.md` · criar o log do dia

**Criar arquivo novo.** Se ja existir, acrescente a partir de `## Conversa 1`, renumerando, e diga.

````
# Log — 2026-11-06

## Conversa 1

### Feito
- Dono publicou o FrameMatch 0.6.1 na Figma Community, com as respostas de segurança de dados; status «In review» [relatado pelo dono].
- WO 0009 aplicada (`9e7afef`): `id` do Figma versionado; About e Release `v0.6.1` feitos com o `gh` pelo caminho completo. Wrap `7157f32` fechou a pendência da WO 0008.
- WO 0010: registra o envio para revisão (STATUS, ROADMAP, este log).

### Onde parei
Aguardando a revisão do Figma (e-mail). F4.5 fecha com a aprovação.

### Próximos passos
- Se aprovado: registrar o link do plugin na Community no README e no STATUS.
- Se recusado: trazer o motivo para o chat.
- Em paralelo: spec da F5 (`clientStorage`) — lembrar de atualizar a pergunta 4 do formulário de segurança ao publicar.
````

## Depois de aplicar — conferencia antes do commit

- [ ] `git status --short` mostra **so**: `M` em `meta/STATUS.md`, `meta/ROADMAP.md`; `??` em `logs/2026-11-06.md` e nesta WO.
- [ ] Saldo de linhas (`wc -l`, simulado pelo chat): `meta/STATUS.md` 71 → 73 · `meta/ROADMAP.md` 71 → 71.
- [ ] `grep -c 'falta o dono clicar' meta/STATUS.md` → **0** · `grep -c '^## 💬 Última conversa' meta/STATUS.md` → **1**

## Relatorio de aplicacao

Como manda `/apply-wo`; grave tambem em `../AAMMDD-HHMM-code-framematch-apply-wo0010.txt`.

## Commit — blocos separados, mensagem SEM acento

```
git add meta/STATUS.md meta/ROADMAP.md logs/2026-11-06.md meta/workorders/261106-wo0010-publish-em-revisao.md
```

```
git commit -m "docs(publish): registra o envio do FrameMatch para a revisao da Community"
```

```
git push
```

*Escrita a partir do modelo `meta/workorders/_TEMPLATE.md` (Kit de Contexto Universal v1.133.0).*
