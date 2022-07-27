<template>
  <section class="body">
    <section class="content">
      <section class="content-header">
        <article class="channel-content-header-details">
          <h4 style="font-weight: bold" class="channel-content-header-name">
            #{{ currentChannel.name.toUpperCase() }}
            <i class="fas fa-star"></i>
          </h4>
          <section class="content-header-icons">
            <div>
              <i class="far fa-user"></i
              ><span class="content-header-counter">23</span>
            </div>
            <div>
              <i class="fas fa-thumbtack fa-rotate-315 last"></i
              ><span class="content-header-counter">6</span>
            </div>
            <p class="content-header-text">Securiti.ai</p>
          </section>
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
        />
      </div>
      <MessageBox />
      <!-- <section class="message-box">
        <v-text-field
          background-color="grey"
          dense
          flat
          hide-details
          solo
          id="message"
          class="messages"
          placeholder="Enter your message"
          v-model.trim="message"
        />
        ENTER THE MSG BOX (TEMPORARY FOR NOW )
        <div class="message-box">
          <button @click="sendMessage">Enter</button>
          <button>
            <v-icon style="color: black; margin-right: 5px"
              >mdi-auto-upload
            </v-icon>
            Upload Attachments
          </button>
        </div>
      </section> -->
    </section>
  </section>
</template>
<script>
import { ref, getDatabase, onValue } from "firebase/database";

import { mapGetters } from "vuex";
import SingleMessage from "./Single-Message.vue";
import MessageBox from "./MessageBox.vue";
export default {
  name: "channel-chat",
  data() {
    return {
      channel: null,
      messages: [],
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
    // //------------------------------------------------------------------------------
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
    // detachListener() {},
  },
  computed: mapGetters(["currentChannel", "currentUser"]),
  created() {
    this.getMessageDataFirebase();
  },
  components: { SingleMessage, MessageBox },
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
  background-color: var(white);
  border-right: 0.1rem solid rgba(29, 28, 29, 0.13);
  display: grid;
}
.content {
  height: 98vh;
  border-right: 0.1rem solid var(white);
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
  /* padding: 4px; */
  padding-bottom: 10px;
  grid-area: header;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 0.1rem solid var(white);
  box-shadow: 0 0 0.2rem -0.2rem rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.channel-content-header-details {
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0.1rem 1.5rem;
}
.content-header-icons {
  display: flex;
  align-items: center;
}
.channel-content-header-name {
  font-size: 1rem;
  font-style: italic;

  display: flex;
  margin-bottom: 0.5rem;
}

.channel-content-header-name i {
  font-size: 0.8rem;
  color: var(dark blue);
  margin-left: 0.5rem;
  margin-top: 4px;
  color: blue;
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
/* .messages {
} */
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

// const timestamp = // console.log(firebase.database.ServerValue.TIMESTAMP);
