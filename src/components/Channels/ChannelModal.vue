<template>
  <section class="body-content">
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

    //SetCurrentChannel is responsible for setting the current active channel of user
    //SetChannelInDatabase sets the user entry in DB.JSON File
    ...mapActions(["setChannelInDatabase", "setCurrentChannel"]),

    //Function designed to cater the UI Needs. If checkChannel returns false , it means that it is
    // already a part of  channel and 'LEAVE' button will be displayed
    checkChannel(channel) {
      for (var i = 0; i < this.userChannels.length; i++) {
        if (channel.Name === this.userChannels[i].name) {
          return false;
        } else {
          continue;
        }
      }

      return true;
    },
    //When the user presses 'Join' , addChannel is triggered which in turn sets the values in realtimeDB
    // and in vueX store(currentChannel)

    addChannel(channel) {
      let newChannelObj = {
        name: channel.Name, //Channel Name
        users: {
          userName: this.getCurrentUser.displayName, //User Name
          email: this.getCurrentUser.email, //user email3
        },
      };
      this.$store.dispatch("setChannelInDatabase", newChannelObj);
      this.$store.dispatch("setCurrentChannel", channel.Name);
    },
  },
  //Store the existing Channels(Hardcoded channels) once the component is created.
  async created() {
    try {
      const res1 = await axios.get("http://localhost:3001/ExistingChannels");
      this.existingChannel = res1.data;
    } catch (e) {
      console.log(e.message);
    }
  },
  computed: {
    ...mapGetters(["userChannels"]),
    getCurrentUser() {
      return this.$store.getters.currentUser;
    },
  },
};
</script>

<style scoped>
.body-content {
  grid-template-columns: 1.5fr 1fr;
  grid-column: 2 / -1;
  background-color: white;
  border-right: 0.1rem solid rgba(29, 28, 29, 0.13);
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
