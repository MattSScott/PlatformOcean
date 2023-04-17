import "./Coords.css";

export default function Coords({ data, sender, allData }) {
  const getPos = (event) => {
    var rect = event.target.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

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
          <circle cy={data.y} cx={data.x} r="30" fill="red"></circle>
        </svg>
      )}
    </div>
  );
}
