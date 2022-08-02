//all setter getters will of firebase will be here . 
//get a generic function to get entire data ( whether it be msgs , channels etc) 
//getData ( value , etc ) ie getData("GenericString"){}
import { ref, getDatabase, get ,child  } from "firebase/database";
import { set,  push } from "firebase/database";

// Get the database reference 
// export function getData (val,dataStorage){

//     const db=getDatabase()
//     const dataRef=ref(db,val)
//     console.log(dataRef)
//     onValue(dataRef,(snapshot)=>{
//         snapshot.forEach((childSnapshot)=>{
//             const childData=childSnapshot.val()
//             for(const key in childData) {
//                 //This is what I want but I want it wrt to CHANNELID . (cater it ) and ask momin bhai if its okay
//                 //to use for loops in here or we can shorten it.
//                 // console.log(childData[key])
//                 dataStorage.push(childData[key])

//             } 
//         })
//     })
// }
//CREATE ANOTHER FUNCTION FOR ONVALUE() MESSAGES KELIYE 
//YOU CAN GIVE THE OPTIONS PARAMS TO DECIDE TILL WHICH DEPTH TO GO

// @Params : databaseParentKey represent the DB parent key 
export async  function getDataFromFirebase(databaseParentKey){
    
    //temporary array to store the channels from database.
    const channels=[]

    //Get the database reference from firebase.
    const databaseRef = ref(getDatabase());
    
    try{
        //Returns the child data of parent : "Channels/"
        const snapshot=await get(child(databaseRef,databaseParentKey))

            if(snapshot.exists()){
                channels.push(snapshot.val())
            }

    }catch(e){
        console.error(e.message)
    }
    return channels;
   

}
//create addData() function for overwriting existing data.

export async function updateExistingChildData(databaseParentKey,DataToUpdate){
    
    const db=getDatabase()

    const databaseRef=ref(db,databaseParentKey)
    const res = await set(databaseRef,DataToUpdate).catch(e=>{console.log(e.message)})

    console.log(res)
}
export async function setDataInFirebase(databaseParentKey,dataValue){

    const db=getDatabase()

    //Get the database reference to parent node.
    const databaseRef=ref(db,databaseParentKey)

    //Push the data using push() which would create an Unique ID as key and insert the child data.
    const childData=push(databaseRef)

    return await  set(childData,dataValue)

}






