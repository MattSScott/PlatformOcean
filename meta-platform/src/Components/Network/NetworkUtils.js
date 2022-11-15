const numItems = 8;
const colourPalette = ["#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4"];

export const genItems = (xoff, yoff) => {
  let rad = Math.min(xoff, yoff) / 2;
  let circInc = (2 * Math.PI) / numItems;
  let items = [];
  let index = 0;
  for (let i = 0; i < 2 * Math.PI; i += circInc) {
    let randRange = Math.random() * 0.5 + 0.25;
    let dist = randRange * rad;
    let randCol = Math.floor(colourPalette.length * Math.random());
    let randSize = Math.random() * 10 + 10;
    items.push({
      x: dist * Math.cos(i) + xoff / 2,
      y: dist * Math.sin(i) + yoff / 2,
      col: colourPalette[randCol],
      size: randSize,
      idx: index,
      toggled: false
    });
    index++;
  }
  return items;
};
