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
          <h4 style="text-decoration: none">
            <v-icon v-if="!isTypeDM" style="color: white; font-size: 16px"
              >mdi-account-group-outline</v-icon
            >
            <span v-else class="sidebar-online-status">
              <i class="fas fa-circle"></i
            ></span>
            {{ channel.name }}

            <span
              class="sidebar-channel-notifications"
              v-if="
                getNotifications(channel) > 0 &&
                channel.key !== currentChannel.key
              "
              >{{ getNotifications(channel) }}</span
            >
          </h4>
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
      activeChannel: false,
      toggle: true,
    };
  },
  computed: {
    isTypeDM() {
      return this.type === CHANNEL_TYPE.DIRECT_MESSAGE;
    },
    ...mapGetters(["currentUser", "channelNotifCount", "currentChannel"]),
  },

  methods: {
    ...mapActions(["fetchChannels", "setCurrentChannel", "resetNotifications"]),
    getNotifications(channel) {
      let notif = 0;
      console.log(this.channelNotifCount);
      this.channelNotifCount.forEach((el) => {
        if (el.id === channel.key) {
          notif = el.notif;
          console.log(notif);
        }
      });
      return notif;
    },
    toggleHandler() {
      this.toggle = !this.toggle;
    },

    // @Params: ChannelInfo consist of an ID ,name and users field.
    changeChannel(channelInfo) {
      console.log(channelInfo);
      this.activeChannel = !this.activeChannel;
      this.resetNotifications(channelInfo);

      const {
        uid: currentUserId,
        displayName: currentUserDisplayName,
        email: currentUserEmail,
      } = this.currentUser;

      if (this.isTypeDM) {
        //ChannelInfo ID is the opposite user's id
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
        const reverseName = `${currentUserId}-${channelInfo.id}`;

        let newChannelObj = {
          key: channelIdentifier,
          name: channelInfo.name,
          isDirect: true,
          users,
          reverseKey: reverseName,
        };

        this.$store.dispatch("setChannelInDatabase", newChannelObj);
        // this.$store.dispatch("setCurrentChannel", newChannelObj);
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
  height: 200px;
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
  /* display: block; */
  cursor: pointer;
  /* text-align: justify; */
}
.sidebar-channels-header {
  color: white;
  display: flex;
  align-items: center;
  margin-top: 0.7rem;
}
.sidebar-online-status {
  /* text-align: end; */
  color: green;
  /* justify-content: end; */
  /* margin-left: 1rem; */
  font-size: 8px;
  /* margin-left: 20px; */
  margin-right: 10px;
}
.active {
  background-color: #376cdf;
  font-weight: bold;
  color: green;
  font-size: 1rem;
}
.sidebar-channels .active > h4 {
  color: green;
  font-size: 1rem;
}
.sidebar-channel-notifications {
  color: white;
  background-color: #ad1457;
  /* padding: 7px; */
  padding: 2px;
  /* opacity: 80%; */
  font-size: 12px;
  border-radius: 10px;
  width: 18%;
  height: 35%;
  text-align: center;
  float: right;
}
</style>
