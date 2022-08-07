import Vue from "vue";

import VueRouter from "vue-router";
import LoginView from "../views/Login.vue";
import RegisterView from "../views/Register.vue";
import slack from "../views/Slack.vue";
// import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";

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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
