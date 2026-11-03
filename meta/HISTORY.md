# HISTORY.md — Conhecimento Consolidado

> **Opcional.** Arquivo-baú para conhecimento denso que já foi aprendido e não muda mais — guias técnicos, análises de viabilidade, notas de migração.
> Não é lido ao abrir a conversa; o assistente consulta sob demanda quando o assunto aparece.

---

## 1. A jornada dos bugs de imagem (v5 → 0.3.0)

Esta seção resume por que cada versão falhou, para não repetir os mesmos caminhos.

| Versão | Abordagem de imagem | Problema |
|---|---|---|
| v2 | ArrayBuffer → `Array.from(Uint8Array)` | Funcionava, mas não tratava `*`, `/`, `_` no matching. Sem limite de tamanho — travava com 172 imagens. |
| v5–v6 | Igual ao v2 + `normForMatch` parcial | Matching melhorou, mas `csvSet` registrava duas chaves por produto → chips duplicados. |
| v7 | Canvas + compressão JPEG | PNG transparente virava fundo preto. `normForMatch` com `_→espaço` causava colisões. |
| v8 | Canvas + `normForMatch` corrigido | Encontrava tudo (chips verdes), mas imagens chegavam vazias. A chave do `IMGS` era `normForMatch` (arquivo) enquanto `code.js` buscava `normName` (CSV). |
| v9 | ArrayBuffer → Base64 | Encontrava, mas `code.js` não tem `atob` → `new Uint8Array(base64string)` gerava lixo. |
| v10 | ArrayBuffer → `Array.from` + `normForMatch` correto | Funcionava para a maioria, exceto produtos com espaços duplos no CSV. |
| 0.3.0 | Igual ao v10 + `normName` sem colapsar espaços | Resolve o bug dos espaços duplos. |

**Lição consolidada:** o pipeline correto e definitivo é:
```
FileReader.readAsArrayBuffer
  → Array.from(new Uint8Array(buffer))   [ui.html, ao gerar]
  → postMessage                          [ui → code.js]
  → new Uint8Array(arr)                  [code.js]
  → figma.createImage(uint8arr).hash     [code.js]
```
Nunca inserir canvas, compressão ou Base64 nesse pipeline.

---

## 2. Por que o Figma trava com imagens grandes

O `postMessage` serializa o payload como JSON. Um array `[0, 255, 128, ...]` com 4.000.000 elementos tem cada número representado como 1–3 caracteres ASCII em JSON, resultando em ~8–12MB de texto. O runtime WASM do Figma tenta envolver cada número individualmente em seu sistema de tipos (`deepWrap/newNumber`), abortando quando a pilha estoura.

O limite de ~4MB por imagem é empírico — acima disso, o risco de crash aumenta significativamente. A solução definitiva é a ferramenta de compressão externa (ROADMAP F6) ou o envio progressivo (ROADMAP F7).

---

## 3. Como instalar o plugin no Figma Desktop

1. Baixar os 3 arquivos: `code.js`, `ui.html`, `manifest.json` na mesma pasta.
2. Abrir o **Figma Desktop** (não funciona no browser).
3. Menu ☰ → **Plugins** → **Development** → **Import plugin from manifest...**
4. Selecionar `manifest.json`.
5. Para executar: Menu ☰ → **Plugins** → **Development** → **FrameMatch**.

**Para atualizar:** substituir os arquivos na pasta. O Figma lê do disco a cada execução — não é necessário reimportar o manifest, a menos que `manifest.json` tenha mudado. *(O rename de 2026-06-15 mudou o `id` no manifest — nesse caso específico, re-importe uma vez se o Figma não refletir o novo nome.)*

**Para abrir o console de debug:** `Ctrl + Alt + I` no Figma Desktop → aba Console. Erros do plugin aparecem com origem `ui.html` ou `code.js`. Erros do próprio Figma têm origem em arquivos `.br` — ignorar.

---

## 4. Formatos de imagem aceitos pelo Figma (pesquisa 2026-06-15)

Investigação motivada pela pergunta "dá para usar WebP em vez de PNG?". Conclusão consolidada:

- **`figma.createImage` aceita apenas PNG, JPEG e GIF**, com até **4096px (4K)** de largura/altura (doc oficial da Plugin API). WebP enviado a `createImage` retorna erro **"unsupported image type"**.
- Ao **colar** um WebP manualmente no canvas, o Figma o **converte para PNG** internamente — não há como recuperar o WebP original, e isso não está disponível via API de plugin.
- Plugins de comunidade que "importam WebP/AVIF/etc." (ex: *image.to.design*) fazem a **conversão para PNG antes** de inserir — ou no cliente (que cairia na corrupção de transparência do canvas, FIX-002) ou em servidor externo. Incompatível com a filosofia do FrameMatch de passar bytes crus sem reencoding.
- **Decisão prática:** continuar com PNG/JPG/GIF. Para o objetivo real (payload menor mantendo transparência), o caminho é **PNG otimizado offline** (redução de paleta tipo *pngquant* preserva o alpha e encolhe bastante) — não WebP. Registrado como armadilha #7 no CONTEXT e ideia descartada no IDEAS; alimenta a ferramenta de compressão (ROADMAP F6).

> Nota: suporte a WebP é um pedido de feature aberto na comunidade Figma há tempos; se um dia entrar na API, reavaliar — o ganho seria tamanho menor **com** transparência, ideal para o nosso caso.
