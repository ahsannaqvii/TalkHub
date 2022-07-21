<template>
  <v-row justify="center" style="margin-top: 15px; margin-left: 25px">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#4a154b"
          dark
          v-bind="attrs"
          v-on="on"
          class="add__newBtn"
        >
          Add New Channel
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal first name*"
                  required
                  v-model="this.getCurrentUser.displayName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="Your middle name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Channel Name*"
                  required
                  v-model="newChannel"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <!-- ---------------------------------------------------------------------------------------------- -->

          <div>
            <div class="error-ui-message" v-if="hasErrors">
              <p v-for="error in errors" :key="error.id">{{ error }}</p>
            </div>
            <div>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="verifyEmail">
                Save
              </v-btn>
            </div>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
const MESSAGE_INCORRECTEMAIL = "The email that has been entered is incorrect";
const MESSAGE_CHANNELDUPLICATE =
  "The channel is already registered with your email!";

export default {
  data() {
    return {
      channelData: null,
      existingChannelNames: null,
      email: "",
      newChannel: "",
      dialog: false,
      errors: [],
    };
  },
  methods: {
    ...mapGetters(["currentUser"]),
    ...mapActions(["setChannelinDatabase", "setCurrentChannel"]),

    verifyChannel() {
      this.errors = [];
      var decision = false;
      console.log(this.newChannel);
      for (var i = 0; i < this.existingChannelNames.length; i++) {
        if (this.newChannel === this.existingChannelNames[i].Name) {
          let obj = {
            channelName: this.newChannel,
            users: {
              userName: this.getCurrentUser.displayName,
              email: this.getCurrentUser.email,
            },
          };
          this.$store.dispatch("setChannelinDatabase", obj);
          this.$store.dispatch("setCurrentChannel", this.newChannel);
          decision = true;
          this.dialog = false;
          break;
        }
      }
      if (!decision) {
        this.errors = [];
        this.errors.push("No Such Channel exist!");
        this.dialog = true;
      }
    },

    checkChannelDuplicacy() {
      let decision = false;
      this.errors = [];
      const data = this.userChannels;
      for (var i = 0; i < this.userChannels.length; i++) {
        console.log(data[i].channelName);
        if (this.newChannel === data[i].channelName) {
          this.errors.push(MESSAGE_CHANNELDUPLICATE);
          decision = true;
          break;
        } else {
          decision = false;
        }
      }
      return decision;
    },

    verifyEmail() {
      if (this.getCurrentUser.email != this.email) {
        this.errors.push(MESSAGE_INCORRECTEMAIL);
        this.dialog = true;
      } else {
        this.errors = [];
        console.log("working2 ?");
        if (!this.checkChannelDuplicacy()) {
          this.verifyChannel();
        } else {
          this.errors.push(MESSAGE_CHANNELDUPLICATE);
          this.dialog = true;
        }
      }
    },
  },

  name: "ChanNels",

  async created() {
    try {
      const res1 = await axios.get("http://localhost:3001/ExistingChannels"); // used in VERIFYCHANNEL()
      this.existingChannelNames = res1.data;
    } catch (e) {
      console.log(e.message);
    }
  },
  computed: {
    ...mapGetters(["userChannels"]),

    getCurrentUser() {
      return this.$store.getters.currentUser;
    },
    hasErrors() {
      return this.errors.length > 0;
    },
  },
};
</script>

<style scoped>
.add__newBtn {
  width: 60%;
  border-radius: 10px;
}
.error-ui-message {
  display: block;
  height: 50px;
  width: 400px;
  align-content: center;
  /* margin-left: 50px; */
  margin-right: 85px;
  text-align: center;
  background-color: #fff6f6;
  box-shadow: 0 0 0 1px #e0b4b4 inset, 0 0 0 0 transparent;

  color: #9f3a38;
}
p {
  padding-top: 20px;
  text-align: center;
}
</style>
// addChannels() { // // console.log(this.newChannel); //
this.$refs.anyName.reset(); // },
