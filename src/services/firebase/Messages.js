import * as  firebase from "./firebase"
// Problem : Is is okay to have separate file for msgs and channels ? 
export function getMessages(Type,messages){
    firebase.getData(Type,messages)

}