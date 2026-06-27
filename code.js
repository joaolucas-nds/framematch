// FrameMatch - code.js

figma.showUI(__html__, { width: 520, height: 700 });

function findLayerByName(node, name) {
  var target = norm(name);
  if (norm(node.name) === target) return node;
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      var found = findLayerByName(node.children[i], name);
      if (found) return found;
    }
  }
  return null;
}

// norm: trim + lowercase — NÃO colapsa espaços múltiplos.
// ui.html usa normName() idêntico a este para garantir que as chaves batam.
function norm(s) {
  return String(s).trim().toLowerCase();
}

function getAllLayers(node, arr) {
  if (!arr) arr = [];
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      arr.push({ name: child.name, type: child.type });
      getAllLayers(child, arr);
    }
  }
  return arr;
}

figma.ui.onmessage = function(msg) {
  if (msg.type === 'get-selection') {
    var sel = figma.currentPage.selection;
    if (!sel || sel.length === 0) {
      figma.ui.postMessage({ type: 'sel', ok: false, err: 'Nada selecionado. Selecione um frame no Figma primeiro.' });
      return;
    }
    var node = sel[0];
    figma.ui.postMessage({
      type: 'sel', ok: true,
      data: { id: node.id, name: node.name, w: node.width, h: node.height, x: node.x, y: node.y, layers: getAllLayers(node) }
    });
    return;
  }
  if (msg.type === 'generate') { runGenerate(msg); return; }
  if (msg.type === 'close') { figma.closePlugin(); return; }
};

async function loadFontSafe(node) {
  try {
    if (node.type !== 'TEXT') return;
    var fn = node.fontName;
    if (fn && fn !== figma.mixed) {
      await figma.loadFontAsync(fn);
    } else {
      await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    }
  } catch(e) {
    try { await figma.loadFontAsync({ family: 'Inter', style: 'Regular' }); } catch(e2) {}
  }
}

async function loadAllFontsInNode(node) {
  if (node.type === 'TEXT') await loadFontSafe(node);
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) await loadAllFontsInNode(node.children[i]);
  }
}

async function runGenerate(msg) {
  try {
    var tpl = figma.getNodeById(msg.templateId);
    if (!tpl) { figma.ui.postMessage({ type: 'err', msg: 'Template nao encontrado. Volte ao Passo 2.' }); return; }

    await loadAllFontsInNode(tpl);

    var parent = tpl.parent;
    var W = tpl.width, H = tpl.height;
    var cols = msg.grid.cols || 5;
    var cGap = msg.grid.cGap || 0;
    var rGap = msg.grid.rGap || 0;
    var ox = msg.grid.ox || 0;
    var oy = msg.grid.oy || 0;
    var clones = [];

    // msg.images é um array paralelo a msg.imageMappings:
    //   msg.images[k] = { normKey: [bytes] }  para o slot k
    var images = msg.images || [];

    for (var i = 0; i < msg.rows.length; i++) {
      figma.ui.postMessage({ type: 'prog', i: i + 1, n: msg.rows.length });

      var row = msg.rows[i];
      var clone = tpl.clone();
      parent.appendChild(clone);
      clone.x = ox + (i % cols) * (W + cGap);
      clone.y = oy + Math.floor(i / cols) * (H + rGap);

      // ── Texto ────────────────────────────────────────────────────
      if (msg.textMappings) {
        for (var j = 0; j < msg.textMappings.length; j++) {
          var m = msg.textMappings[j];
          if (!m.col || !m.layer) continue;
          var layer = findLayerByName(clone, m.layer);
          if (layer && layer.type === 'TEXT') {
            await loadFontSafe(layer);
            try { layer.characters = String(row[m.col] !== undefined ? row[m.col] : ''); } catch(e) {}
          }
        }
      }

      // ── Imagens — múltiplos slots ────────────────────────────────
      // msg.imageMappings[k] = { col, layer, scaleMode }
      // msg.images[k]        = { "chave norm": [bytes] }
      if (msg.imageMappings && msg.imageMappings.length) {
        for (var k = 0; k < msg.imageMappings.length; k++) {
          var imap = msg.imageMappings[k];
          if (!imap || !imap.col || !imap.layer) continue;

          // norm() = trim+lowercase, idêntico ao normName() do ui.html
          var rawName  = norm(String(row[imap.col] || ''));
          var slotDict = images[k] || {};
          var imgArr   = slotDict[rawName] || null;

          if (imgArr) {
            var imgLayer = findLayerByName(clone, imap.layer);
            if (imgLayer) {
              try {
                var hash = figma.createImage(new Uint8Array(imgArr)).hash;
                imgLayer.fills = [{ type: 'IMAGE', scaleMode: imap.scaleMode || 'FIT', imageHash: hash }];
              } catch(e) {
                // ignora erro de imagem individual, continua
              }
            }
          }
          // se imgArr for null: não faz nada, mantém fill original do template
        }
      }

      clones.push(clone);
    }

    // Ocultar e/ou excluir template
    // ─── Para alterar o padrão de cada opção, edite os checkboxes no ui.html ───
    if (msg.hideTemplate)   { try { tpl.visible = false; } catch(e) {} }
    if (msg.deleteTemplate) { try { tpl.remove();         } catch(e) {} }

    figma.currentPage.selection = clones;
    figma.viewport.scrollAndZoomIntoView(clones);
    figma.ui.postMessage({ type: 'done', count: msg.rows.length });

  } catch(err) {
    figma.ui.postMessage({ type: 'err', msg: String(err.message || err) });
  }
}
