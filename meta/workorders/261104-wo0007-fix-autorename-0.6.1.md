# WO 0007 — FIX-005: camada de texto nao renomeia nos frames gerados (0.6.1)

> **Tipo:** mista — WO de CODIGO (`code.js`, 1 edicao) + registro.
> **Config sugerida:** Sonnet · `/effort medium`.
> **Pre-requisito:** **WO 0006 aplicada e empurrada** (as ancoras do STATUS, CHANGELOG, ROADMAP e log sao as do estado DEPOIS da 0006); arvore limpa.
> **Depende de:** `meta/workorders/261104-wo0006-lanca-0.6.0.md`.
> **Base:** prints do dono de 2026-11-04 (painel de camadas dos frames gerados); docs do Figma, `TextNode.autoRename`.
> **Ancoras lidas em:** `code.js` lido do disco NESTE turno do chat; as dos `meta/` e do log, do estado simulado depois da WO 0006, a partir do texto dela. Simulacao das duas WOs em sequencia: todas as ancoras com 1 ocorrencia.
> **Arquivos do chat:** nenhum.
> **Ancora semantica:** ancora que nao bater EXATAMENTE (1 ocorrencia) = **PARE e reporte**. **Idempotencia:** texto novo inteiro presente e ancora ausente (salvo «trocar») = PULE e diga.
> **Fim de linha:** LF. **Canal dos meta neste ciclo = CODE.**

---

## 1. Por que

O Figma renomeia uma camada de texto para o conteudo quando `autoRename` esta ligado (padrao em camada nunca renomeada a mao). Nos frames gerados, `Name` vira «Potted Fern»: quebra o matching por nome se alguem usar um frame gerado como template, e o painel fica confuso. Correcao de uma linha, antes de publicar.

## Fora de escopo

- Nada alem da edicao 1a no codigo. Nomear os frames pelo valor de uma coluna e outra ideia (IDEAS, 2026-11-04).

---

## Edicao 1a — `code.js` · `runGenerate`, preenchimento de texto

**Substituir.** Ancora:

```
            try { layer.characters = String(row[m.col] !== undefined ? row[m.col] : ''); } catch(e) {}
```

**Texto novo:**

```
            // Sem isto o Figma renomeia a camada para o texto novo (TextNode.autoRename) e o frame
            // gerado perde o nome que o matching usa — vira «Potted Fern» em vez de «Name» (FIX-005).
            try { layer.autoRename = false; } catch(e) {}
            try { layer.characters = String(row[m.col] !== undefined ? row[m.col] : ''); } catch(e) {}
```

## Edicao 2a — `meta/DECISIONS.md` · fim do arquivo (último item do FIX-004)

**Substituir (âncora = última linha do arquivo; repetida no texto novo).** Ancora:

```
- **Lição:** Separar explicitamente "chave de busca", "chave de dicionário" e "valor de exibição" em estruturas de dados diferentes. Misturar papéis numa única chave gera bugs sutis.
```

**Texto novo:**

```
- **Lição:** Separar explicitamente "chave de busca", "chave de dicionário" e "valor de exibição" em estruturas de dados diferentes. Misturar papéis numa única chave gera bugs sutis.

---

## FIX-005 — Camada de texto renomeada para o conteúdo nos frames gerados
**Data:** 2026-11-04 · **Status:** resolvida

- **Sintoma:** nos prints do dono (2026-11-04), a camada `Name` de cada frame gerado aparecia no painel como «Potted Fern», «Lounge Chair»… — o nome virava o texto preenchido.
- **Causa raiz:** `TextNode.autoRename` (docs do Figma: «If this is set to true, `name` will be auto-derived from `characters`»). Camada de texto que nunca foi renomeada à mão nasce com `autoRename = true`; ao trocar `characters`, o Figma troca o nome. Existia desde a 0.1.0.
- **Solução:** `layer.autoRename = false` antes de `layer.characters = …` no `runGenerate` (0.6.1).
- **Lição:** o FrameMatch casa por NOME — tudo que muda nome de camada quebra o produto em silêncio (usar um frame gerado como template, procurar a camada no painel). Antes de escrever numa propriedade de nó, conferir os efeitos colaterais na página da API.
```

## Edicao 3a — `meta/CHANGELOG.md` · topo, corpo de `[Não lançado]`

**Substituir.** Ancora:

```
## [Não lançado]

_(nada ainda)_
```

**Texto novo:**

```
## [Não lançado]

> Implementado em 2026-11-04, **aguardando teste no Figma**. Vira **0.6.1** após validação.

### Corrigido
- As camadas de texto dos frames gerados mantêm o nome do template (`Name`, `Brand`…) em vez de virar o texto preenchido (FIX-005).
```

## Edicao 4a — `meta/STATUS.md` · corpo de «🔧 Em Progresso»

**Substituir.** Ancora:

```
- Nada em progresso.
```

**Texto novo:**

```
- **0.6.1 — implementada, aguardando teste no Figma:** FIX-005 — camada de texto não é mais renomeada para o conteúdo (`autoRename = false`). Publicar já com ela.
```

## Edicao 4b — `meta/STATUS.md` · Backlog, antes do item «Publicar»

**Substituir (âncora repetida no fim do texto novo).** Ancora:

```
- [ ] **Publicar:** anúncio pronto em `../261104-figma-listing/` (textos com contato, ícone, capa, carrossel de 6 slides); ligar a 2FA na conta do Figma e clicar «Publish» no app desktop.
```

**Texto novo:**

```
- [ ] **Testar a 0.6.1 no Figma Desktop** — roteiro curto do chat (2026-11-04).
- [ ] **Publicar:** anúncio pronto em `../261104-figma-listing/` (textos com contato, ícone, capa, carrossel de 6 slides); ligar a 2FA na conta do Figma e clicar «Publish» no app desktop.
```

## Edicao 5a — `meta/ROADMAP.md` · F4.5, antes do item «Publish»

**Substituir (âncora repetida no fim do texto novo).** Ancora:

```
- [ ] «Publish» no app desktop (2FA) e aprovação na revisão.
```

**Texto novo:**

```
- [ ] **0.6.1** — FIX-005 (camada de texto não renomeia) — *implementado, aguardando teste.*
- [ ] «Publish» no app desktop (2FA) e aprovação na revisão.
```

## Edicao 6a — `logs/2026-11-04.md` · fim do arquivo

**Substituir (âncora = última linha; repetida no texto novo).** Ancora:

```
- WO 0006: lançamento 0.6.0 + README com prints + tag `v0.6.0` (+ About do GitHub, se o `gh` estiver autenticado).
```

**Texto novo:**

```
- WO 0006: lançamento 0.6.0 + README com prints + tag `v0.6.0` (+ About do GitHub, se o `gh` estiver autenticado).
- WO 0007: FIX-005 — `layer.autoRename = false` antes de preencher o texto (0.6.1, aguarda o roteiro curto).
```

## Depois de aplicar — conferencia antes do commit

- [ ] `git status --short` mostra **so**: `M` em `code.js`, `meta/DECISIONS.md`, `meta/CHANGELOG.md`, `meta/STATUS.md`, `meta/ROADMAP.md`, `logs/2026-11-04.md`; `??` nesta WO. Fora disso: VERMELHO.
- [ ] Saldo de linhas (`wc -l`, simulado pelo chat sobre o estado pos-0006): `code.js` 173 → 176 · `meta/DECISIONS.md` 269 → 279 · `meta/CHANGELOG.md` 105 → 108 · `meta/STATUS.md` 59 → 60 · `meta/ROADMAP.md` 70 → 71 · `logs/2026-11-04.md` 44 → 45. Diferente: VERMELHO.
- [ ] `grep -c 'autoRename = false' code.js` → **1** · `grep -c '^## FIX-005' meta/DECISIONS.md` → **1**

- [ ] `bash scripts/check.sh` → saida 0.
- [ ] **Teste manual que a validacao NAO cobre:** roteiro curto da 0.6.1, entregue pelo chat no mesmo turno — e do dono. **Chega no ramo?** `runGenerate`, bloco de texto (`autoRename`). **Nao responde:** «o nome da camada ficou certo no Figma?» — so o painel de camadas responde.

## Relatorio de aplicacao

Como manda `/apply-wo`; grave tambem em `../AAMMDD-HHMM-code-framematch-apply-wo0007.txt`.

## Commit — blocos separados, mensagem SEM acento

```
git add code.js meta/DECISIONS.md meta/CHANGELOG.md meta/STATUS.md meta/ROADMAP.md logs/2026-11-04.md meta/workorders/261104-wo0007-fix-autorename-0.6.1.md
```

```
git commit -m "fix(text): nao renomeia a camada de texto ao preencher (FIX-005)" -m "layer.autoRename = false antes de layer.characters; sem isso o Figma trocava o nome da camada pelo conteudo. Aguarda teste no Figma para virar 0.6.1."
```

```
git push
```

*Escrita a partir do modelo `meta/workorders/_TEMPLATE.md` (Kit de Contexto Universal v1.133.0).*
