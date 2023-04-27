import Submit from "./Sumbit";

export default function Message({ data, sender }) {
  return (
    <div>
      <p>{data && `${data.message.sender} said: "${data.message.content}"`}</p>
      <Submit sender={sender} />
    </div>
  );
}
