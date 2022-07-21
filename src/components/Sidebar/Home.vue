<template>
  <v-app class="Sidebar-settings">
    <v-navigation-drawer
      style
      v-model="drawer"
      app
      width="300"
      class="sidebar1"
    >
      <!-- THIS IS FOR SIDE LOGOS  -->
      <v-navigation-drawer
        v-model="drawer"
        absolute
        width="280"
        height="700"
        color="grey lighten-3"
        mini-variant
      >
        <v-avatar
          class="d-block text-center mx-auto mt-4"
          color="orange"
          size="36"
          ><img src="../../assets/avatar2.jpeg"
        /></v-avatar>

        <v-divider class="mx-3 my-5"></v-divider>

        <v-avatar
          v-for="n in 6"
          :key="n"
          class="d-block text-center mx-auto mb-9"
          color="grey lighten-1"
          size="28"
        ></v-avatar>
      </v-navigation-drawer>

      <!-- SHOWING INFO OF USER  -->
      <v-sheet color="grey lighten-5" height="150" class="handle-scroll mb-5">
        <ConnectedUser />
      </v-sheet>

      <v-list class="pl-14 ma-5" shaped>
        <!-- OUTPUTTING CHANNEL LIST ON SCREEN  -->
        <v-list-item v-for="channel in userChannels" :key="channel.id" link>
          <v-list-item-content>
            <button
              :class="{ is_active: setActiveChannel(channel) }"
              @dblclick="changeChannel(channel)"
            >
              {{ channel.channelName }}
            </button>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- User inputs the msgs and firebase handles it then  -->
    <ChannelChat />
  </v-app>
</template>

<script>
import ConnectedUser from "./ConnectedUser.vue";
import { mapGetters, mapActions } from "vuex";
import ChannelChat from "../Messages/ChannelChat.vue";

export default {
  data() {
    return {
      clicked: false,
    };
  },
  name: "HOme",
  // mounted() {
  //   this.setDefaultChannel();
  // },
  methods: {
    // setDefaultChannel() {
    //   console.log("DID IT MOUNT?");
    // console.log(this.userChannels[0])
    // const [first]=this.userChannels
    // console.log([first])
    //   if (this.userChannels) {

    //     this.$store.dispatch("setCurrentChannel", this.userChannels[0]); //CURRENT CHANNEL RETRIEVAL
    //     console.log("working?");
    //   } else {
    //     console.log("NOT WORKING?");
    //   }
    // },
    ...mapActions(["fetchChannels", "setCurrentChannel"]),
    setActiveChannel(channel) {
      return (
        channel.channelName === this.$store.getters.currentChannel.channelName //LATER CHANGE THIS TO CHANNEL.ID
      );
    },
    changeChannel(channel) {
      this.$store.dispatch("setCurrentChannel", channel); //CURRENT CHANNEL RETRIEVAL
    },
  },
  components: { ConnectedUser, ChannelChat },
  created() {
    this.fetchChannels();
    // this.$store.dispatch("setCurrentChannel", this.userChannels[0]); //CURRENT CHANNEL RETRIEVAL
  },
  computed: mapGetters(["userChannels", "currentChannel"]), //Computed is called everytime getAllTodos mai jo state hai wo changes.
};
</script>

<style>
.handle-scroll {
  overflow: hidden;
  overflow-y: hidden;
}
.sidebar1 {
  position: fixed;
  margin-top: 50px;
}
.is_active {
  background-color: #d69c33;

  height: 40px;
  width: 40px;
  border-radius: 8px;
  /* color */
}
</style>
