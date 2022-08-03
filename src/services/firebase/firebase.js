import { ref, getDatabase, get, child } from "firebase/database";
import { set, push, onValue } from "firebase/database";

// Get the database reference , take options as params , if onlyValues : true , tou sirf Object.values dedo
//else sarey onlyValues : false tou return snapshot.val()
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
      callback(messages);
    }
  });
}

// @Params : databaseParentKey represent the DB parent key
// TODO:write a query to DB-night

export async function getDataFromFirebase(databaseParentKey) {
  //Get the database reference from firebase.
  const databaseRef = ref(getDatabase());
  //   console.log(databaseParentKey);

  try {
    //Returns the child data of parent eg : "Channels/" , "Messages/"
    const snapshot = await get(child(databaseRef, databaseParentKey));
    if (!snapshot.exists()) return null;
    // console.log(snapshot.val());
    const data = snapshot.val();
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
    ``;
  });
}
// @Params : databaseParentKey represent the DB parent key
//@Params : newChannelData refers to the new data to be added into DB.
export async function setDataInFirebase(databaseParentKey, newChannelData) {
  const db = getDatabase();

  //Get the database reference to parent node.
  const databaseRef = ref(db, databaseParentKey);
  if (!newChannelData.isDirect) {
    //Push the data using push() which would create an Unique ID as key and insert the child data.
    const childData = push(databaseRef);
    // if(newChannelData )
    return await set(childData, newChannelData);
  } else {
    console.log("ye chala?");

    return await set(ref(db, databaseParentKey), newChannelData);
  }
}
