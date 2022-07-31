<template>
  <form class="form" name="MessageForm">
    <input
      class="input"
      id="messageBox"
      placeholder="Type your Message"
      v-model.trim="message"
    />
    <div class="input-messagebox-icons">
      <div class="move-left">
        <v-icon>mdi-lightning-bolt</v-icon>
        <v-icon>mdi-format-bold</v-icon>
        <v-icon>mdi-format-italic</v-icon>
        <v-icon>mdi-format-strikethrough-variant</v-icon>
        <v-icon>mdi-code-tags</v-icon>
        <v-icon>mdi-link </v-icon>
        <v-icon>mdi-order-alphabetical-ascending </v-icon>

        <v-icon>mdi-order-numeric-ascending </v-icon>

        <v-icon>mdi-comment-quote-outline </v-icon>
        <v-icon> mdi-file-code </v-icon>
        <v-icon>mdi-cloud-print-outline</v-icon>
      </div>
      <div class="icons-left-messagebox">
        <v-icon>mdi-at</v-icon>
        <v-icon>mdi-sticker-emoji</v-icon>
        <button
          type="button"
          class="btn-messagebox button"
          @click="sendMessage"
        >
          <v-icon style="color: black">mdi-send</v-icon>
        </button>
      </div>
    </div>
    <div class="input-toolbar-selection"></div>
  </form>
</template>

<script>
import { ref, getDatabase, set } from "firebase/database";
import { mapGetters } from "vuex";

export default {
  props: {
    messages: Array,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage() {
      //Destructing Object to get Ids, ermail and display Name
      const {
        uid: currentUserId,
        displayName: currentUserDisplayName,
        email: currentUserEmail,
      } = this.currentUser;

      //Get the timestamp
      const date = new Date();
      const myDate = date.toLocaleTimeString([], {
        hourCycle: "h23",
        hour: "2-digit",
        minute: "2-digit",
      });

      //Set the Messages in Firebase Database
      const db = getDatabase();
      if (this.currentChannel !== "") {
        if (this.message.length > 0) {
          let messageID = (Math.random() + 1).toString(36).substring(7);
          set(ref(db, "Messages/" + this.currentChannel.id + "/" + messageID), {
            content: this.message,
            timestamp: myDate,
            user: {
              id: currentUserId,
              email: currentUserEmail,
              name: currentUserDisplayName,
            },
          });
        }
      }

      this.message = "";
    },
  },

  name: "MessageBox",
  computed: {
    ...mapGetters(["currentChannel", "currentUser"]),
  },
};
</script>

<style>
::placeholder {
  color: black;
}
.form {
  height: 80%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.form .input {
  width: 90%;
  height: 60%;
  margin-top: 2px;
  margin-right: 50px;
  text-align: center;
  margin-left: 50px;
  padding: 0.6rem;
  border-top-left-radius: 0.3125rem;
  border-top-right-radius: 0.3125rem;
  outline: none;
  border-top: 0.0625rem solid #ccc;
  border-left: 0.0625rem solid #ccc;
  border-right: 0.0625rem solid #ccc;
  border-bottom: none;
  overflow: auto;
}
.input-messagebox-icons {
  width: 90%;
  font-size: 1rem;
  padding: 0.2rem 0.5rem;
  display: flex;
  align-items: center;
  position: absolute;
  border-bottom-left-radius: 0.3125rem;
  border-bottom-right-radius: 0.3125rem;
  border: 0.0625rem solid #ccc;
  top: 70%;
  word-wrap: break-word;
  font-weight: 300;
}
.input-messagebox-icons .v-icon {
  padding: 0.2rem 0.2rem;
  margin-right: auto;
  cursor: pointer;
  color: rgba(134, 134, 134, 1);
}

.move-left {
  margin-right: auto;
}
.move-left .v-icon {
  padding: 2px;
  font-size: 18px;
  color: #2f2f30;
}
.icons-left-messagebox {
  margin-left: auto;
  display: flex;
  align-items: center;
}
.icons-left-messagebox .v-icon {
  color: #2f2f30;
  font-size: 18px;
}
.btn-messagebox {
  border: none;
  background-color: inherit;
  border-radius: 0.5rem;
  padding: 0;
  transition: all 0.5s ease-out;
}
.button:hover {
  background-color: #2f2f30;
}
.button:hover .v-icon {
  color: white;
}
</style>
