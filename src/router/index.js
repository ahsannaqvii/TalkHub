import Vue from "vue";

import VueRouter from "vue-router";
import LoginView from "../views/Login.vue";
import RegisterView from "../views/Register.vue";
import slack from "../views/Slack.vue";
import { getAuth } from "firebase/auth";
// import ChannelChat from "../components/Channels/ChannelChat.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "slack",
    component: slack,

    beforeEnter(to, from, next) {
      const auth = getAuth();

      if (!auth.currentUser) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
  // {
  //   path: "/Channels/:channelID",
  //   name: "channel-chat", 
  //   props: true,
  //   component: ChannelChat,
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
