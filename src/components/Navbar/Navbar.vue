<template>
  <div>
    <v-toolbar
      dark
      color="#350d36"
      clipped-left
      fixed
      app
      height="40px"
      class="header"
    >
      <v-list-tile-avatar>
        <img
          src="../../assets/slacklogo.png"
          height="20px"
          style="padding-right: 20px; margin-top: 7px"
        />
      </v-list-tile-avatar>
      <v-toolbar-title class="headline text-uppercase white--text">
        <span class="font-weight-light" style="font-size: 20px">SLACK</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="icons">
        <v-icon>mdi-magnify</v-icon>
      </div>
      <v-expand-x-transition>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search Slack"
          class="search-bar-input"
        />
      </v-expand-x-transition>
      <v-toolbar-items class="hidden-sm-and-down" transparent>
        <v-row justify="space-around">
          <v-menu bottom origin="center center" transition="scale-transition">
            <template v-slot:activator="{ on, attrs }">
              <!-- style="margin-left: 20px; margin-top: 17px" -->

              <v-avatar
                class="mr-10 user-img-wrapper"
                color="#FFFFFF"
                size="30"
                v-bind="attrs"
                v-on="on"
              >
                <img src="../../assets/avatar.jpg" />
              </v-avatar>
            </template>

            <v-list style="margin-top: 50px" width>
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>

        <v-btn
          depressed
          style="margin-left: 20px"
          color="#350d36"
          flat
          @click="logout"
          >Logout</v-btn
        >
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("signed out");
          this.$store.dispatch("setUser", null);
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error.messages);
        });
    },
  },
  name: "NavBar",
  data() {
    return {
      showSearchInput: true,
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
    };
  },
};
</script>

<style>
.code-red {
  color: red;
  border: 4px;
}
.header {
  width: 100%;
}
.search-bar-input {
  width: 31.25rem;
  height: 1.5rem;
  border: 0.1rem solid var(--slack-border-color);
  border-radius: 5px;
  background-color: rgb(67, 30, 68);
  padding-left: calc(30rem - 23rem);
  margin-right: 180px;
  box-shadow: inset 0 0 0 1px rgb(104, 74, 104);
  transition: all 0.5s ease-out;
}
.search-bar-input:focus {
  background-color: var(--slack-background);
  color: var(--slack-white);
}
.search-bar-input::placeholder {
  color: var(--slack-white);
}
.user-img-wrapper {
  margin-top: 17px;
}
.icons {
  display: flex;
  margin-right: 12px;
  align-items: center;
}
</style>
