export default function Example({ sender, data }) {
  const sendTestMessage = () => {
    sender("Message sent and received!", false);
  };

  return (
    <>
      <p>{data && data.message}</p>
      <button onClick={sendTestMessage}>Click Me!</button>
    </>
  );
}
