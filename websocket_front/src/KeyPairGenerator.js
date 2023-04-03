import { v4 as uuidv4 } from "uuid";

// const componentUUID = uuidv4(); // simulate how unique key is generated. In reality, extract router from

export function retrieveRoutingKey() {
  return uuidv4();
}
