<template>
  <v-app>
    <h1 class="text-center">CHANNELS</h1>

    <h2>{{ this.currentUser1.displayName.toUpperCase() }}</h2>
    <Channels />
    <v-divider class="ml-6 mx-30 my-5 mb-50"></v-divider>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Channels from "./ChannelModal.vue";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapGetters(["currentUser"]),
    logout() {
      //   console.log(this.currentUser.displayName); MAP GETTERS FILHAL NOT WORKING.
      //   console.log(this.$store.getters.currentUser.displayName);
    },
  },
  computed: {
    currentUser1() {
      return this.$store.getters.currentUser;
    },
  },
  name: "ConnectedUser",
  components: { Channels },
};
</script>

<style>
.text-center {
  text-align: center;
  font-family: "Poppins-500", sans-serif;
  margin-top: 15px;
  margin-left: 25px;
}
</style>
