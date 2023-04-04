export default function Subtitler({ sender, data }) {
  return (
    <>
      <p>{data && data}</p>
      <form>
        <input
          onChange={(e) => {
            sender(e.target.value, false);
          }}
        />
      </form>
    </>
  );
}
