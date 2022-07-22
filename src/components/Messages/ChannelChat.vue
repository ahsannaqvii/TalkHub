<!-- <template>
  <v-app>
    <v-main>
      <div class="top-headline">
        <h1>
          {{ currentChannel.channelName.toUpperCase() }}
        </h1>
      </div>
      <div class="container__msg">
        <SingleMessage
          :message="message"
          v-for="message in messages"
          :key="message.id"
        ></SingleMessage>
      </div>
    </v-main>

    <v-footer
      app
      color="transparent"
      height="72"
      inset
      style="background-color: black"
    >
      <v-text-field
        background-color="grey lighten-1"
        dense
        flat
        hide-details
        solo
        id="message"
        placeholder="Enter your message"
        v-model.trim="message"
        style="margin-right: 20px"
      ></v-text-field>
      <div>
        <button class="btn-mainbody" @click="sendMessage">Enter</button>
        <button class="btn-mainbody2">
          <v-icon style="color: white; margin-right: 5px"
            >mdi-auto-upload
          </v-icon>
          Upload Attachments
        </button>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { ref, getDatabase, set, onValue } from "firebase/database";

import { mapGetters } from "vuex";
import SingleMessage from "./Single-Message.vue";
export default {
  data() {
    return {
      message: "",
      channel: null,
      messages: [],
    };
  },
  watch: {
    currentChannel() {
      this.messages = [];
      this.ListenerFunction();
      this.channel = this.currentChannel;
    },
  },
  methods: {
    sendMessage() {
      const date = new Date();
      const myDate = date.toLocaleTimeString([], {
        hourCycle: "h23",
        hour: "2-digit",
        minute: "2-digit",
      });

      const db = getDatabase();
      if (this.currentChannel !== "") {
        if (this.message.length > 0) {
          let messageID = (Math.random() + 1).toString(36).substring(7);
          console.log("random", messageID);
          set(ref(db, "Messages/" + this.currentChannel.id + "/" + messageID), {
            content: this.message,
            timestamp: myDate,

            user: {
              id: this.currentUser.uid,
              email: this.currentUser.email,
              name: this.currentUser.displayName,
              avatar: this.currentUser.photoURL,
            },
          });
        }
      }
      this.message = "";
    },
    //------------------------------------------------------------------------------
    ListenerFunction() {
      const db = getDatabase();
      const MessagesRef = ref(db, "Messages/" + this.currentChannel.id);
      this.messages = [];
      onValue(
        MessagesRef,
        (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            // const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            console.log(childData);
            this.messages.push(childData);
            console.log(this.messages);
          });
        },
        {
          onlyOnce: true,
        }
      );
    },
    detachListener() {},
  },
  computed: mapGetters(["currentChannel", "currentUser"]),
  name: "ChannelChat",
  components: { SingleMessage },
};
</script>
<style>
.top-headline {
  border-bottom: 2px;
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 15px 20px;
  line-height: 1.5em;
  color: black;
  font-size: 12px;
  font-style: italic;
}
.btn-mainbody {
  background-color: #4a154b;
  border: none;
  color: white;
  padding: 12px 28px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  /* margin-top: 15px; */
  height: 45px;
  font-size: 14px;
  border-radius: 5px;
  margin-right: 10px;
}
.btn-mainbody2 {
  background-color: #4a154b;
  border: none;
  color: white;
  padding: 12px 28px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  /* margin-top: 15px; */
  height: 45px;
  font-size: 14px;
  border-radius: 5px;
}

.container__msg {
  overflow-y: scroll;
  background-color: #f2f2f2;
  height: 75%;
  /* margin-top: 20px; */
  /* width: 98%; */
  /* margin-left: 3px; */
}
</style>
// const timestamp = // console.log(firebase.database.ServerValue.TIMESTAMP); -->
