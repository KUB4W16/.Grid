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
        const circle = figma.createEllipse();
        circle.x = x * (msg.gap + msg.size);
        circle.y += y * (msg.gap + msg.size);
        circle.fills = [{type: 'SOLID', color: hexToRGB(msg.color)}];
        circle.resize(msg.size, msg.size);
        figma.currentPage.appendChild(circle);
        nodes.push(circle);
      }
    }
    figma.currentPage.selection = nodes;
    figma.group(figma.currentPage.selection, figma.currentPage)
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  figma.closePlugin();
};
