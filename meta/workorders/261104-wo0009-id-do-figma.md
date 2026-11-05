# WO 0009 — Versionar o `id` atribuido pelo Figma e registrar o formulario de Publish

> **Tipo:** WO de DOC (registro) + versiona `manifest.json` (editado pelo dono) e 3 docs do chat.
> **Config sugerida:** Sonnet · `/effort low`.
> **Pre-requisito:** `main` em `23b2f8a`, igual a `origin/main`; pendentes so os 4 arquivos abaixo e esta WO.
> **Base:** `id` gerado pelo dono no formulario de Publish (2026-11-04, prints na pasta-pai).
> **Arquivos versionados por esta WO, com o `sha1sum` medido pelo chat** (Edicao 0 confere; o `manifest.json` foi editado pelo DONO, o chat so mediu):
>   - `manifest.json` — `1e855dc612a9c9c43b2b474c114d3243421e7515`
>   - `CLAUDE.md` — `00c10f3d219fa21d76adc12a2d6882bbf69ff2cf`
>   - `meta/CONTEXT.md` — `a6f55d0a492b8a0ea5d574b093d396ea932bf289`
>   - `meta/GLOSSARY.md` — `a787aab4e6cac6a47ad2a60b65180db6263a4587`
> **Ancora semantica:** 1 ocorrencia, senao **PARE e reporte**. **Idempotencia:** texto novo inteiro presente e ancora ausente (salvo «trocar») = PULE e diga.
> **Ancoras lidas em:** copiadas por script do disco NESTE turno do chat e conferidas por simulacao: `meta/CHANGELOG.md` (topo), `meta/STATUS.md` (item do nome em Funcionando, itens Publicar/Depois do Publish, titulo Ultima conversa), `meta/ROADMAP.md` (item do `id` na F4.5, item `clientStorage` da F5), `logs/2026-11-04.md` (ultima linha).
> **Fim de linha:** LF. **Canal dos meta neste ciclo = CODE.**

---

## 1. Por que

O Figma so publica com o `id` que ele gera; o dono ja gravou o novo `id` no `manifest.json`. Registrar a troca (premissa da DEC-007/DEC-011) e liberar a F5.

## Fora de escopo

- Nada no codigo do plugin. O clique em «Publicar» e do dono.
- `bash scripts/check.sh` nao e necessario (o manifest e JSON; confira so que e JSON valido — ver checklist).

---

## Edicao 0 — conferir os arquivos

```
sha1sum manifest.json CLAUDE.md meta/CONTEXT.md meta/GLOSSARY.md
```

Hash diferente = **PARE e reporte**.

## Edicao 1a — `meta/CHANGELOG.md` · topo, corpo de `[Não lançado]`

**Substituir.** Ancora:

```
## [Não lançado]

_(nada ainda)_
```

**Texto novo:**

```
## [Não lançado]

### Modificado
- `id` do `manifest.json`: `framematch-plugin-v1` → `1699960853154847369`, atribuído pelo Figma no formulário de Publish (2026-11-04, DEC-011). Sem mudança de comportamento.
```

## Edicao 2a — `meta/STATUS.md` · «Funcionando», item do nome

**Substituir.** Ancora:

```
- Nome **FrameMatch** no Figma (`id` `framematch-plugin-v1`, DEC-007).
```

**Texto novo:**

```
- Nome **FrameMatch** no Figma; `id` `1699960853154847369`, atribuído pelo Figma no Publish (DEC-007, DEC-011).
```

## Edicao 2b — `meta/STATUS.md` · Backlog, itens do Publish e do `id`

**Substituir.** Ancora:

```
- [ ] **Publicar:** anúncio pronto em `../261104-figma-listing/` (textos com contato, ícone, capa, carrossel de 6 slides); ligar a 2FA na conta do Figma e clicar «Publish» no app desktop.
- [ ] **Depois do Publish:** trocar o `id` do `manifest.json` pelo que o Figma atribuir (WO pequena) — só então a F5 (`clientStorage`).
```

**Texto novo:**

```
- [ ] **Publicar:** formulário preenchido e revisado pelo chat em 2026-11-04 (textos, imagens, segurança de dados, contato, `id`, «Sem acesso à rede») — falta o dono clicar «Publicar» e aguardar a revisão do Figma (e-mail).
- [ ] **F5 (`clientStorage`) liberada pelo `id`** — e, quando entrar, **atualizar o formulário de segurança de dados**: a pergunta 4 passa a «stores data locally (figma.clientStorage)».
```

## Edicao 2c — `meta/STATUS.md` · título da última seção

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
## 💬 Última conversa
```

**Texto novo:**

```
## 💬 Última conversa

**2026-11-04 (madrugada do Publish)** — `id` atribuído pelo Figma (`1699960853154847369`) gravado no `manifest.json` pelo dono e versionado pela WO 0009. Formulário de Publish revisado pelo chat pelos prints: tudo certo (contato de suporte, «Sem acesso à rede», segurança de dados com respostas corretas). Liberado para publicar.
```

## Edicao 3a — `meta/ROADMAP.md` · F4.5, item do `id`

**Substituir.** Ancora:

```
- [ ] Trocar o `id` do manifest pelo do Figma.
```

**Texto novo:**

```
- 🟢 `id` do manifest trocado pelo do Figma (`1699960853154847369`) — *2026-11-04.*
```

## Edicao 3b — `meta/ROADMAP.md` · F5, item `clientStorage`

**Substituir (âncora repetida no topo do texto novo).** Ancora:

```
- **Persistência automática via `figma.clientStorage`** — lembra último mapeamento, grade e checkboxes entre sessões (caso comum). **Atenção (2026-11-03):** ao publicar na Community o Figma atribui um `id` novo, e o `clientStorage` fica preso a ele — fazer a F5 só com o `id` definitivo.
```

**Texto novo:**

```
- **Persistência automática via `figma.clientStorage`** — lembra último mapeamento, grade e checkboxes entre sessões (caso comum). **Atenção (2026-11-03):** ao publicar na Community o Figma atribui um `id` novo, e o `clientStorage` fica preso a ele — fazer a F5 só com o `id` definitivo. **`id` definitivo desde 2026-11-04.** Ao publicar a F5, atualizar o formulário de segurança de dados (pergunta 4: passa a guardar dados locais via `figma.clientStorage`).
```

## Edicao 4a — `logs/2026-11-04.md` · fim do arquivo

**Substituir (âncora = última linha; repetida no texto novo).** Ancora:

```
- Fecho da WO 0008 (`4721d50`, tag `v0.6.1` empurrada): About e Release NÃO feitos — `gh` fora do PATH da sessão. Relatório `261104-2035-code-framematch-apply-wo0008.txt` conferido contra git (HEAD = origin/main = 4721d50), sem divergência. Pendência: 5c/5d em sessão nova.
```

**Texto novo:**

```
- Fecho da WO 0008 (`4721d50`, tag `v0.6.1` empurrada): About e Release NÃO feitos — `gh` fora do PATH da sessão. Relatório `261104-2035-code-framematch-apply-wo0008.txt` conferido contra git (HEAD = origin/main = 4721d50), sem divergência. Pendência: 5c/5d em sessão nova.

## Conversa 1 (madrugada) — formulário de Publish
- Dono gerou o `id` no formulário (`1699960853154847369`) e gravou no `manifest.json`; mandou 11 prints do formulário.
- Revisão pelos prints: nome, slogan (59/100), descrição, categoria «Importar e exportar», tags (Imagem + 4 personalizadas), ícone, capa, carrossel, segurança de dados (sem backend, sem rede, sem login, sem armazenamento, dev solo), publicar na Comunidade como João Lucas (@joaolucasnds), Termos aceitos, comentários ligados, contato de suporte = e-mail do dono, ID do plugin, «Sem acesso à rede». Nada bloqueante; sugestão opcional de tag.
- WO 0009: versiona o `id` e tenta de novo About/Release com o `gh` pelo caminho completo.
```

## Edicao 5 — GitHub · About e Release (nova tentativa, opcional)

O relatorio da WO 0008 mostrou `gh: command not found` e o binario em `C:\Program Files\GitHub CLI`. Use o caminho completo:

```
"/c/Program Files/GitHub CLI/gh.exe" auth status
```

So se a conta ativa for `joaolucas-nds` (github.com): rode, com o mesmo caminho completo no lugar de `gh`, os comandos **5c** (About) e **5d** (Release `v0.6.1`) da `meta/workorders/261104-wo0008-lanca-0.6.1.md` — o texto e o mesmo, copie de la. Senao (nao autenticado, outra conta, ou binario ausente): **nao faca login nem switch**; copie a saida crua no relatorio e siga. Nada desta edicao bloqueia o commit.


## Depois de aplicar — conferencia antes do commit

- [ ] `git status --short` mostra **so**: `M` em `manifest.json`, `CLAUDE.md`, `meta/CONTEXT.md`, `meta/GLOSSARY.md`, `meta/CHANGELOG.md`, `meta/STATUS.md`, `meta/ROADMAP.md`, `logs/2026-11-04.md`; `??` nesta WO. Fora disso: VERMELHO.
- [ ] Saldo de linhas (`wc -l`, simulado pelo chat): `meta/CHANGELOG.md` 114 → 115 · `meta/STATUS.md` 67 → 69 · `meta/ROADMAP.md` 71 → 71 · `logs/2026-11-04.md` 54 → 59. Diferente: VERMELHO.
- [ ] `grep -c '1699960853154847369' manifest.json` → **1** · `grep -c 'framematch-plugin-v1' manifest.json meta/STATUS.md` → **0** e **0**
- [ ] `node -e "JSON.parse(require('fs').readFileSync('manifest.json','utf8'));console.log('json ok')"` → `json ok` (se nao houver `node`, diga e siga).
- [ ] **Teste manual:** nenhum.

## Relatorio de aplicacao

Como manda `/apply-wo`; grave tambem em `../AAMMDD-HHMM-code-framematch-apply-wo0009.txt`.

## Commit — blocos separados, mensagem SEM acento

```
git add manifest.json CLAUDE.md meta/CONTEXT.md meta/GLOSSARY.md meta/CHANGELOG.md meta/STATUS.md meta/ROADMAP.md logs/2026-11-04.md meta/workorders/261104-wo0009-id-do-figma.md
```

```
git commit -m "chore(publish): troca o id do manifest pelo atribuido pelo Figma" -m "id 1699960853154847369, gerado no formulario de Publish (DEC-011). Formulario revisado; F5 liberada."
```

```
git push
```

Depois do push, a Edicao 5 (opcional).

*Escrita a partir do modelo `meta/workorders/_TEMPLATE.md` (Kit de Contexto Universal v1.133.0).*
