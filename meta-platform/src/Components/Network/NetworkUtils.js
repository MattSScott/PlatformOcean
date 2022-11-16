const numItems = 8;
const colourPalette = ["#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4"];
const xWidth = 200;
const yHeight = 100;
const randLLim = 0.6;
const randULim = 0.9;
export const itemDescriptors = [
  "Transparency",
  "Codification of deep social knowledge",
  "Common-pool development",
  "Generativity",
  "Decentralisation",
  "Visualisations of collective action",
  "'Parkrunification'",
  "Ecosystem",
];

const getRad = (a, b, theta) => {
  let xPol = b * Math.cos(theta);
  let yPol = a * Math.sin(theta);
  let radDenom = Math.sqrt(xPol * xPol + yPol * yPol);
  let radNum = a * b;
  return radNum / radDenom;
};

const getRandRange = () => {
    let sclFac = randULim - randLLim;
    return Math.random() * sclFac + randLLim;
}

export const genItems = (xoff, yoff) => {
  //   let rad = Math.min(xoff, yoff) / 2;
  let circInc = (2 * Math.PI) / numItems;
  let items = [];
  let index = 0;
  for (let i = 0; i < 2 * Math.PI; i += circInc) {
    
    let rad = getRad(xWidth, yHeight, i);
    let randRange = getRandRange();
    let dist = randRange * rad;
    let randCol = Math.floor(colourPalette.length * Math.random());
    let randSize = Math.random() * 10 + 15;
    items.push({
      cx: dist * Math.cos(i) + xoff / 2,
      cy: dist * Math.sin(i) + yoff / 2,
      fill: colourPalette[randCol],
      r: randSize,
      idx: index,
    //   toggled: false,
    });
    index++;
  }
  return items;
};
