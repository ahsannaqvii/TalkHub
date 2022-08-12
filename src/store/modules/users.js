import Vue from "vue";
import Vuex from "vuex";

import {
  getChannels,
  updateChannels,
  pushNewChannel,
  // helperFunction,
} from "@/services/firebase/Channels";
import { CHANNEL_KEY } from "@/services/constants";
import { handleNotifications } from "@/services/NotificationService";

Vue.use(Vuex);
const state = {
  currentUser: null,
  currentChannel: null,
  userChannels: [],
  notifCount: [],
};

const getters = {
  currentUser: (state) => state.currentUser,
  userChannels: (state) => state.userChannels,
  channelNotifCount: (state) => state.notifCount,
  currentChannel: (state) => state.currentChannel,
  publicChannels: (state) =>
    state.userChannels.filter((channel) => !channel.isDirect),
};

const actions = {
  setUser(context, user) {
    context.commit("SET_USER", user);
  },
  clearChannels(context) {
    context.commit("CLEAR_CHANNELS");
  },
  resetNotifications(context, channel) {
    context.commit("RESET_NOTIFICATIONS", channel);
  },
  async fetchChannels(context) {
    state.userChannels = [];
    const channelsList = await getChannels({
      specificChannel: false,
      type: CHANNEL_KEY.BROADCAST,
    });

    //Iterate over the array of objects to find the common emails in user's list and current Logged in user email.

    // var finalResult = [];
    for (let key in channelsList) {
      //some is used to pick the current channel's email and current user Email.
      if (
        channelsList[key].users.some(
          (el) => el.email === state.currentUser.email
        )
      ) {
        // finalResult.push({ ...channelsList[key], key });
        context.commit("SET_USER_CHANNELS", { ...channelsList[key], key });
      }
    }
    // console.log(finalResult);
    // const temp = { ...finalResult };
    // console.log("FINAL COMPARISON :", temp);
  },

  //Options consist of reverseKey
  async setChannelInDatabase(context, newChannelData) {
    const { users, name, reverseKey } = newChannelData;
    //Returns the information of specific channel based on 'NAME'
    const specificChannelData = await getChannels({
      name,
      specificChannel: true,
      type: CHANNEL_KEY.BROADCAST,
    });
    // helperFunction(newChannelData);
    //IF MOMIN LOG IN : AHSAN-MOMIN       (MOMIN-AHHSAN : MSGS  " HELLO , COMMA , ABC ")
    //If channel is not present
    //AHSAN-MOMIN. REVERSE()
    if (!specificChannelData) {
      //MOMIN-AHSAN

      //If reverse name exists
      if (reverseKey) {
        delete newChannelData["reverseKey"];
        // eslint-disable-next-line
        return this.dispatch("setChannelInDatabase", {
          ...newChannelData,
          key: reverseKey,
        });
      }

      //If the user object exists , we will convert that to arr (For the first time data is inserted.)
      if (newChannelData.users && !Array.isArray(newChannelData.users))
        newChannelData.users = [newChannelData.users];

      //Firebase utility function to set channels in DB.

      const key = await pushNewChannel(newChannelData); //using the push method of firebase.
      //Set new channel to userChannels list in vuexStore
      context.commit("ADD_NEW_CHANNEL", { ...newChannelData, key });
    }

    //Append the user's list if channel exists.
    else {
      // If messagetype is 'Direct Message'

      if (newChannelData.isDirect) {
        // console.log(newChannelData);
        return context.commit("ADD_NEW_CHANNEL", newChannelData);
        // return context.commit("SET_CURRENT_CHANNEL", currChannel);
      }
      //set the new Direct message channel in UserChannels list.

      //If the message is not private (one to one):

      specificChannelData.channel.users.push(users);
      const { channel, key } = specificChannelData;

      updateChannels(specificChannelData.key, specificChannelData);
      channel["key"] = key;
      context.commit("ADD_NEW_CHANNEL", channel);
    }
  },
  //Set the current active channel of user and pushes the channel into array of channels.
  setCurrentChannel(context, currChannel) {
    context.commit("SET_CURRENT_CHANNEL", currChannel);
  },
  setchannelNotifications(context, notifDetails) {
    const notifs = handleNotifications(
      notifDetails,
      state.notifCount,
      state.currentChannel.key
    );
    if (notifs !== undefined) {
      context.commit("SET_NOTIFICATIONS", notifs);
    } else {
      context.commit("UPDATE_NOTIFICATIONS", state.notifCount);
    }
  },
};
const mutations = {
  SET_USER(state, user) {
    state.currentUser = user;
  },

  SET_USER_CHANNELS: function (state, channelData) {
    state.userChannels.push(channelData);
  },
  CLEAR_CHANNELS: function (state) {
    state.userChannels = [];
  },
  SET_NOTIFICATIONS(state, notifs) {
    state.notifCount.push(notifs);
  },
  UPDATE_NOTIFICATIONS(state, not) {
    state.notifCount = not;
  },
  RESET_NOTIFICATIONS: function (state, { key }) {
    let index = state.notifCount.findIndex((element) => element.id === key);
    if (index !== -1) {
      state.notifCount[index].total = state.notifCount[index].lastKnownTotal;
      state.notifCount[index].notif = 0;
    }
  },
  ADD_NEW_CHANNEL: function (state, channelData) {
    state.userChannels.push(channelData);
  },
  SET_CURRENT_CHANNEL: function (state, CurrChannel) {
    state.currentChannel = CurrChannel;
  },
};
export { state, getters, actions, mutations };
