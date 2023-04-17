import "./Coords.css";

export default function Coords({ data, sender, allData }) {
  const getPos = (event) => {
    var rect = event.target.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const prevCirc = allData[allData.length - 2];
  const prevCircButOne = allData[allData.length - 3];

  return (
    <div
      className="coordDiv"
      onClick={(e) => {
        var obj = getPos(e);
        sender(obj);
      }}
    >
      <p>Click Within Box to "Poke" Users</p>
      {data && (
        <svg>
          <circle
            cy={data.message.y}
            cx={data.message.x}
            r="30"
            fill="red"
          ></circle>

          <circle
            cy={prevCirc.message.y}
            cx={prevCirc.message.x}
            r="30"
            fill="blue"
          ></circle>

          <circle
            cy={prevCircButOne.message.y}
            cx={prevCircButOne.message.x}
            r="30"
            fill="green"
          ></circle>
        </svg>
      )}
    </div>
  );
}
