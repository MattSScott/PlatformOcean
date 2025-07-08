import { useRef, useState, useCallback } from "react";

export function useMessageQueues() {
  const messageQueueRef = useRef([]);
  const [queueLength, setQueueLength] = useState(0);

  const enqueueMessage = useCallback((msg) => {
    messageQueueRef.current.push(msg);
    setQueueLength(() => messageQueueRef.current.length);
  }, []);

  const dequeueMessage = useCallback(() => {
    const msg = messageQueueRef.current.shift();
    setQueueLength(() => messageQueueRef.current.length);
    return msg;
  }, []);

  return {
    enqueueMessage,
    dequeueMessage,
    queueLength,
  };
}
