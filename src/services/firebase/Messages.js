import { CHANNEL_KEY } from "../constants";
import * as firebase from "./firebase";

export function getMessageStream(...rest) {
  const unsubscribe = firebase.getStreamingData(...rest, CHANNEL_KEY.MESSAGES);
  return unsubscribe;
}
// export function tempFunction(...rest) {
//   firebase.tempFunction(...rest, CHANNEL_KEY.MESSAGES);
// }

//SETMESSAGES()
