# SPEC — Preparar a publicação na Figma Community (0.6.0)

> **Status:** Rascunho — o dono decidiu o QUÊ em 2026-11-04 («Community pública, UI em inglês»); detalhes abaixo aguardam o ok dele · **Data:** 2026-11-04
> **Frente:** ROADMAP F4.5 (nova) · **Origem:** IDEAS 2026-11-03 «Preparar a publicação», «UI em inglês», «README de uso», «Resumo da grade com Por linha vazio», «Avisar quando a exclusão do template falhar».
> **Versão alvo:** 0.6.0.

## Problema
O FrameMatch funciona, mas não passa na publicação da Community como está:
1. **Bloqueante:** plugin novo exige `"documentAccess": "dynamic-page"` no manifest, e nesse modo `figma.getNodeById` (síncrono, usado em `runGenerate`) **lança erro**.
2. Sem `networkAccess` no manifest, o anúncio mostra «Unknown network access».
3. A interface está toda em pt-BR; a Community é global (decisão do dono: inglês).
4. As diretrizes de revisão pedem: sem mensagem de erro técnica para o usuário, descrição fiel e link de documentação — hoje o erro de geração mostra `err.message` cru e o `README.md` tem só o título.
5. Dois defeitos pequenos que um revisor pode ver: o texto do Passo 4 promete **WEBP** (o Figma não aceita — armadilha #7) e o resumo da grade mostra «5 por linha» com a caixa vazia.

## Critérios de aceite (verificáveis)
- [ ] `manifest.json` tem `"documentAccess": "dynamic-page"` e `"networkAccess": { "allowedDomains": ["none"] }`; o plugin abre e gera normalmente no Figma Desktop com ele (num arquivo com **mais de uma página**).
- [ ] O `code.js` não usa mais `figma.getNodeById` (só `getNodeByIdAsync`) — conferível por `grep`.
- [ ] Todo texto **visível** do plugin está em inglês: os 5 passos, rodapé, botões, avisos, `alert`s, chips/tooltips e as mensagens que vêm do `code.js`. Comentários de código continuam em PT-BR (convenção do projeto). `<html lang="en">`.
- [ ] A auto-detecção do template continua reconhecendo os nomes em português **e** passa a reconhecer `product`, `products`, `product template`.
- [ ] O Passo 4 diz «JPG, PNG, GIF» (não WEBP).
- [ ] Com «Per row» vazio, o resumo mostra **1** (o mesmo piso do clamp), não 5.
- [ ] Erro inesperado na geração mostra uma frase para o usuário («Something went wrong while generating…»), com o detalhe técnico depois, não só o texto cru.
- [ ] Se «Delete template» estiver marcado e a exclusão falhar, a tela de conclusão avisa («The template could not be deleted…»).
- [ ] `README.md` em inglês com: o que é, os 5 passos, formato do CSV, nomes de camada, imagens (formatos, 4 MB, matching), grade/offset/ponto de partida, privacidade (sem rede; só lê os arquivos que o usuário escolhe) e contato.
- [ ] `bash scripts/check.sh` sai com 0.

## Decisões de design
1. **Só inglês, sem seletor de idioma.** Bilíngue (dicionário `T.pt`/`T.en` por `navigator.language`) foi considerado e **adiado**: dobra cada string a manter, e o dono — único usuário hoje — lê inglês. Volta se aparecerem usuários pedindo pt-BR.
2. **Tradução por tabela de substituição exata** na WO (texto antigo → novo, com contagem esperada), não por reescrita do arquivo: diff auditável, nada fora das strings muda.
3. **O `id` não muda nesta versão.** O Figma atribui o `id` definitivo na hora de publicar; a troca no `manifest.json` vira um commit pequeno depois do clique em «Publish» (passo do dono). Até lá, nada de `clientStorage` (F5).
4. **Nomes de template em PT continuam** na lista de auto-detecção (o dono usa), e entram os equivalentes em inglês.
5. **Mensagem de erro:** frase amigável + `Details: <mensagem técnica>`. Esconder o detalhe de vez atrapalharia o suporte.
6. **Aviso de exclusão falha** entra aqui porque é pequeno e porque um revisor que trava o template veria o comportamento mudo.

## Fora de escopo
- Arquivos WebP **escolhidos** na pasta continuam sendo lidos e falham em silêncio no `createImage` (só o texto do Passo 4 muda) → ideia nova: marcá-los como «unsupported» no Passo 4.
- `clientStorage` (F5), detecção de re-geração, bilíngue.
- Os assets do anúncio (ícone, capa, carrossel, textos) — moram fora do repo, em `../261104-figma-listing/`.

## Passos
1. WO de código: manifest, `getNodeByIdAsync`, tradução por tabela, resumo, erro amigável, aviso de exclusão, nomes de template.
2. README (o chat grava; a WO versiona).
3. Dono roda o roteiro no Figma Desktop.
4. Dono tira os prints do carrossel (com a UI já em inglês) e publica; WO pequena troca o `id` pelo do Figma.

## Armadilhas
- **ES5** (DEC-001) nos trechos novos; `await` já é usado em `runGenerate` e funciona.
- **Aspas simples dentro de string JS:** texto em inglês com apóstrofo («don't») quebra `'...'` — a tabela evita apóstrofos.
- **dynamic-page:** só a leitura síncrona por id está no caminho do FrameMatch; `currentPage.selection` e `clone`/`appendChild` num nó da página atual não estão na lista de APIs que mudam (docs do Figma, «Migrating Plugins to Dynamically Load Pages»).
