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
                      style="color: #ecb22e"
                    >
                      Sign in to AI-Slack
                    </h1>
                    <div class="text-center mt-4">
                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>fab fa-facebook-f</v-icon>
                      </v-btn>

                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>fab fa-google-plus-g</v-icon>
                      </v-btn>
                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>fab fa-linkedin-in</v-icon>
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
                      style="background-color: #ecb22e"
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
                  <div class="error-ui-message" v-if="hasErrors">
                    <p v-for="error in errors" :key="error.id">{{ error }}</p>
                  </div>
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

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
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
    async login() {
      this.errors = [];
      console.log(this.$refs.form);

      if (!this.$refs.form.validate()) return;

      try {
        const auth = getAuth();
        const user = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        this.setUser(user);

        this.fetchChannels(user);
        this.$router.push("/");
      } catch (err) {
        console.error(err.message);
      }
    },
  },
};
</script>
<style scoped>
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
