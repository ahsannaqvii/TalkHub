<template>
  <!-- <Home /> -->
  <div data-app><Navbar /> <Example2 /></div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
// import Home from "@/components/Sidebar/Home.vue";
import Example2 from "@/example2.vue";
// import Example from "../components/example.vue";
// import example from "@/components/example.vue";
export default {
  name: "slackChat",
  components: {
    Navbar,
    // Home,
    Example2,
  },
};
</script>

<style></style>
