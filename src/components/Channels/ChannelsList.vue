<template>
  <article class="sidebar-2">
    <section class="sidebar-channels">
      <h5 class="sidebar-channels-header" @click="toggleHandler()">
        <span class="unread-icons">
          <v-icon v-if="toggle" style="color: white"
            >mdi-account-arrow-right</v-icon
          >
          <v-icon v-else style="color: white"> mdi-account-arrow-down</v-icon>
        </span>
        {{ name }}
      </h5>
      <ul class="main-list" v-if="!toggle">
        <li
          v-for="channel in generalizedData"
          :key="channel.key"
          @click="changeChannel(channel)"
        >
          <v-icon style="color: white; font-size: 16px"
            >mdi-account-group-outline</v-icon
          >
          {{ channel.name }}
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { CHANNEL_TYPE } from "@/services/constants";

export default {
  name: "ChannelsList",
  props: {
    name: String,
    type: String,
    generalizedData: Array, //It consists of Channel info and Direct Message Info
    showForm: String,
  },
  data() {
    return {
      toggle: true,
    };
  },
  computed: {
    isTypeDM() {
      return this.type === CHANNEL_TYPE.DIRECT_MESSAGE;
    },
    ...mapGetters(["currentUser"]),
  },

  methods: {
    ...mapActions(["fetchChannels", "setCurrentChannel"]),

    toggleHandler() {
      this.toggle = !this.toggle;
    },

    // @Params: ChannelInfo consist of an ID ,name and users field.
    changeChannel(channelInfo) {
      console.log(channelInfo);
      const {
        uid: currentUserId,
        displayName: currentUserDisplayName,
        email: currentUserEmail,
      } = this.currentUser.user;
      console.log(currentUserId);
      if (this.isTypeDM) {
        const channelIdentifier = `${channelInfo.id}-${currentUserId}`;
        // List of two users
        const users = [
          {
            userName: currentUserDisplayName,
            email: currentUserEmail,
          },
          {
            userName: channelInfo.name,
            email: channelInfo.email,
          },
        ];
        if (currentUserId === channelInfo.id) {
          //If the ids of both the users are same , remove the last inserted user from the arr of users.
          users.pop();
        }
        let newChannelObj = {
          key: channelIdentifier,
          name: channelInfo.name,
          isDirect: true,
          users,
        };
        this.$store.dispatch("setChannelInDatabase", newChannelObj);
        this.$store.dispatch("setCurrentChannel", newChannelObj);
      } else {
        this.$store.dispatch("setCurrentChannel", channelInfo);
      }
      this.$emit("changeMode", "channel-chat");
    },
  },
};
</script>

<style>
/* CHANNELS CSS  */
.main-list {
  width: 100%;
  height: 150px;
  overflow-y: hidden;
  overflow-x: hidden;
}

.main-list :hover {
  cursor: pointer;
}
.sidebar-channels {
  margin-top: 10px;
  cursor: pointer;

  border-top: 0.1rem solid grey;
}
.sidebar-channels li {
  padding: 6px;
  color: white;
  font-size: 12px;
  margin-left: 23px;
  font-style: italic;
  display: block;
  cursor: pointer;
  text-align: justify;
}
.sidebar-channels-header {
  color: white;
  display: flex;
  align-items: center;
  margin-top: 0.7rem;
}
/* .is_active {
  background-color: #d69c33;

  height: 40px;
  width: 40px;
  border-radius: 8px;
  
} */
</style>
<!-- // TODO:ACTIVE WALA KAAM REHTA HAI
      // setActiveChannel(channel) {
      //   return (
      //     // TODO://LATER CHANGE THIS TO CHANNEL.ID
      //     channel.channelName === this.$store.getters.currentChannel.channelName
      //   );
      // }, -->
