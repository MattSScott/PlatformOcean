import * as Utils from "./NetworkUtils.js";
import { useSpring, useSprings, animated } from "react-spring";
import { useHover } from "@use-gesture/react";
import { useState } from "react";
import "./Network.css";

const boxWidth = 200;
const boxHeight = 200;

const nodeUpdater =
  (active = false, index, dataset) =>
  (data) => {
    return active && data === index
      ? {
          ...dataset[data],
          r: dataset[data].r * 2,
          boxR: dataset[data].r * 4 * 0.85,
          boxX: dataset[data].cx - 2 * dataset[data].r * 0.85,
          boxY: dataset[data].cy - 2 * dataset[data].r * 0.85,
        }
      : {
          ...dataset[data],
          boxR: dataset[data].r * 2,
          boxX: dataset[data].cx - dataset[data].r,
          boxY: dataset[data].cy - dataset[data].r,
        };
  };

export default function Network({ logo }) {
  const [dataset] = useState(Utils.genItems(boxWidth, boxHeight));
  const texts = Utils.itemDescriptors;
  const altTexts = Utils.itemInfos;

  const [springs, setSprings] = useSprings(dataset.length, (item) => ({
    config: { duration: 500 },
    ...dataset[item],
    boxR: dataset[item].r * 2,
    boxX: dataset[item].cx - dataset[item].r,
    boxY: dataset[item].cy - dataset[item].r,
  }));

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 1000 },
    reset: true,
  });

  const [textSprings, setTextSprings] = useState(
    new Array(texts.length).fill(false)
  );

  const bind = useHover(({ args: [index], active }) => {
    setSprings.start(nodeUpdater(active, index, dataset));
    setTextSprings(textSprings.map((v, i) => (i === index ? !v : v)));
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
          <animated.circle key={`circle_${i}`} style={styles} />
          <animated.foreignObject
            x={styles.boxX}
            y={styles.boxY}
            width={styles.boxR}
            height={styles.boxR}
          >
            {textSprings[i] ? (
              <animated.div {...bind(i)} className="circText" color="black">
                <animated.p style={fadeIn}>{altTexts[i]}</animated.p>
              </animated.div>
            ) : (
              <animated.div {...bind(i)} className="circText" color="black">
                <animated.p>{texts[i]}</animated.p>
              </animated.div>
            )}
          </animated.foreignObject>
        </>
      ))}
      <circle
        key={`center_circle`}
        cx={boxWidth / 2}
        cy={boxHeight / 2}
        r="20"
        fill="#ade8f4"
      />
      <foreignObject
        x={boxWidth / 2 - 20}
        y={boxHeight / 2 - 20}
        width={40}
        height={40}
      >
        <img className="centerImg" src={logo} alt="cent_logo" />
      </foreignObject>
    </svg>
  );
}
