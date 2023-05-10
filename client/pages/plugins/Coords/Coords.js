import CoordsStyle from "./Coords.module.css";

export default function Coords({ data, sender, allData }) {
  const getPos = (event) => {
    var rect = event.target.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  let prevCirc = data;
  if (allData.length >= 2) {
    prevCirc = allData[allData.length - 2];
  }

  let prevCircButOne = data;

  if (allData.length >= 3) {
    prevCircButOne = allData[allData.length - 3];
  }

  return (
    <div
      className={CoordsStyle.coordDiv}
      onClick={(e) => {
        var obj = getPos(e);
        sender(obj);
      }}
    >
      <p>Click Within Box to "Poke" Users</p>
      <svg>
        {data && (
          <circle
            cy={data.message.y}
            cx={data.message.x}
            r="30"
            fill="red"
          ></circle>
        )}
        {prevCirc && (
          <circle
            cy={prevCirc.message.y}
            cx={prevCirc.message.x}
            r="30"
            fill="blue"
          ></circle>
        )}
        {prevCircButOne && (
          <circle
            cy={prevCircButOne.message.y}
            cx={prevCircButOne.message.x}
            r="30"
            fill="green"
          ></circle>
        )}
      </svg>
    </div>
  );
}
