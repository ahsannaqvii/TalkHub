<template>
  <!-- <section class="body"> -->
  <section v-bind:class="[showUserProfile ? 'body' : 'body-full']">
    <section class="content">
      <section class="content-header">
        <article class="channel-content-header-details">
          <h4 style="font-weight: bold" class="channel-content-header-name">
            #{{ currentChannel.name }}
            <i class="fas fa-star"></i>
          </h4>
        </article>
        <button class="btn-borderless btn-slack info" id="info" type="button">
          <i class="fas fa-info-circle"></i>
        </button>
      </section>
      <div class="main-message-box">
        <SingleMessage
          :message="message"
          v-for="message in messages"
          :key="message.id"
          v-on:showDetails="showDetails($event)"
        />
      </div>
      <MessageBox :messages="messages" />
    </section>
    <UserDetails
      v-if="showUserProfile"
      :userData="userData"
      v-on:ToggleSideBar="ToggleSideBar($event)"
    />
  </section>
</template>
<script>
import { ref, getDatabase, onValue } from "firebase/database";
import { mapGetters } from "vuex";
import SingleMessage from "./Single-Message.vue";
import MessageBox from "./MessageBox.vue";
import UserDetails from "../UserInfo/UserDetails.vue";
export default {
  name: "channel-chat",
  data() {
    return {
      channel: null,
      messages: [],
      userData: "",
      showUserProfile: false,
    };
  },
  watch: {
    currentChannel() {
      this.messages = [];
      this.getMessageDataFirebase();
      this.channel = this.currentChannel;
    },
  },
  methods: {
    //Function responsible to get an event from child and toggle the showUserProfile data variable.
    showDetails(UserData) {
      this.userData = UserData;
      this.showUserProfile = !this.showUserProfile;
    },
    ToggleSideBar(decision) {
      this.showUserProfile = decision;
    },

    // Get messages from firebase realtime DB.
    getMessageDataFirebase() {
      const db = getDatabase();
      const MessagesRef = ref(db, "Messages/" + this.currentChannel.id);
      this.messages = [];
      onValue(
        MessagesRef,
        (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            // console.log(childData);
            this.messages.push(childData);
            // console.log(this.messages);
          });
        },
        {
          onlyOnce: true,
        }
      );
    },
  },
  computed: mapGetters(["currentChannel", "currentUser"]),
  mounted() {
    this.getMessageDataFirebase();
  },
  components: { SingleMessage, MessageBox, UserDetails },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}

.body {
  grid-column: 2 / -1;
  background-color: white;
  border-right: 0.1rem solid rgba(29, 28, 29, 0.13);
  grid-template-columns: 1.5fr 1fr;
  display: grid;
}
.body-full {
  grid-template-columns: 1.5fr 1fr;
  grid-column: 2 / -1;
  background-color: white;
  border-right: 0.1rem solid rgba(29, 28, 29, 0.13);
}
.content {
  grid-column: 1 / 1;
  height: 98vh;
  border-right: 0.1rem solid white;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr 10rem;
  grid-template-areas:
    "header"
    "main"
    "footer";
}

.content-header {
  border-bottom: 1px solid #ccc;
  /* padding-bottom: 5px; */
  grid-area: header;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 0.1rem solid #ccc;
  box-shadow: 0 0 0.2rem -0.2rem rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.channel-content-header-details {
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0 1.5rem;
}
.content-header-icons {
  display: flex;
  align-items: center;
}
.channel-content-header-name {
  font-size: 1rem;
  font-style: italic;
  text-transform: uppercase;
  display: flex;
  margin-bottom: 0.5rem;
}

.channel-content-header-name i {
  font-size: 0.8rem;
  color: dark blue;
  margin-left: 0.5rem;
  margin-top: 6px;
  color: #350d36;
}
.content-header-icons {
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
}

.content-header-icons i {
  font-size: 0.8rem;
  margin-right: 0.2rem;
}

.content-header-icons span {
  margin-right: 0.8rem;
  font-size: 0.8rem;
}
.content-header-text {
  font-size: 0.8rem;
  font-weight: 300;
}
.info {
  margin-left: auto;
  margin-right: 1rem;
  color: #9e9a9a;
  cursor: pointer;
}

/* INPUT BOX STYLE  */
.message-box {
  width: 80%;
  align-items: center;
  border-radius: 8px;
  margin-left: 100px;
  /* bor */
  border: 1px solid grey;
}
/* Messages css  */
.message-box {
  margin-top: 10px;
}
.message-box button {
  border: 1px solid grey;
  border-radius: 4px;
  padding: 10px;
  margin-right: 10px;
}
.main-message-box {
  overflow-y: auto;
}
</style>
