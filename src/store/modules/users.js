import Vue from 'vue'
import Vuex from 'vuex'
import {getChannels , updateChannels ,setChannels} from '@/services/firebase/Channels';
Vue.use(Vuex)
const state ={
    currentUser:null,
    currentChannel:{
        "name": "Whereabouts",
        "id": 2
    },
    userChannels:[],
 }

const getters={
    currentUser:(state) =>state.currentUser,
    userChannels:(state)=>state.userChannels,
    currentChannel:(state)=>state.currentChannel,
    publicChannels:(state)=>state.userChannels.filter((channel)=>!channel.isDirect)
}

const actions  = {
    setUser(context,user){
        context.commit('SET_USER',user)
    },
    
    async fetchChannels(context){ 
        const channelsList=await getChannels("Channels/",{specificChannel:false})
        
        //Iterate over the array of objects to find the common emails in user's list and current Logged in user email.
        channelsList.forEach((channel)=>{
            for(var key in channel){
                for(var key2 in channel[key].users){
                    if(channel[key].users[key2].email===state.currentUser.email){
                        // TODO:MOMIN BHAI HELP TO SEND PROPER ARGS 
                        context.commit('SET_USER_CHANNELS', {
                             tempChannel:channel[key],key
                        })
                    }
                }
            }
        })

        // const response = await axios.get('http://localhost:3001/channels')

        // const data=response.data
        // this.tempArr=[]
        // // TODO:FIND AN EASIER WAY TO DO THIS 
        // for ( var i=0; i<data.length ;i++){
        //     const len=data[i].users.length
        //     for(var j=0;j<len;j++){
        //         if(data[i].users[j].email===state.currentUser.email){
        //             if(tempArr.indexOf(data[i].name) ===-1){  //value not found
        //                 tempArr.push(data[i].name)                        
        //                     context.commit('SET_USER_CHANNELS', {
        //                         ...data[i]
        //                     })
        //             }       
        //         }
        //         else{
        //             continue
        //         }
        //     }
        // }
    },
    async setChannelInDatabase(context,newChannelData){
        const {users,name}=newChannelData 

        //Returns the information of specific channel based on 'NAME'
        const specificChannelData=await  getChannels( "Channels/",{name , specificChannel:true}  )

        //If channel is not present
        if(!specificChannelData){

            //If the user object exists , we will convert that to arr 
            if(newChannelData.users && !Array.isArray(newChannelData.users)) newChannelData.users=[newChannelData.users]
            
            //Firebase utility function to set channels in DB.

            // TODO:SETTLE THE ID PROBLEM FOR DIRECT MESSAGE 
            setChannels("Channels/",newChannelData)
            
            //Set new channel to userChannels list in vuexStore
            context.commit('ADD_NEW_CHANNEL',newChannelData) 

        }
            
         //Append the user's list if channel exists.
        else{
             //If the message is not private (one to one ):
            if(!newChannelData.isDirect){
                const newLength=specificChannelData.channel.users.push(users)
                console.log(newLength)

                
                updateChannels("Channels/" + specificChannelData.key , specificChannelData)
                context.commit('ADD_NEW_CHANNEL',specificChannelData) 

                }
                // If messagetype is 'Direct Message'
                else{
                    context.commit('ADD_NEW_CHANNEL',newChannelData)

                }
            }
            
        
    
        
    },
    setCurrentChannel(context,currChannel){
        context.commit('SET_CURRENT_CHANNEL',currChannel)
    }
}
const mutations ={
    SET_USER(state,user){
        state.currentUser=user
    },
        // TODO:SET THIS PARAMS 

    SET_USER_CHANNELS:function(state,{tempChannel}){
        state.userChannels.push(tempChannel)
        
    },
        // TODO:SET THIS PARAMS 

    ADD_NEW_CHANNEL:function(state,{channel}){
        state.userChannels.push(channel)
        
    },
    SET_CURRENT_CHANNEL:function(state,CurrChannel){
        state.currentChannel=CurrChannel
    }


}
export  {
    state,
    getters,
    actions,
    mutations,
}
    
