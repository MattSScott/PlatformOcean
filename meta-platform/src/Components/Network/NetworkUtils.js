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

export const itemInfos = [
  "Each group or conversation in the client is with a different server, but open standard transfer protocols and programming interfaces provide seamless client-side integration, protect data, preserves privacy and prevent data leakage",
  "The plug-in architecture also supports codification of the deep social knowledge captured by each of the five sets of design principles",
  "The creation of plug-ins is a reflective process, as communities of developers use an instance of the platform to develop plug-ins for other instances",
  "A tool to support the creation of new tools that were not envisaged by the designer of the original tool",
  "The system architecture allows a range of options for self-hosting, with multi-purpose multi-function self-configuration implemented through plug-ins, supporting decentralisation",
  "For collective action, feedback to individuals and communities and how their small actions X contributed to a greater action Y which had significant impact Z",
  "The generic platform can be used to create new downloadable instances of the platform, which others can use for faster customisation for related applications (we refer to this process as ‘parkrunification’ after the explosion of popularity of the parkrun phenomenon following the same process of observation and imitation)",
  "The creation of a platform ecosystem supports sustainability through diversity and inhibits monopoly",
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
};

export const genItems = (xoff, yoff) => {
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
      r: Math.sqrt(itemInfos[index].length) * 1.5,
      idx: index,
    });
    index++;
  }
  return items;
};
