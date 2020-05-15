function hexToRGB(color) {
  var rgbColor = {r: 1, g: 1, b: 1};
  var rgbList = [];
  var list = color.split("");
  if (color.length == 4) {
    list.shift();
    for (let i = 0; i < list.length; i++) {
      rgbList[i] = parseInt(`${list[i]}${list[i]}`, 16) / 255;
    }
    rgbColor = {r: rgbList[0], g: rgbList[1], b: rgbList[2]}
  }
  else if (color.length == 7) {
    color = color.substring(1);
    rgbList = color.match(/.{1,2}/g);
    for (var i = 0; i < rgbList.length; i++) {
      rgbList[i] = parseInt(rgbList[i], 16) / 255;
    }
    rgbColor = {r: rgbList[0], g: rgbList[1], b: rgbList[2]}
  }
  return rgbColor;
}

figma.showUI(__html__, {width: 375, height: 500});

figma.ui.onmessage = msg => {
  if (msg.type === 'create-dots') {
    const nodes: SceneNode[] = [];
    for (let y = 0; y < msg.countY; y++) {
      for (let x = 0; x < msg.countX; x++) {
        let shape;
        if (msg.shape === "rectangle") {
          shape = figma.createRectangle();
        }
        else if (msg.shape === "ellipse") {
          shape = figma.createEllipse();
        }
        else if (msg.shape === "triangle") {
          shape = figma.createPolygon();
        }
        else if (msg.shape === "star") {
          shape = figma.createStar();
        }
        shape.x = x * (msg.gap + msg.size);
        shape.y += y * (msg.gap + msg.size);
        shape.fills = [{type: 'SOLID', color: hexToRGB(msg.color)}];
        shape.resize(msg.size, msg.size);
        figma.currentPage.appendChild(shape);
        nodes.push(shape);
      }
    }
    figma.currentPage.selection = nodes;
    figma.group(figma.currentPage.selection, figma.currentPage)
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  figma.closePlugin();
};
