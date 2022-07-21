<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="teal accent-3">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Welcome Back!</h1>
                    <h5 class="text-center">
                      To Keep connected with us please login with your personnel
                      info
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 teal--text text--accent-3">
                      Create Account
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
                    <v-form>
                      <v-text-field
                        label="Name"
                        name="Name"
                        placeholder="Enter your name.."
                        prepend-icon="person"
                        type="text"
                        required
                        color="teal accent-3"
                        v-model.trim="name"
                      />
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="email"
                        placeholder="Enter your email.."
                        type="text"
                        required
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
                        v-model.trim="password"
                      />
                      <v-text-field
                        id="confirm-password"
                        label="Password"
                        name="password"
                        required
                        placeholder="Reenter your password.."
                        prepend-icon="lock"
                        type="password"
                        color="teal accent-3"
                        v-model.trim="confirm_password"
                      />
                      <v-file-input
                        v-model="files"
                        placeholder="Upload your documents"
                        label="File input"
                        multiple
                        prepend-icon="mdi-paperclip"
                        @change="checkFileURL"
                      >
                        <template v-slot:selection="{ text }">
                          <v-chip small label color="primary">
                            {{ text }}
                          </v-chip>
                        </template>
                      </v-file-input>
                    </v-form>
                  </v-card-text>
                  <div class="error-ui-message" v-if="hasErrors">
                    <p v-for="error in errors" :key="error.id">{{ error }}</p>
                  </div>
                  <div class="text-center mt-n5">
                    <v-btn
                      rounded
                      color="teal accent-3"
                      dark
                      @click="registerUser"
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
// import firebase from "firebase/compat/app";
// import { db } from "../main.js";
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// import {  onAuthStateChanged } from "firebase/auth";

// onValue
// child get
import { mapActions } from "vuex";
import { ref, getDatabase, set } from "firebase/database";

export default {
  methods: {
    ...mapActions(["setUser"]),

    async registerUser() {
      this.errors = [];

      const db = getDatabase();

      if (this.isFormValid()) {
        try {
          console.log("register");
          const auth = getAuth();
          const credential = await createUserWithEmailAndPassword(
            auth,
            this.email,
            this.password
          );
          const user = credential.user;

          console.log(user);
          //   //Since photoURl and display name is null so we need it to show up in slack.

          updateProfile(user, {
            displayName: this.name,
            photoURL: this.files[0].name,
          }).then(
            () => {
              this.saveUsersToUserRef(user, db).then(() => {
                this.setUser(user);
                this.files = [];
                this.$router.push("/");
              });
            },
            (error) => {
              console.log(error.message);
              this.errors.push(error.message);
            }
          );
        } catch (err) {
          console.log(err.message);
          this.errors.push(err.message);
        }
      }
    },
    saveUsersToUserRef(user, db) {
      return set(ref(db, "Users/" + user.uid), {
        name: user.displayName,
        avatar: this.files[0].name,
        email: user.email,
      });
    },
    isEmpty() {
      if (
        this.password.length == 0 ||
        this.email.length == 0 ||
        this.confirm_password.length == 0 ||
        this.name.length == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    PasswordValid() {
      if (
        this.password.length > 6 &&
        this.confirm_password.length > 6 &&
        this.password === this.confirm_password
      ) {
        return true;
      }
      return false;
    },
    checkFileURL() {
      console.log(this.files);
    },
    isFormValid() {
      if (this.isEmpty()) {
        this.errors.push("Empty fields not allowed!");
        return false;
      }
      if (!this.PasswordValid()) {
        this.errors.push(
          "Password length must be same and both passwords shall be same."
        );
        return false;
      }
      return true;
    },
  },

  name: "RegisterView",
  data: () => ({
    errors: [],
    step: 1,
    name: "",
    password: "",
    files: [],
    confirm_password: "",
    email: "",
  }),
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    },
  },
  props: {
    source: String,
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
// // // signOut(auth).then(() => { // // Sign-out successful. //
}).catch((error) => { // // An error happened. // }); // tempFunction() { //
console.log("WOKRING"); // // var usersRef1 = getDatabase.ref("users"); // //
console.log("LOVE" + usersRef1); // const db = getDatabase(); // // // const
ref=db.ref('/users') // // const reference = ref(db, "/users"); // //
console.log(reference); // // var adaRef = reference.parent("user1"); // // //
this.usersRef = reference; // // console.log(adaRef); // const dbref = ref(db);
// get(child(dbref, "/users")) // .then((snapshot) => { // if
(snapshot.exists()) { // console.log(snapshot.val.user1); // } else { //
alert("NO DATA FOUND"); // } // }) // .catch((err) => { //
console.log(err.message); // }); // },
