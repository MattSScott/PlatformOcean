import Submit from "./Sumbit";

export default function Message({ data, sender }) {
  return (
    <div>
      <p>{data && `${data.sender} said: "${data.content}"`}</p>
      <Submit sender={sender} />
    </div>
  );
}
