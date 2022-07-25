<template>
  <div data-app><Navbar /> <Sidebar /></div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
// import Example2 from "@/example2.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
// import Example from "@/components/Msc/example.vue";
// import Example from "../components/example.vue";
// import example from "@/components/example.vue";
export default {
  name: "slackChat",
  components: {
    Navbar,
    Sidebar,
    // Example,
  },
};
</script>

<style></style>
