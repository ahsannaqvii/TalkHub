<template>
  <div data-app><Navbar /> <Sidebar /></div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";

export default {
  name: "slackChat",
  components: {
    Navbar,
    Sidebar,
  },

};
</script>

<style></style>
