<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1
                      class="text-center display-2 text--accent-3"
                      style="color: #350d36"
                    >
                      Sign in to AI-Slack
                    </h1>
                    <div class="text-center mt-4">
                      <v-btn class="mx-2" depressed fab color="white">
                        <img
                          style="border-radius: 50px; border-style: none"
                          src="../assets/facebook.jpg"
                          height="58px"
                          width="58px"
                        />
                      </v-btn>

                      <v-btn
                        class="mx-2"
                        fab
                        color="white"
                        @click="signInWithGoogle"
                      >
                        <img src="../assets/google.jpg" height="40px" />
                      </v-btn>
                    </div>
                    <h4 class="text-center mt-4">
                      Ensure your email for registration
                    </h4>
                    <v-form ref="form">
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="email"
                        type="text"
                        v-model.trim="email"
                        :rules="[rules.required, rules.email]"
                        color="teal accent-3"
                      />
                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                        :rules="[rules.required, rules.passwordLength]"
                        v-model.trim="password"
                        color="teal accent-3"
                      />
                    </v-form>
                    <h3 class="text-center mt-4">Forgot your password ?</h3>
                  </v-card-text>
                  <div class="text-center mt-3">
                    <v-btn
                      rounded
                      style="background-color: #350d36"
                      dark
                      @click.prevent="login"
                      >SIGN IN</v-btn
                    >
                  </div>
                  <Example />
                </v-col>
                <v-col cols="12" md="4" style="background-color: #350d36">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Hello, Slackie!</h1>
                    <h5 class="text-center">
                      Register yourself with us and communicate with your
                      organization
                    </h5>
                  </v-card-text>

                  <div class="text-center">
                    <router-link
                      to="/register"
                      style="text-decoration: none; color: inherit"
                    >
                      <v-btn rounded outlined dark>SIGN UP</v-btn>
                    </router-link>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import rules from "@/services/rules/rules";
import {
  SignInWithGoogle,
  SignInWithEmailPassword,
} from "@/services/firebase/Users";

export default {
  name: "LoginView",
  data: () => ({
    step: 1,
    password: "",
    email: "",
    rules: rules,
  }),
  props: {
    source: String,
  },
  methods: {
    ...mapActions(["setUser", "fetchChannels"]),
    //Function designed to help users signin with Google.

    async signInWithGoogle() {
      const user = await SignInWithGoogle();
      this.setUser(user);
      this.$router.push("/");
    },
    //Function designed to help users login with email and password.
    async login() {
      this.errors = [];

      if (!this.$refs.form.validate()) return;
      const user = await SignInWithEmailPassword(this.email, this.password);
      console.log(user);
      this.setUser(user);
      this.fetchChannels(user);
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.googlesignin {
  background-color: orange;
  color: orange;
}
.error-ui-message {
  display: block;
  height: 50px;
  width: 400px;
  align-content: center;
  margin-left: 50px;
  text-align: center;
  background-color: #fff6f6;
  box-shadow: 0 0 0 1px #e0b4b4 inset, 0 0 0 0 transparent;
  margin-bottom: 50px;
  color: #9f3a38;
}
p {
  text-align: center;
}
</style>
