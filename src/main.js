import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
// import {firebase} from 'firebase'
import store from './store/store'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";



let firebaseConfig = {
  apiKey: "AIzaSyABlaJwF4eW2stPk1wtzxAV0H671_mVdso",
  authDomain: "slack-securiti.firebaseapp.com",
  projectId: "slack-securiti",
  storageBucket: "slack-securiti.appspot.com",
  messagingSenderId: "669245449801",
  appId: "1:669245449801:web:c245cac4ec67ba148e0198"
};
// const app=
const app=initializeApp(firebaseConfig);
const db=getDatabase(app);  

// window.firebase=firebase
Vue.config.productionTip = false
export{db}
const auth = getAuth();
const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {  //CONFUSION.
  // determine if the user is logged in or not and respond accordingly.

  store.dispatch('setUser',firebaseUser)
  
  new Vue({
    store,
    vuetify,  
    router,
    render: h => h(App)
  }).$mount('#app')
  
  unsubscribe()
})

