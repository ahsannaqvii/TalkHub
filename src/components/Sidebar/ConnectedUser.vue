<!-- COMPONENT IS RESPONSIBLE FOR SHOWING THE USER INFORMATION ON SIDEBAR TOP  -->

<template>
  <section class="sidebar-user">
    <div class="sidebar-user-info">
      <h4>{{ currentUser.displayName }}</h4>
      <div>
        <!-- TODO: SMALLER THE SIZE OF V-ICON  -->
        <!-- <v-icon style="color: white; height: 12px">mdi-arrow-down</v-icon> -->
        <!-- TODO:Time bacha to add an online / offline tag below the username  -->
      </div>
    </div>

    <span class="user-edit-icon"
      ><v-icon class="user-edit-icon-actual" style="color: #212121"
        >mdi-account-edit</v-icon
      ></span
    >
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    currentUser2: Object,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  name: "ConnectedUser",
};
</script>

<style>
.sidebar-user {
  color: white;
  position: relative;
}
.sidebar-user-info {
  display: flex;
  align-items: center;
  margin: 1rem 0 0.1rem 0.5rem;
  font-weight: bold;
}
.sidebar-user-info h4 {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.sidebar-user-info i {
  font-size: 0.5rem;
}

/* .sidebar-user-info-additional {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: white;
}
.sidebar-user-info-additional i {
  color: green;
  font-size: 0.5rem;
  padding-right: 0.3rem;
} */
.sidebar-user-info h4 {
  text-transform: uppercase;
}
.user-edit-icon {
  position: absolute;
  top: 0;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border: 0.1rem solid white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.user-edit-icon-actual {
  background-color: white;

  height: 4px;
}
</style>
