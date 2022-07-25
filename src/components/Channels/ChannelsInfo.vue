<template>
  <section class="channels">
    <v-menu open-on-hover bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          style="
            margin-top: 6px;
            padding: 0;
            display: flex;
            width: 100%;
            justify-content: flex-start;
          "
          depressed
          color="#350d36"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-arrow-down</v-icon>
          <h4 class="channels-header">{{ Name }}</h4>
        </v-btn>
      </template>

      <v-list class="main-list" dense color="#350d36">
        <v-list-item
          depressed
          color="white"
          v-for="channel in userChannels"
          :key="channel.id"
        >
          <!--"
        //     :class="{ is_active: setActiveChannel(channel) }" -->
          <!-- TODO: TIME MILA TOU UPDATE(Replace dialog box with channel list) THIS CHANNEL AND DIRECT MSGS SECTION  -->
          <v-list-item-title
            depressed
            style="display: flex"
            class="list-item-title"
            @click="changeChannel(channel)"
          >
            <h4 style="font-size: 20px; margin-right: 5px">#</h4>

            {{ channel.channelName }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["fetchChannels", "setCurrentChannel"]),
    changeChannel(channel) {
      // TODO:ACTIVE WALA KAAM REHTA HAI
      // setActiveChannel(channel) {
      //   return (
      //     // TODO://LATER CHANGE THIS TO CHANNEL.ID
      //     channel.channelName === this.$store.getters.currentChannel.channelName
      //   );
      // },
      this.active = true;
      // Retrieve the current channel
      this.$store.dispatch("setCurrentChannel", channel);
      this.$emit("changeMode", "channel-chat");
    },
  },
  computed: mapGetters(["userChannels", "currentChannel"]),

  props: {
    Name: String,
    userChannels: Array,
    showForm: String,
  },
  name: "ChannelInfo",
  data: () => ({
    active: false,
  }),
};
</script>

<style>
/* CHANNELS CSS  */
.channels {
  margin-top: 12px;
  border-top: 0.1rem solid grey;
  margin-bottom: 176px;
}
.main-list {
  width: 100%;
  height: 174px;
  overflow-y: auto;
}
.list-item-title {
  color: white;
  font-size: 14px;
  display: block;
  text-align: justify;
}
.main-list :hover {
  cursor: pointer;
}
.is_active {
  background-color: #d69c33;

  height: 40px;
  width: 40px;
  border-radius: 8px;
  /* color */
}
</style>
