# SPEC — Offset X/Y do grid e catálogo no lugar do template

> **Status:** Aprovada pelo dono em 2026-11-03 (decisões → DEC-010) · **Data:** 2026-11-03
> **Frente:** ROADMAP F4 · **Origem:** IDEAS «Offset X/Y configurável no Passo 5» (2026-05-30) e «Ao excluir o template, gerar o catálogo na posição dele» (2026-07-17).
> **Versão alvo:** 0.5.0 (funcionalidade nova, sem quebra).

## Problema
Hoje o primeiro frame gerado nasce sempre **60 px à direita do template**, na altura dele (`ox = TPL.x + TPL.w + 60`, `oy = TPL.y`, montado no `ui.html`). Isso causa dois problemas:
1. **Com "Excluir template após gerar" marcado (é o padrão)**, o template some e fica um **buraco** onde ele estava. O catálogo aparece deslocado, e o usuário arrasta tudo à mão a cada geração.
2. **Não há como escolher onde o grid nasce.** Quando o template fica num canto da página, ou há outros elementos à direita dele, os frames gerados caem por cima do que já existe.

**Defeito latente achado na leitura do código:** `TPL.x` e `TPL.y` são lidos **no Passo 2**, quando o template é selecionado. Se o usuário move o template entre o Passo 2 e o clique em Gerar, o grid nasce na posição velha. Com o modo "no lugar do template" isso passa a importar, então a spec corrige.

## Critérios de aceite (verificáveis no Figma Desktop)
> Conferência no painel de propriedades do Figma: **X/Y do primeiro frame gerado** (canto superior esquerdo, na 1ª linha e 1ª coluna) comparado com o X/Y do template, anotado antes de gerar. Os números do painel são relativos ao pai, e template e clones têm o mesmo pai.

- [ ] **Sem regressão:** com Offset X = 0, Offset Y = 0 e "Excluir" **desmarcado**, o 1º frame nasce em `X = X_tpl + largura_tpl + 60` e `Y = Y_tpl`, igual à 0.4.0.
- [ ] **No lugar do template:** com Offset 0/0 e "Excluir" **marcado**, o 1º frame nasce em `X = X_tpl` e `Y = Y_tpl`, e o template é excluído no fim. Não sobra buraco.
- [ ] **Offset à direita:** com Offset X = 200, Y = −100 e "Excluir" desmarcado, o 1º frame nasce em `X_tpl + largura_tpl + 60 + 200` e `Y_tpl − 100`.
- [ ] **Offset no lugar:** com Offset X = 200, Y = −100 e "Excluir" marcado, o 1º frame nasce em `X_tpl + 200` e `Y_tpl − 100`.
- [ ] **Posição viva:** selecione o template no Passo 2, **mova-o** no canvas e só então clique em Gerar. O cálculo usa a posição **nova**.
- [ ] **Steppers de Offset:** `[−] [caixa] [+]` com passo de **10**. Aceitam **negativos**. Campo vazio ou não numérico vira **0** ao sair do campo.
- [ ] **Aviso de ponto de partida:** abaixo dos campos, uma linha diz de onde o grid parte. Com "Excluir" desmarcado: «Ponto de partida: à direita do template (+60 px)». Marcado: «Ponto de partida: no lugar do template (ele será excluído)». A frase troca na hora em que o checkbox muda.
- [ ] **Espaçamento intacto:** Por linha, Espaço X e Espaço Y continuam valendo como na 0.4.0.
- [ ] `bash scripts/check.sh` sai com 0.

## Decisões de design
1. **O Offset é um AJUSTE somado ao ponto de partida, com padrão 0/0.** Não é uma coordenada absoluta. Assim, 0/0 reproduz exatamente os dois comportamentos (à direita, ou no lugar) e o usuário só mexe quando quer.
   - *Descartado:* **coordenada absoluta do canvas.** O usuário teria de ler o X/Y no Figma e digitar, e o padrão dependeria do template.
   - *Descartado:* **Offset padrão 60** como distância do template. Esse padrão teria de virar 0 quando "Excluir" fosse marcado, o que é estado escondido e confuso.
2. **O ponto de partida segue o checkbox "Excluir template".** Não há controle novo de modo, que é o que a ideia de 2026-07-17 pede. "Ocultar template" **não** muda o ponto de partida: o template oculto continua lá, e gerar por cima dele confundiria quem o reexibir.
   - *Descartado:* um seletor «Posição do catálogo». Seria um controle a mais para algo que o checkbox já decide.
3. **O cálculo da origem passa para o `code.js`**, com o template **vivo** (`tpl.x`, `tpl.y`, `tpl.width`), na hora de gerar. O `ui.html` manda só o que o usuário escolheu (`offX`, `offY`) e o `deleteTemplate`, que já é enviado. Isso corrige o defeito da posição velha na causa, sem nova mensagem entre os dois lados.
4. **Os campos novos reusam `stepField`/`clampField`** (DEC-006), com mínimo bem negativo (−100000) para aceitar negativos. Os dois helpers ganham um **5º/3º parâmetro opcional `fallback`** (valor usado quando a caixa está vazia ou não numérica): sem ele, vazio viraria −100000. Os 3 campos antigos não passam o parâmetro e mantêm o comportamento da 0.4.0. Ficam numa **segunda linha** do card Grade, com 2 campos, porque a primeira linha já tem 3 e a janela tem 520 px. *(Ajuste feito ao escrever a WO, depois da aprovação: a leitura do `clampField` mostrou que vazio cairia no mínimo.)*
5. A distância de 60 px "à direita" continua fixa no código (constante nomeada). Expor esse valor é o próprio Offset X.

→ Registradas como **DEC-010** no `DECISIONS.md`.

## Fora de escopo
- Lembrar os offsets entre usos: é a F5 (`clientStorage`).
- Template dentro de **auto-layout** (o pai reposiciona os filhos e ignora X/Y). Comportamento atual mantido; se incomodar, vira ideia.
- Detecção de re-geração (outro item da F4).
- Mudar o comportamento de "Ocultar template".

## Passos
1. **`code.js`:** trocar `ox`/`oy` vindos da UI pelo cálculo com o template vivo. Origem = `deleteTemplate ? (tpl.x, tpl.y) : (tpl.x + W + GRID_GAP_RIGHT, tpl.y)`, mais `offX`/`offY`. Constante `GRID_GAP_RIGHT = 60`, com comentário.
2. **`ui.html`:** dois steppers (Offset X, Offset Y) numa segunda linha do card Grade, com passo 10 e padrão 0. Ligações `stepField`/`clampField` com mínimo −100000. Linha de aviso do ponto de partida, atualizada no `onchange` do `del-tpl` e na abertura do Passo 5. No payload `grid`: sai `ox`/`oy`, entram `offX`/`offY`.
3. Rodar `bash scripts/check.sh`.
4. O dono roda o roteiro, montado a partir dos critérios de aceite acima.

## Armadilhas
- **ES5 nos dois arquivos** (DEC-001). Observação medida na leitura: o `code.js` **já usa `async`/`await`** em `runGenerate`, e funciona no sandbox. Isso não autoriza arrow, `let`/`const` ou template literal. Código novo segue ES5, e o `check.sh` não acusa `async`.
- **`|| 0` engole o zero legítimo, mas o do offset está certo:** 0 é o padrão. Já para negativos, `parseInt('-100') || 0` dá −100, então não há problema. Não troque por `Math.max`.
- O template é excluído **depois** de clonar. No modo "no lugar", os clones ficam sobrepostos ao template até o fim da geração. Se `tpl.remove()` falhar (o `try` engole o erro, por exemplo com o template travado), o template fica por baixo do 1º frame. Vale um aviso na mensagem `done` quando a exclusão falhar.
