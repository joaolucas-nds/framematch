#!/usr/bin/env bash
# check.sh — validação local do FrameMatch (roda no Git Bash do Windows ou em Linux).
#
# Por que existe: o sandbox do Figma rejeita sintaxe moderna sem mensagem clara (DEC-001,
# armadilha #1 do CONTEXT). Este script pega isso ANTES de abrir o Figma.
#
# O que confere (responde «a sintaxe está dentro do ES5?»):
#   1. guarda ES5 por padrão de texto em code.js e ui.html: =>, let/const/class, template
#      literal, ??, ?., spread/rest;
#   2. sintaxe parseável (node --check) de code.js e de cada <script> do ui.html — só se
#      houver node no PATH; sem node, avisa e segue.
#
# O que NÃO confere (responde «presta?» só no Figma Desktop):
#   - métodos ES6+ de biblioteca (Array.prototype.includes, Object.assign...) — não são sintaxe;
#   - paridade normName (ui.html) ≡ norm (code.js) — FIX-001;
#   - comportamento real do plugin: só o teste manual no Figma Desktop responde.
#
# Saída: 0 = limpo; 1 = achou violação (a lista sai na tela).
set -u
cd "$(dirname "$0")/.." || exit 2
fail=0

# 1) Guarda ES5. Padrões conservadores: falso positivo é barato (olhar a linha), falso
#    negativo custa uma sessão no Figma.
pattern='=>|(^|[^A-Za-z_$.])(let|const|class)[[:space:]]|`|\?\?|\?\.[A-Za-z_$]|\.\.\.[A-Za-z_$\[]'
hits=$(grep -nE "$pattern" code.js ui.html)
if [ -n "$hits" ]; then
  echo "ES5: violação encontrada:"
  echo "$hits"
  fail=1
else
  echo "ES5: 0 violações em code.js e ui.html"
fi

# 2) Parse com node, quando disponível.
if command -v node >/dev/null 2>&1; then
  node --check code.js || fail=1
  # Extrai cada bloco <script>...</script> do ui.html para um arquivo temporário.
  tmp=$(mktemp -d)
  # Casa só a tag sozinha na linha: o ui.html cita "<script>" dentro de um comentário.
  awk -v dir="$tmp" '
    /^[[:space:]]*<script[^>]*>[[:space:]]*$/ { n++; inside=1; next }
    inside && /^[[:space:]]*<\/script>[[:space:]]*$/ { inside=0; next }
    inside { print > (dir "/ui-" n ".js") }
  ' ui.html
  for f in "$tmp"/ui-*.js; do
    [ -e "$f" ] || continue
    node --check "$f" || { echo "parse falhou em bloco <script> do ui.html ($(basename "$f"))"; fail=1; }
  done
  rm -rf "$tmp"   # quem abre, fecha
  echo "node --check: $( [ $fail -eq 0 ] && echo ok || echo FALHOU )"
else
  echo "node ausente: parse não conferido (só a guarda ES5 rodou)"
fi

exit $fail
