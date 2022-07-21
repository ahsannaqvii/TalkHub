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
                        <!-- style="background-color: #ecb22e" -->
                        <v-icon>fab fa-google-plus-g</v-icon>
                      </v-btn>
                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>fab fa-linkedin-in</v-icon>
                      </v-btn>
                    </div>
                    <h4 class="text-center mt-4">
                      Ensure your email for registration
                    </h4>
                    <v-form>
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="email"
                        type="text"
                        v-model.trim="email"
                        color="teal accent-3"
                      />

                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="lock"
                        type="password"
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
                <v-col cols="12" md="4" style="background-color: #880e4f">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Hello, Friend!</h1>
                    <h5 class="text-center">
                      Enter your personal details and start journay with us
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

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import Example from "@/components/example.vue";
export default {
  methods: {
    ...mapActions(["setUser", "fetchChannels"]),
    async login() {
      this.errors = [];

      if (this.isFormValid) {
        try {
          const auth = getAuth();
          const user = await signInWithEmailAndPassword(
            auth,
            this.email,
            this.password
          );
            console.log("login : ", user);
          this.setUser(user);
          // user
          this.fetchChannels(user);
          this.$router.push("/");
        } catch (err) {
          console.log(err.message);
          this.errors.push(err.message);
        }
      }
    },
    isFormValid() {
      if (this.email.length > 0 && this.password.length > 0) {
        return true;
      }
      return false;
    },
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    },
  },
  name: "LoginView",
  data: () => ({
    errors: [],
    step: 1,
    password: "",
    email: "",
  }),
  props: {
    source: String,
  },
  components: { Example },
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
