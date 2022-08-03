<template>
  <div data-app><Navbar /> <Sidebar /></div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["fetchChannels"]),
  },
  name: "slackChat",
  components: {
    Navbar,
    Sidebar,
  },
  created() {
    this.fetchChannels();
  },
};
</script>

<style></style>
