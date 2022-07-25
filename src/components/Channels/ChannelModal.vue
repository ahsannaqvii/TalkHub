<template>
  <!-- <v-row justify="center" style="margin-top: 15px; margin-left: 25px">
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

          ----------------------------------------------------------------------------------------------

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
  </v-row> -->

  <section class="body">
    <section class="content">
      <section class="content-header">
        <article class="channel-content-header-details">
          <h4 class="channel-content-header-name">
            All Channels
            <i class="fas fa-info-circle"></i>
          </h4>
        </article>
      </section>
      <section>
        <input
          class="search-bar-input"
          type="text"
          name="channelName"
          placeholder="Search channel by name or description"
        />
        <section class="results">
          <section class="results-header">
            <article class="results-header-content">
              <h5>5 Recommended Results</h5>
            </article>
          </section>
          <article class="btn-borderless-header">
            <button class="btn-borderless-text" id="info" type="button">
              <v-icon class="filter-icon"> mdi-swap-vertical </v-icon>

              <h5>Most recommended</h5>
            </button>
            <button class="btn-borderless-text" id="info" type="button">
              <v-icon class="filter-icon">mdi-filter-variant</v-icon>
              <h5>Filter</h5>
            </button>
          </article>
        </section>
        <section class="available-channels">
          <article class="avaiable-channel-list">
            <article
              v-for="channel in existingChannel"
              :key="channel.id"
              class="single-channel"
            >
              <!-- TODO:IF THE CHANNEL IS PRIVATE ASK FOR THE PASSWORD   -->
              <div class="single-channel-ext">
                <v-icon v-if="channel.Mode === 'Private'" class="channel-icon"
                  >mdi-account-lock</v-icon
                >
                <h2 v-if="channel.Mode === 'Public'" class="channel-icon2">
                  #
                </h2>

                <h6>{{ channel.Name }}</h6>
                <!-- TODO:Find a better way to render this  -->
                <button
                  class="single-channel-ext-btn-design"
                  @click.prevent="addChannel(channel)"
                  v-if="checkChannel(channel)"
                >
                  Join
                </button>
                <!-- TODO:Write the Leave channel functionality  -->
                <button
                  class="single-channel-ext-btn-design"
                  v-else
                  @click="leaveChannel(channel)"
                >
                  Leave
                </button>
              </div>
              <article v-if="!checkChannel(channel)" class="channel-status">
                <v-icon class="channel-status-icon">mdi-account-check</v-icon>
                <h1>Joined</h1>
                <h1>* 326 Members</h1>
              </article>
            </article>
          </article>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      channelData: null,
      existingChannel: [],
      newChannel: "",
      errors: [],
    };
  },
  name: "ChannelModal",

  methods: {
    ...mapGetters(["currentUser"]),
    ...mapActions(["setChannelinDatabase", "setCurrentChannel"]),

    checkChannel(channel) {
      for (var i = 0; i < this.userChannels.length; i++) {
        if (channel.Name === this.userChannels[i].channelName) {
          return false;
        } else {
          continue;
        }
      }

      return true;
    },
    addChannel(channel) {
      console.log(channel.Name);
      let newChannelObj = {
        channelName: channel.Name,
        users: [
          {
            userName: this.getCurrentUser.displayName,
            email: this.getCurrentUser.email,
          },
        ],
      };
      this.$store.dispatch("setChannelinDatabase", newChannelObj);
      this.$store.dispatch("setCurrentChannel", channel.Name);
    },
  },

  async created() {
    try {
      const res1 = await axios.get("http://localhost:3001/ExistingChannels"); // used in VERIFYCHANNEL()
      this.existingChannel = res1.data;
      console.log(this.existingChannel);
    } catch (e) {
      console.log(e.message);
    }
  },
  computed: {
    ...mapGetters(["userChannels"]),
    getCurrentUser() {
      return this.$store.getters.currentUser;
    },
    // hasErrors() {
    //   return this.errors.length > 0;
    // },
  },
};
</script>

<style scoped>
.body {
  grid-column: 2 / -1;
  background-color: var(white);
  border-right: 0.1rem solid rgba(29, 28, 29, 0.13);
  display: grid;
}
.content {
  /* grid-column: 1 / 1;   */
  /* padding:10px; */
  height: 100vh;
  border-right: 0.1rem solid var(white);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr 10rem;
  grid-template-areas:
    "header"
    "main"
    "footer";
}

.search-bar-input {
  background-color: white;
}
.search-bar-input:focus {
  background-color: #350d36;
  color: white;
}
input {
  /* box-shadow: 2px 8px 8px 8px lightblue, 8px 8px 8px 8px lightblue; */
  width: 98%;
  height: 35px;
  margin-top: 20px;
  margin-left: 10px;
  border-radius: 4px;
  border: 1px solid lightgrey;
}
/* input:hover {
  background-color: #350d36;
  border-color: #350d36;
} */
.results {
  display: flex;
  padding-bottom: 5px;
  margin-left: 12px;
  border-bottom: 1px solid lightgrey;
}
.results-header {
  margin-top: 60px;
  margin-left: 12px;
}
.btn-borderless-header {
  display: flex;
  margin-left: auto;
}
.btn-borderless-text {
  display: flex;
  align-items: flex-end;

  margin-right: 20px;
}
.filter-icon {
  margin-right: 2px;
  font-size: 20px;
}
.available-channels {
  margin-left: 12px;
}
.single-channel :hover {
  cursor: pointer;
}
.avaiable-channel-list {
  margin-left: 2px;
}
.single-channel {
  text-align: left;
  padding: 15px;
  border-bottom: 1px solid #ccc;
}
.single-channel-ext {
  display: flex;
}
.single-channel-ext h6 {
  color: black;
  font-weight: 1000;
  font-size: 14px;
}
.channel-icon {
  display: flex;
  font-size: 16px;
  align-items: initial;
  margin-right: 2px;
  color: black;
}
.channel-icon2 {
  color: black;
  display: flex;
  font-size: 14px;
  margin-right: 2px;
}
.single-channel-ext-btn {
  display: flex;
}
.single-channel-ext-btn-design {
  background-color: white;
  font-size: 12px;
  padding: 4px;
  font-weight: bolder;
  border-radius: 4px;
  color: black;
  margin-left: auto;
}
.button {
  transition-duration: 0.4s;
}
button:hover {
  background-color: #350d36; /* Green */
  color: white;
}
.channel-status {
  display: flex;
  font-size: 16px;
  color: #004d40;
}
.channel-status-icon {
  font-size: 16px;
  margin-right: 4px;
  color: #004d40;
}
.channel-status h1 {
  margin-right: 4px;
}
</style>
<!-- // verifyChannel() {
    //   this.errors = [];
    //   var decision = false;
    //   console.log(this.newChannel);
    //   for (var i = 0; i < this.existingChannelNames.length; i++) {
    //     if (this.newChannel === this.existingChannelNames[i].Name) {
    //       let obj = {
    //         channelName: this.newChannel,
    //         users: {
    //           userName: this.getCurrentUser.displayName,
    //           email: this.getCurrentUser.email,
    //         },
    //       };
    //       this.$store.dispatch("setChannelinDatabase", obj);
    //       this.$store.dispatch("setCurrentChannel", this.newChannel);
    //       decision = true;
    //       this.dialog = false;
    //       break;
    //     }
    //   }
    //   if (!decision) {
    //     this.errors = [];
    //     this.errors.push("No Such Channel exist!");
    //     this.dialog = true;
    //   }
    // },

    // checkChannelDuplicacy() {
    //   let decision = false;
    //   this.errors = [];
    //   const data = this.userChannels;
    //   for (var i = 0; i < this.userChannels.length; i++) {
    //     console.log(data[i].channelName);
    //     if (this.newChannel === data[i].channelName) {
    //       this.errors.push(MESSAGE_CHANNELDUPLICATE);
    //       decision = true;
    //       break;
    //     } else {
    //       decision = false;
    //     }
    //   }
    //   return decision;
    // },

    // verifyEmail() {
    //   if (this.getCurrentUser.email != this.email) {
    //     this.errors.push(MESSAGE_INCORRECTEMAIL);
    //     this.dialog = true;
    //   } else {
    //     this.errors = [];
    //     console.log("working2 ?");
    //     if (!this.checkChannelDuplicacy()) {
    //       this.verifyChannel();
    //     } else {
    //       this.errors.push(MESSAGE_CHANNELDUPLICATE);
    //       this.dialog = true;
    //     }
    //   }
    // }, -->
<!-- // const MESSAGE_INCORRECTEMAIL = "The email that has been entered is incorrect";
// const MESSAGE_CHANNELDUPLICATE =
//   "The channel is already registered with your email!"; -->
