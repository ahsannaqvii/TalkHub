<template>
  <form class="form" name="MessageForm" @submit="sendMessage">
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
        <v-icon>mdi-cloud-print-outline</v-icon>
        <label for="file-upload" class="custom-file-upload">
          <i style="color: black" class="fa fa-cloud-upload"></i>
        </label>
        <input id="file-upload" type="file" @change="onFileSelected" />
      </div>
      <div class="icons-left-messagebox">
        <v-btn x-small depressed min-width="2px">
          <v-icon>mdi-at</v-icon>
        </v-btn>
        <v-btn x-small depressed> <v-icon>mdi-sticker-emoji</v-icon> </v-btn>
        <v-btn
          x-small
          depressed
          type="button"
          :loading="loading"
          class="btn-messagebox button"
          @click="sendMessage"
        >
          <v-icon style="color: black">mdi-send</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="input-toolbar-selection"></div>
  </form>
</template>

<script>
import { ref, getDatabase, set } from "firebase/database";
import { mapGetters } from "vuex";
import { getStorage, uploadBytes } from "firebase/storage";
import { ref as sRef, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      message: "",
      selectedFile: null,
      fileURL: null,
      loading: false,
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    async sendMessage(event) {
      this.loading = true;
      event.preventDefault();

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
        // if (this.message.length > 0) {
        let messageID = (Math.random() + 1).toString(36).substring(7);
        if (this.selectedFile !== null) {
          let filePath =
            this.getFilePath(messageID) + `${this.selectedFile.name}`;

          //Set the image in storage
          await this.setImageInFirebaseStorage(filePath);

          //Get image URL from storage.
          this.fileURL = await this.getImageFromFirebase(filePath);
          //Set the messages in database.
        }
        try {
          await set(
            ref(db, "Messages/" + this.currentChannel.key + "/" + messageID),
            this.createMessage(myDate)
          );
          this.loading = false;
        } catch (e) {
          console.log(e.message);
        }
      }

      this.message = "";
      this.selectedFile = null;
      this.fileURL = null;
    },
    createMessage(myDate) {
      //Destructing Object to get Ids, ermail and display Name
      const {
        uid: currentUserId,
        displayName: currentUserDisplayName,
        email: currentUserEmail,
      } = this.currentUser;
      let message2 = {
        timestamp: myDate,
        user: {
          id: currentUserId,
          email: currentUserEmail,
          name: currentUserDisplayName,
        },
      };
      if (this.fileURL === null) {
        message2["content"] = this.message;
      } else {
        message2["image"] = this.fileURL;
      }
      return message2;
    },
    async setImageInFirebaseStorage(filePath) {
      // Get a reference to the storage service, which is used to create references in your storage bucket
      const storage = getStorage();

      // Create a storage reference from our storage service
      const imagesRef = sRef(storage, filePath);

      //Uploading file to the database.
      const snapshot = await uploadBytes(imagesRef, this.selectedFile);
      console.log(snapshot);
    },
    async getImageFromFirebase(filePath) {
      const storage = getStorage();
      const imagesRef = sRef(storage, filePath);

      try {
        const url = await getDownloadURL(imagesRef);
        return url;
      } catch (e) {
        console.log(e.message);
      }
    },
    //Returns the file path to store in Firebase Storage.
    getFilePath(messageID) {
      return `Messages/${this.currentChannel.key}/${messageID}/`;
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
input[type="file"] {
  display: none;
}
.custom-file-upload {
  display: inline-block;
  /* padding: 6px 12px; */
  padding: 6px;
  cursor: pointer;
}
.form {
  margin-bottom: 28px;
  /* height: 100%; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form .input {
  width: 90%;
  height: 50%;
  margin-right: 50px;
  text-align: justify;
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
  padding: 4px;
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
