import * as Utils from "./NetworkUtils.js";
import { useSprings, animated } from "react-spring";
import { useGesture, useHover, useDrag } from "@use-gesture/react";
import "./Network.css";

const boxWidth = 200;
const boxHeight = 200;

const nodeUpdater =
  (active = false, index, dataset) =>
  (data) => {
    return active && data === index
      ? { ...dataset[data], r: dataset[data].r * 2 }
      : dataset[data];
  };

export default function Network() {
  const dataset = Utils.genItems(boxWidth, boxHeight);

  const [springs, setSprings] = useSprings(dataset.length, (item) => ({
    config: { duration: 500 },
    ...dataset[item],
  }));

  const bind = useHover(({ args: [index], active }) => {
    setSprings.start(nodeUpdater(active, index, dataset));
  });

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${boxWidth} ${boxHeight}`}>
      {springs.map((styles, i) => (
        <>
          <animated.line
            key={`line_${i}`}
            x1={styles.cx}
            y1={styles.cy}
            x2={boxWidth / 2}
            y2={boxHeight / 2}
            stroke="black"
          />
          <animated.circle {...bind(i)} key={`circle_${i}`} style={styles} />
          <animated.text
            key={`text_${i}`}
            x={styles.cx}
            y={styles.cy}
            fontSize="5px"
            textAnchor="middle"
            fill="white"
            dy=".3em"
          >
            {Utils.itemDescriptors[i]}
          </animated.text>
        </>
      ))}
      <circle
        key={`center_circle`}
        cx={boxWidth / 2}
        cy={boxHeight / 2}
        r="10"
        fill="#03045e"
      />
    </svg>
  );
}
