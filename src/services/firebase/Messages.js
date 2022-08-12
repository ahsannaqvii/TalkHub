import { CHANNEL_KEY } from "../constants";
import * as firebase from "./firebase";

export function getMessageStream(...rest) {
  const unsubscribe = firebase.getStreamingData(...rest, CHANNEL_KEY.MESSAGES);
  return unsubscribe;
}

//SETMESSAGES()
