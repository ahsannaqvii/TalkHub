import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, getDatabase, get, child } from "firebase/database";
import { set, push, onValue } from "firebase/database";

//Function designed to get Stream  messages with callback
export function getStreamingData(
  databaseChildKey,
  callback,
  databaseParentKey
) {
  const db = getDatabase();
  const DataRef = ref(db, databaseParentKey + databaseChildKey);

  return onValue(DataRef, (snapshot) => {
    if (snapshot.val() !== null) {
      const messages = Object.values(snapshot.val());
      callback(messages, {
        totalMessagesCount: messages.length,
        currentChannelKey: snapshot.key,
      });
    }
  });
}

// @Params : databaseParentKey represent the DB parent key

export async function getDataFromFirebase(databaseParentKey) {
  //Get the database reference from firebase.
  const databaseRef = ref(getDatabase());

  try {
    //Returns the child data of parent eg : "Channels/" , "Messages/"
    const snapshot = await get(child(databaseRef, databaseParentKey));
    if (!snapshot.exists()) return null;
    const data = snapshot.val();
    console.log(data);
    return data;
  } catch (e) {
    console.error(e.message);

    //Write way to return errors :
    // return e
    // if(res instanceof Error) -- in the caller function.
  }
}

//Function used to append the user's list .
// @Params : databaseParentKey represent the DB parent key
//@Params : DataToUpdate refers to the new data to be added into DB.
export async function updateExistingChildData(databaseParentKey, DataToUpdate) {
  const db = getDatabase();

  const databaseRef = ref(db, databaseParentKey);
  await set(databaseRef, DataToUpdate).catch((e) => {
    console.log(e.message);
  });
}

// @Params : databaseParentKey represent the DB parent key
//@Params : newChannelData refers to the new data to be added into DB.
export async function pushDataFirebase(databaseParentKey, newChannelData) {
  const db = getDatabase();

  //Get the database reference to parent node.
  const databaseRef = ref(db, databaseParentKey);
  //Push the data using push() which would create an Unique ID as key and insert the child data.
  const res = await push(databaseRef, newChannelData);
  console.log(res.key);
  return res.key;
}

// Below functions are designed generically to cater the Google Sign in Providers and signInWithEmailAndPassword

export async function signInWithGoogleProvider() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const response = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(response);
    const token = credential.accessToken;
    console.log(token, " \n");

    // The signed-in user info.
    const user = response.user;
    return user;
  } catch (error) {
    // Handle Errors here.
    const errorMessage = error.message;

    console.log(errorMessage);
  }
}
export async function SignUpWithEmail(email, password) {
  try {
    const auth = getAuth();
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credential.user;
  } catch (err) {
    console.error(err.message);
  }
}
export async function SignInWithEmailPassword(email, password) {
  const auth = getAuth();
  try {
    const userDetails = await signInWithEmailAndPassword(auth, email, password);
    console.log(userDetails);
    const { user } = userDetails;
    return user;
  } catch (e) {
    console.log(e.message);
  }
}
