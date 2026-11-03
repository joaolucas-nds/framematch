# CHANGELOG

> Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/) e versionamento [SemVer](https://semver.org/lang/pt-BR/).
> **Cresce**: entradas novas no topo. Registra só o que foi de fato concluído/entregue.

---

## [Não lançado]

> Implementado em 2026-11-03, **aguardando teste no Figma**. Vira **0.5.0** após validação.

### Adicionado
- **Offset X/Y no Passo 5** (DEC-010): dois steppers (passo 10, aceitam negativos) que deslocam o catálogo a partir do ponto de partida; padrão 0/0.
- **Catálogo no lugar do template:** com «Excluir template após gerar» marcado, o 1º frame nasce na posição do template, sem deixar buraco. Uma linha no Passo 5 diz o ponto de partida.

### Corrigido
- A origem do grid usava a posição do template lida no Passo 2; agora usa a posição na hora de gerar (template movido depois da seleção).

---

## [0.4.0] — 2026-11-03

> Implementada em 2026-06-15; validada no Figma Desktop em 2026-11-03 (roteiro de 12 itens, todos ok: nome, layout e valores do Passo 5, botões, digitação, clamp, geração com os valores, espaços duplos, múltiplos slots, PNG transparente).

### Modificado
- **Renomeado o projeto de CatalogFiller para FrameMatch** (DEC-007): `manifest.json` (`name` e `id` → `framematch-plugin-v1`), cabeçalho de `code.js` e todos os documentos de contexto. O `id` do manifest mudou — pode exigir re-importar o manifest no Figma uma vez.
- **Passo 5 — stepper editável unificado** (DEC-006): os 3 campos (Por linha, Espaço X, Espaço Y) agora usam o controle `[−] [caixa] [+]`. "Por linha" ganhou caixa de digitação (antes era só display); Espaço X/Y ganharam botões +/− (antes eram inputs crus). Layout do Passo 5 mantém os 3 campos lado a lado, compactos (uma pilha vertical foi tentada e revertida em 2026-07-17 — DEC-006).

### Adicionado
- Helpers ES5 `stepField(id, delta, min, step)` e `clampField(id, min)` centralizando a lógica dos três steppers; setas nativas do `input[type=number]` ocultadas.

---

## [0.3.0] — 2026-05-30

### Corrigido
- **Bug crítico de espaços duplos (FIX-001):** `normName` colapsava espaços múltiplos; `norm()` do `code.js` não — chaves divergiam silenciosamente para produtos com dois espaços consecutivos no CSV (ex: `ARM ACO  AMEIXA`). Corrigido tornando `normName` idêntico a `norm()`.

### Adicionado
- **Múltiplos slots de imagem:** o Passo 3 agora suporta N slots independentes (coluna CSV → camada Figma → modo Fit/Fill), com botão `＋ Adicionar slot` e `×` para remover.
- **Auto-mapeamento inteligente de imagens:** ao entrar no Passo 3, compara camadas não-TEXT com colunas do CSV por nome normalizado. Se encontrar pares, cria slots automáticos; se não, cria um slot vazio para mapeamento manual.
- **Auto-detecção do frame template (Passo 2):** ao entrar na tela, dispara `get-selection` automaticamente. Se o nome do frame bater com a lista `TEMPLATE_NAMES` (configurável), exibe confirmação visual.
- **Pular Passo 4 automaticamente:** se nenhum slot de imagem estiver configurado, "Próximo" no Passo 3 vai direto para o Passo 5.
- **Botões +/− para "Por linha"** no Passo 5 — substitui a caixa de número.
- **Checkbox "Excluir template após gerar":** remove o frame template permanentemente. Quando marcado, "Ocultar" é desabilitado (redundante) e um aviso laranja aparece.
- **Padrões dos checkboxes configuráveis** via constantes `DEFAULT_HIDE_TEMPLATE` e `DEFAULT_DELETE_TEMPLATE`.
- Status do Passo 4 exibe cabeçalho por slot quando há 2+ slots configurados.

### Modificado
- **`code.js`:** migrou de `imageMapping` (singular) para `imageMappings` (array de slots). Adicionado suporte a `deleteTemplate` (`tpl.remove()`). Comentário no `norm()` explicando a invariante de sincronização.
- Layout do Passo 5 reorganizado em grid `auto 1fr 1fr`.

---

## [0.2.0] — 2026-05-30

### Adicionado
- `normForMatch`: função de normalização para matching arquivo↔CSV — remove tudo que não é letra/número, resolvendo `*`, `/`, `_`, `#` e MT² sem corrupção.
- Limitador de tamanho de imagem (`SIZE_LIMIT_MB = 4`): arquivos acima do limite aparecem em chip laranja e são pulados na geração.
- Auto-mapeamento do campo de imagem único: se coluna CSV e camada não-TEXT tiverem o mesmo nome normalizado, o campo é pré-selecionado.
- Chips com três cores: verde (encontrada), laranja (grande demais), vermelho (não encontrada).
- Aviso descritivo para imagens acima do limite.

### Corrigido
- FIX-004: chips duplicados por produto com caracteres especiais (csvSet tinha duas chaves por entrada).

---

## [0.1.0] — 2026-05-28 (aprox.)

### Adicionado
- Plugin funcional em 5 passos: CSV → Template → Mapeamento → Imagens → Gerar.
- Preenchimento de texto em massa: mapeamento coluna CSV → camada TEXT por nome.
- Auto-mapeamento de texto (coluna com mesmo nome da camada).
- Seletor único de imagem (coluna + camada + Fit/Fill).
- Transferência de imagens como `Array.from(Uint8Array)` — sem canvas, sem compressão.
- Grade configurável: colunas, espaço X, espaço Y.
- Barra de progresso durante geração.
- Opção "Ocultar template após gerar".
- UI dark com design fiel ao Figma (Inter, paleta #1e1e1e).
