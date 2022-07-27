<template>
  <main class="main">
    <section class="sidebar">
      <div class="sidebar-1">
        <div class="box-1"></div>
        <div class="box-2"></div>
        <button class="box-3" @click="setModalActive()">+</button>
      </div>
      <!-- SIDEBAR 2 WITH CHANNELS AND PEOPLE/USERS INFO  -->
      <article class="sidebar-2">
        <ConnectedUser />
        <section class="unread">
          <h5 class="unread-header">
            <span class="unread-icons">
              <v-icon style="color: white">mdi-message-fast-outline</v-icon>
            </span>
            All unread
          </h5>
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

        <!-- //THIS IS FOR THE SHOWING THE LIST OF CHANNELS IN THE SIDEBAR  -->
        <ChannelsList
          :type="CHANNEL_TYPE.CHANNEL"
          name="Channels"
          :generalizedData="userChannels"
          :showForm="showForm"
          v-on:changeMode="changeScreen($event)"
        />
        <ChannelsList
          :type="CHANNEL_TYPE.DIRECT_MESSAGE"
          name="Direct Messages"
          :generalizedData="userData"
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
import ChannelsList from "../Channels/ChannelsList.vue";
import ChannelChat from "../Messages/ChannelChat.vue";
import constants from "@/services/constants";
import { mapActions, mapGetters } from "vuex";
import ChannelModal from "../Channels/ChannelModal.vue";
import { ref, getDatabase, onValue } from "firebase/database";

export default {
  data() {
    return {
      userData: [],
      clicked: false,
      showForm: "channel-chat",
      CHANNEL_TYPE: constants.CHANNEL_TYPE,
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
    getUserDataFirebase() {
      console.log(this.userData);
      const db = getDatabase();
      const UsersRef = ref(db, "Users/");
      console.log(UsersRef);
      this.userData = [];
      onValue(
        UsersRef,
        (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            this.userData.push(childData);
          });
        },
        {
          onlyOnce: true,
        }
      );
    },
  },

  created() {
    //Called to set the User Channels.
    this.fetchChannels();
    //Responsible for getting all registered users information from firebase AUTHENTICATION.
    this.getUserDataFirebase();
  },
  components: {
    ConnectedUser,
    ChannelsList,
    "channel-chat": ChannelChat,
    "channel-modal": ChannelModal,
  },
  computed: mapGetters({ userChannels: "publicChannels" }),
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
.sidebar-2 {
  grid-column: 2 / -1;
  overflow: hidden;
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
  padding: 4px;
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
