<template>
  <main class="main">
    <section class="sidebar">
      <div class="sidebar-1">
        <div class="box-1"></div>
        <div class="box-2"></div>
        <button class="box-3" @click="setModalActive()">+</button>
        <!-- <ChannelModal v-show="showModal" /> -->
      </div>
      <!-- SIDEBAR 2 WITH CHANNELS AND PEOPLE/USERS INFO  -->
      <article class="sidebar-2">
        <ConnectedUser />
        <section class="unread">
          <h4 class="unread-header">
            <span class="unread-icons">
              <v-icon style="color: white">mdi-message-fast-outline</v-icon>
            </span>
            All unread
          </h4>
          <ul>
            <li>
              <v-icon style="color: white">mdi-dots-horizontal</v-icon>
              Threads
            </li>
            <li>
              <v-icon style="color: white; margin-right: 2px"
                >mdi-webpack</v-icon
              >Mentions & reactions
            </li>
            <li>
              <v-icon style="color: white; margin-right: 2px">mdi-dev-to</v-icon
              >Show more
            </li>
          </ul>
        </section>
        <ChannelsInfo
          Name="CHANNELS"
          :userChannels="userChannels"
          :showForm="showForm"
          v-on:changeMode="changeScreen($event)"
        />
        <ChannelsInfo
          Name="DIRECT MESSAGES"
          :showForm="showForm"
          v-on:changeMode="changeScreen($event)"
        />
      </article>
    </section>
    <component v-bind:is="showForm"></component>
    <ChannelChat />
  </main>
</template>

<script>
import ConnectedUser from "./ConnectedUser.vue";
import ChannelsInfo from "../Channels/ChannelsInfo.vue";
import ChannelChat from "../Messages/ChannelChat.vue";

import { mapActions } from "vuex";
import ChannelModal from "../Channels/ChannelModal.vue";

export default {
  watch: {},
  data() {
    return {
      clicked: false,
      showForm: "channel-chat",
    };
  },
  name: "Side-bar",
  // mounted() {
  //   this.setDefaultChannel();
  // },
  methods: {
    ...mapActions(["fetchChannels"]),
    setModalActive() {
      this.showForm = "channel-modal";
    },
    changeScreen(updatedTitle) {
      this.showForm = updatedTitle;
    },
  },
  created() {
    this.fetchChannels();
  },
  components: {
    ConnectedUser,
    ChannelsInfo,
    "channel-chat": ChannelChat,
    "channel-modal": ChannelModal,
  },
};
</script>

<style>
.uploading-image {
  display: flex;
}
article,
section,
main {
  display: block;
}
ul {
  list-style: none;
}
.main {
  display: block;
  grid-row: 2 / -1;
  display: grid;
  grid-template-columns: 16.25rem 2fr;
  overflow: hidden;
}
.sidebar {
  border-top: 0.1rem solid lightgray;
  grid-column: 1 / 2;
  height: 100vh;
  background-color: #350d36;
  display: grid;
  grid-template-columns: 4rem minmax(6.25rem, 16.25rem);
}
.sidebar-1 {
  grid-column: 1 / 1;
  border-right: 0.1rem solid lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* first left-sidebar content */
.sidebar-1 .box-1 {
  margin-top: 1rem;
}
.sidebar-1 .box-1,
.sidebar-1 .box-2 {
  height: 2rem;
  width: 2rem;
  margin-bottom: 0.5rem;
  border: 0.125rem solid;
  border-radius: 0.3rem;
}
.sidebar-1 .box-1 {
  background-color: #2eb67d;
}

.sidebar-1 .box-2 {
  background-color: #ecb22e;
}
.sidebar-1 .box-2:hover,
.sidebar-1 .box-1:hover {
  box-shadow: 0 0 0 0.1rem hsl(0, 0%, 100%);
}
.sidebar-1 .box-3 {
  font-size: 1.5rem;
  color: white;
}

/* READ / UNREAD MSGS  */
.unread {
  margin-top: 20px;
  border-top: 0.1rem solid grey;
}
.unread-header {
  color: white;
  display: flex;
  align-items: center;
  margin-top: 0.7rem;
}
.unread-icons {
  margin-left: 8px;
  margin-right: 10px;
}

.unread li {
  color: white;
  font-size: 12px;
  margin-left: 23px;
  padding: 2px;
  font-style: italic;
  display: block;
  text-align: justify;
}
</style>

<!-- ----------------------------------------------------------------------  -->
<!-- // setDefaultChannel() { // console.log("DID IT MOUNT?"); //
console.log(this.userChannels[0]) // const [first]=this.userChannels //
console.log([first]) // if (this.userChannels) { //
this.$store.dispatch("setCurrentChannel", this.userChannels[0]); //CURRENT
CHANNEL RETRIEVAL // console.log("working?"); // } else { // console.log("NOT
WORKING?"); // } // }, -->
