<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="left-sidebar-register">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Welcome Back!</h1>
                    <h5 class="text-center">
                      Enter your personal information to keep yourself connected
                      with us.
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <router-link
                      to="/login"
                      style="text-decoration: none; color: inherit"
                    >
                      <v-btn rounded outlined dark>SIGN IN</v-btn>
                    </router-link>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1
                      style="color: #350d36"
                      class="text-center display-2 text--accent-3"
                    >
                      Create Account
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
                        @click="RegisterWithGoogle"
                      >
                        <img src="../assets/google.jpg" height="40px" />
                      </v-btn>
                    </div>
                    <h4 class="text-center mt-4">
                      Ensure your email for registration
                    </h4>
                    <v-form ref="form">
                      <v-text-field
                        label="Name"
                        name="Name"
                        placeholder="Enter your name.."
                        prepend-icon="person"
                        type="text"
                        :rules="[rules.required]"
                        counter="25"
                        color="teal accent-3"
                        v-model.trim="name"
                      />
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="email"
                        placeholder="Enter your email.."
                        type="text"
                        :rules="[rules.required, rules.email]"
                        color="teal accent-3"
                        v-model.trim="email"
                      />

                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        required
                        prepend-icon="lock"
                        placeholder="Enter your password.."
                        type="password"
                        color="teal accent-3"
                        :rules="[rules.required, rules.passwordLength]"
                        v-model.trim="password"
                      />
                      <v-text-field
                        id="confirm-password"
                        label="Password"
                        name="password"
                        placeholder="Re-enter your password.."
                        prepend-icon="lock"
                        type="password"
                        color="teal accent-3"
                        v-model.trim="confirm_password"
                        :rules="[rules.required, rules.passwordLength]"
                      />
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-n5">
                    <v-btn rounded color="#350d36" dark @click="registerUser"
                      >SIGN UP</v-btn
                    >
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
import { updateProfile } from "firebase/auth";
import {
  RegisterWithEmailPassword,
  SignInWithGoogle,
} from "@/services/firebase/Users";

import { mapActions } from "vuex";
import { ref, getDatabase, set } from "firebase/database";
import rules from "@/services/rules/rules";

export default {
  props: {
    source: String,
  },
  data: () => ({
    step: 1,
    name: "",
    password: "",
    confirm_password: "",
    email: "",
    rules: rules,
  }),
  methods: {
    ...mapActions(["setUser"]),
    //Function designed to help users register with Google.
    async RegisterWithGoogle() {
      const user = await SignInWithGoogle();
      this.setUser(user);
      this.$router.push("/");
    },

    async registerUser() {
      this.errors = [];
      const db = getDatabase();
      if (!this.$refs.form.validate()) return;

      //Method to allow users to sign in with email and password.
      const user = await RegisterWithEmailPassword(this.email, this.password);

      //Firebase function to update profile.
      await updateProfile(user, { displayName: this.name });
      //Helper function to update data(User profile) in DB
      await this.saveUsersToUserRef(user, db);

      this.setUser(user);
      this.$router.push("/");
    },
    saveUsersToUserRef(user, db) {
      return set(ref(db, "Users/" + user.uid), {
        name: user.displayName,
        id: user.uid,
        email: user.email,
      });
    },
  },

  name: "RegisterView",
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
.left-sidebar-register {
  background-color: #350d36;
}
</style>
