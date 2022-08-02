
import * as  firebase from "./firebase"

//@params : channelInfo consist of name of channel and specificChannel : true/false
export async function getChannels(databaseParentKey,channelInfo){

    const allChannels= await firebase.getDataFromFirebase(databaseParentKey)
    var specificChannel=""
    //Search for a specific  existing channel and return 
    if(channelInfo.specificChannel){
    //   debugger; //eslint-disable-line no-debugger
      allChannels.forEach(channel=>{
            for(let key in channel) 

                if(channel[key].name===channelInfo.name){
                    specificChannel={channel :channel[key] , key}
                    
                    break;
                }
    
        })
        return specificChannel

     }else{
        return allChannels
     }


}

// @Params : databaseParentKey refers to channels - > childKey 
// @Param2: newChannelData refers to the new set of channel Data to be set in DB
export async function setChannels(databaseParentKey,newChannelData){
   const response=await firebase.setDataInFirebase(databaseParentKey,newChannelData)
   console.log(response)
 
}

// @Params : databaseParentKey refers to channels - > childKey 
// @Param2: channel refers to the incoming data to be updated in the firebase along the respective keys 
export  function updateChannels(databaseParentKey ,{channel}){

  firebase.updateExistingChildData(databaseParentKey ,channel)

}

