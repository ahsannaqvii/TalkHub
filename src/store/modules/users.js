import Vue from "vue";
import Vuex from "vuex";
import {
  getChannels,
  updateChannels,
  pushNewChannel,
} from "@/services/firebase/Channels";

Vue.use(Vuex);
const state = {
  currentUser: null,
  currentChannel: null,
  userChannels: [],
};

const getters = {
  currentUser: (state) => state.currentUser,
  userChannels: (state) => state.userChannels,
  currentChannel: (state) => state.currentChannel,
  publicChannels: (state) =>
    state.userChannels.filter((channel) => !channel.isDirect),
};

const actions = {
  setUser(context, user) {
    context.commit("SET_USER", user);
  },

  async fetchChannels(context, {user}) {
    const channelsList = await getChannels({
      specificChannel: false,
    });

    //Iterate over the array of objects to find the common emails in user's list and current Logged in user email.

    for (let key in channelsList) {
      //some is used to pick the current channel's email and current user Email.
      if (
        channelsList[key].users.some(
          (el) => el.email === user.email
        )
      )
        context.commit("SET_USER_CHANNELS", { ...channelsList[key], key });
    }
  },
  async setChannelInDatabase(context, newChannelData) {
    console.log(newChannelData);
    const { users, name } = newChannelData;

    //Returns the information of specific channel based on 'NAME'
    const specificChannelData = await getChannels({
      name,
      specificChannel: true,
    });

    //If channel is not present
    if (!specificChannelData) {
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
        return context.commit("ADD_NEW_CHANNEL", newChannelData);
      }
      //set the new Direct message channel in UserChannels list.

      //If the message is not private (one to one ):

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
};
const mutations = {
  SET_USER(state, user) {
    state.currentUser = user;
  },

  SET_USER_CHANNELS: function (state, channelData) {
    state.userChannels.push(channelData);
  },

  ADD_NEW_CHANNEL: function (state, channelData) {
    state.userChannels.push(channelData);
  },
  SET_CURRENT_CHANNEL: function (state, CurrChannel) {
    console.log(CurrChannel);
    state.currentChannel = CurrChannel;
  },
};
export { state, getters, actions, mutations };
