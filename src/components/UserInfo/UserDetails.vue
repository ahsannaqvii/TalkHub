<template>
  <section class="right-sidebar">
    <section class="right-sidebar-header">
      <article class="right-sidebar-header-details">
        <h4 class="right-sidebar-header-name">Profile</h4>
      </article>
      <v-icon @click="ToggleSideBar()" class="right-sidebar-header-icon"
        >mdi-window-close</v-icon
      >
    </section>
    <!-- Displays the initials of User name-->
    <avatar
      class="right-sidebar-about-image"
      :fullname="this.userData.name"
      radius="10"
      size="150"
      color="#2eb67d"
    ></avatar>

    <section class="right-sidebar-about">
      <article class="right-sidebar-about-details">
        <p>{{ this.userData.name }}</p>
        <caption class="right-sidebar-about-position">
          Frontend Intern
        </caption>
      </article>
    </section>
    <section class="right-sidebar-specific">
      <article class="right-sidebar-specific-details">
        <h6>Display Name</h6>
        <h5>{{ this.userData.name }}</h5>
      </article>
      <article class="right-sidebar-specific-details">
        <h6>Local Time</h6>
        <h5>{{ timestamp }}</h5>
      </article>
      <article class="right-sidebar-specific-details">
        <h6>Email Address</h6>
        <h5 class="right-sidebar-details">{{ this.userData.email }}</h5>
      </article>
      <article class="right-sidebar-specific-channel-details">
        <h6>Channels</h6>

        <ul>
          <li
            class="right-sidebar-channel-details"
            v-for="channel in userChannels"
            :key="channel.id"
          >
            # {{ channel.name }}
          </li>
        </ul>
      </article>
    </section>
  </section>
</template>

<script>
import Avatar from "vue-avatar-component";
import { mapGetters } from "vuex";

export default {
  methods: {
    ToggleSideBar() {
      this.$emit("ToggleSideBar", false);
    },
  },
  data() {
    return {
      timestamp: "",
    };
  },
  name: "UserDetails",

  props: ["userData"],
  mounted() {
    //Get the timestamp
    const date = new Date();
    this.timestamp = date.toLocaleTimeString([], {
      hourCycle: "h23",
      hour: "2-digit",
      minute: "2-digit",
    });
  },
  //Component used to get the image Initials from name.
  components: { Avatar },
  computed: mapGetters({ userChannels: "publicChannels" }),
};
</script>

<style>
.right-sidebar {
  overflow: auto;
}
.right-sidebar-header {
  display: flex;
  border-bottom: 1px solid #ccc;
  align-items: center;
}
.right-sidebar-header-details {
  text-align: justify;
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0.1rem 0.5rem;
}
.right-sidebar-header-details h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.right-sidebar-about-image {
  margin-top: 20px;
}
.right-sidebar-header-icon {
  margin-left: auto;
  color: white;
  margin-right: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
}
.right-sidebar-about {
  margin-bottom: 1rem;
}

.right-sidebar-about {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1rem;
  padding: 0.9375rem 0.3125rem 0.625rem 0.3125rem;
  border-bottom: 0.5px solid #ccc;
}
.right-sidebar-about-details {
  display: flex;
  text-align: justify;
  flex-direction: column;
  color: black;
  padding: 0.5rem;
  margin-right: 1rem;
}
.right-sidebar-about-details p {
  font-size: larger;
  font-weight: bolder;
  color: black;
}
.right-sidebar-about-position {
  color: grey;
}
.right-sidebar-specific {
  text-align: justify;
  margin-left: 10px;
}
.right-sidebar-specific-details {
  margin-bottom: 20px;
}
.right-sidebar-details {
  color: #1face2;
}
.right-sidebar-channel-details {
  font-size: 12px;
  font-weight: bolder;
  color: #1face2;
}
</style>
