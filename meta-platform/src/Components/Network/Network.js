import * as Utils from "./NetworkUtils.js";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./Network.css";

const boxWidth = 200;
const boxHeight = 200;

const AnimatedCircle = ({ toggler, data }) => {
  const style = useSpring({
    config: {
      duration: 500,
    },
    r: data.toggled ? data.size * 1.5 : data.size,
    // zIndex: data.toggled ? 99 : 1
    //   opacity: isShowing ? 1 : 0,
  });
  return (
    <animated.circle
      {...style}
      position="relative"
      cx={data.x}
      cy={data.y}
      fill={data.col}
      onMouseOver={toggler}
      onMouseOut={toggler}
    />
  );
};

export const Circles = () => {
  const [dataset, updateDataset] = useState(
    Utils.genItems(boxWidth, boxHeight)
  );

  const toggleCirc = (idx) => {
    updateDataset((prevData) => {
      return prevData.map((v) => {
        return v.idx === idx ? { ...v, toggled: !v.toggled } : v;
      });
    });
  };

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
          <AnimatedCircle toggler={() => toggleCirc(coord.idx)} data={coord} />
          <text
            x={coord.x}
            y={coord.y}
            fontSize="5px"
            textAnchor="middle"
            fill="white"
            dy=".3em"
          >
            {Utils.itemDescriptors[coord.idx]}
          </text>
        </>
      ))}
      <circle cx={boxWidth / 2} cy={boxHeight / 2} r="10" fill="#03045e" />
    </svg>
  );
};
