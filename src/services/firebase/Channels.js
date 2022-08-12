import { CHANNEL_KEY } from "../constants";
import * as firebase from "./firebase";

//@params : channelInfo consist of name of channel and specificChannel : true/false
export async function getChannels(channelInfo = {}) {
  const allChannels = await firebase.getDataFromFirebase(channelInfo.type);
  console.log(allChannels);

  //If specific channels does not exist , return all channels.
  if (!channelInfo.specificChannel) return allChannels;

  let specificChannel = "";
  for (let key in allChannels)
    if (allChannels[key].name === channelInfo.name) {
      //channelInfo.name is the channelID

      specificChannel = { channel: allChannels[key], key };
      break;
    }

  return specificChannel;
}

// @Params : databaseParentKey refers to channels - > childKey
// @Param2: newChannelData refers to the new set of channel Data to be set in DB
export async function pushNewChannel(newChannelData) {
  var parentKey = "";
  //If the channel is 'Direct Messaging' then  the channel shall be updated(without the need of a generated UID)
  if (newChannelData.isDirect) {
    //This sets the top key value of each data
    //Channels : {
    // parentKey : { content , timestamp etc}
    //}
    parentKey = CHANNEL_KEY.BROADCAST + newChannelData.key;
    firebase.updateExistingChildData(parentKey, newChannelData);
  } else {
    parentKey = CHANNEL_KEY.BROADCAST;

    const key = await firebase.pushDataFirebase(parentKey, newChannelData);
    return key;
  }
}

// @Params : databaseParentKey refers to channels - > childKey
// @Param2: channel refers to the incoming data to be updated in the firebase along the respective keys
export function updateChannels(databaseParentKey, { channel }) {
  //Updates the existing child information(users array.)
  firebase.updateExistingChildData(
    CHANNEL_KEY.BROADCAST + databaseParentKey,
    channel
  );
}

// export function helperFunction(channelInformation) {
//   console.log("helper func called");
//   firebase.helperFunction("Channels/", channelInformation);
// }
