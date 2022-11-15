import * as Utils from "./NetworkUtils.js";
import { useState } from "react";
// import * as d3 from "d3";

const boxWidth = 200;
const boxHeight = 200;


export const Circles = () => {
  const [dataset] = useState(Utils.genItems(boxWidth, boxHeight));
//   const ref = useRef();

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${boxWidth} ${boxHeight}`}>
      {dataset.map((coord) => (
        <>
          <line
            x1={coord.x}
            y1={coord.y}
            x2={boxWidth / 2}
            y2={boxHeight / 2}
            stroke="black"
          />
          <circle cx={coord.x} cy={coord.y} fill={coord.col} r={coord.size} />
        </>
      ))}
      <circle cx={boxWidth / 2} cy={boxHeight / 2} r="10" fill="#03045e" />
    </svg>
  );
};
