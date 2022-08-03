import { CHANNEL_KEY } from "../constants";
import * as firebase from "./firebase";

//@params : channelInfo consist of name of channel and specificChannel : true/false
export async function getChannels(channelInfo = {}) {
  const allChannels = await firebase.getDataFromFirebase(CHANNEL_KEY.BROADCAST);

  //If specific channels does not exist , return all channels.
  if (!channelInfo.specificChannel) return allChannels;

  let specificChannel = "";
  for (let key in allChannels)
    if (allChannels[key].name === channelInfo.name) {
      specificChannel = { channel: allChannels[key], key };
      break;
    }

  return specificChannel;
}

// @Params : databaseParentKey refers to channels - > childKey
// @Param2: newChannelData refers to the new set of channel Data to be set in DB
export async function pushNewChannel(newChannelData) {
  console.log(newChannelData);

  var parentKey = "";
  if (newChannelData.isDirect) {
    parentKey = CHANNEL_KEY.BROADCAST + newChannelData.key;
    firebase.updateExistingChildData(parentKey, newChannelData);
  } else {
    parentKey = CHANNEL_KEY.BROADCAST;

    await firebase.pushDataFirebase(parentKey, newChannelData);
  }
}

// @Params : databaseParentKey refers to channels - > childKey
// @Param2: channel refers to the incoming data to be updated in the firebase along the respective keys
export function updateChannels(databaseParentKey, { channel }) {
  firebase.updateExistingChildData(
    CHANNEL_KEY.BROADCAST + databaseParentKey,
    channel
  );
}
