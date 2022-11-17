import * as Utils from "./NetworkUtils.js";
import { useSprings, animated } from "react-spring";
import { useGesture, useHover, useDrag } from "@use-gesture/react";
import { useState } from "react";
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
  const [dataset] = useState(Utils.genItems(boxWidth, boxHeight));
  const texts = Utils.itemDescriptors;
  const altTexts = Utils.itemInfos;

  const [springs, setSprings] = useSprings(dataset.length, (item) => ({
    config: { duration: 500 },
    ...dataset[item],
  }));

  const [textSprings, setTextSprings] = useState(
    new Array(texts.length).fill(false)
  );

  const bind = useHover(({ args: [index], active }) => {
    setSprings.start(nodeUpdater(active, index, dataset));
    setTextSprings(textSprings.map((v, i) => (i === index ? !v : v)));
  });

  //   const fadeText = useTransition(textSprings, {
  //     from: { position: "absolute", opacity: 0 },
  //     enter: { opacity: 1 },
  //     leave: { opacity: 0 },
  //     reverse: toggle,
  //     delay: 200,
  //     config: config.molasses,
  //     onRest: () => set(!toggle),
  //   });

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
          {/* <animated.text
            key={`text_${i}`}
            x={styles.cx}
            y={styles.cy}
            // opacity={textSprings[i].opacity}
            fontSize="5px"
            textAnchor="middle"
            fill="white"
            dy=".3em"
          >
            {textSprings[i] ? altTexts[i] : texts[i]}
          </animated.text> 
          */}
          <animated.foreignObject
            {...bind(i)}
            x={styles.cx.get() - styles.r.get()}
            y={styles.cy.get() - styles.r.get()}
            width={styles.r.get() * 2}
            height={styles.r.get() * 2}
          >
            <div className="circText" color="black">
              {textSprings[i] ? altTexts[i] : texts[i]}
            </div>
          </animated.foreignObject>
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
