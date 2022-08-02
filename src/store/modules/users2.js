import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import * as firebase from '@/services/firebase/Channels';

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
        // TODO:USE THESE  ALL CONDITIONS IN COMPONENTS , DOESNT LOOOK FUNCTIONAL IN VUEX STORE 
        const tempArr=[]
        firebase.getChannels('Channels/')
        const response = await axios.get('http://localhost:3001/channels')

        const data=response.data
        this.tempArr=[]
        // TODO:FIND AN EASIER WAY TO DO THIS 
        for ( var i=0; i<data.length ;i++){
            const len=data[i].users.length
            for(var j=0;j<len;j++){
                if(data[i].users[j].email===state.currentUser.email){
                    if(tempArr.indexOf(data[i].name) ===-1){  //value not found
                        tempArr.push(data[i].name)                        
                            context.commit('SET_USER_CHANNELS', {
                                ...data[i]
                            })
                    }       
                }
                else{
                    continue
                }
            }
        }
    },
    async setChannelInDatabase(context,obj){
        const {users}=obj
        console.log(obj)
            //returns a new array with common Channel--COMMENT THIS CODE IF FIREBASE WORKS
            const response=await axios.get(`http://localhost:3001/channels?q=${obj.name}`)
            
            //Returns if a channel is present or not.
            const channelPresent=firebase.getChannels("Channels/",obj.name)
            console.log(channelPresent)
            //If channel is not present
            if(!channelPresent){
                if(obj.users && !Array.isArray(obj.users)) obj.users=[obj.users]
                //--------------------------------------------------------------------
                // THIS POST IS WORKING WITH FIREBASE IN REPLACEMENT FOR AXIOS.POST
                const result=firebase.setChannels("Channels/",obj)
                console.log(result)
                 //--------------------------------------------------------------------
                //  --COMMENT THIS CODE IF FIREBASE WORKS
                const res=await axios.post('http://localhost:3001/channels',obj)
                console.log(res.data)
                context.commit('ADD_NEW_CHANNEL',res.data)
            }
            // if(!response.data.length){
                //If the user object exists , we will convert that to arr 
             
            // }
            else{
                if(!obj.isDirect){
                    const newLength=response.data[0].users.push(users)
                    console.log(newLength)
                    try{    
                    const res=await axios.put(`http://localhost:3001/channels/${response.data[0].id}`,response.data[0])
                    console.log(res.data)
                    context.commit('ADD_NEW_CHANNEL',res.data)
                    }catch(e){
                        console.log(e.message)
                    }
                }
                else{
                    context.commit('ADD_NEW_CHANNEL',obj)

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
    SET_USER_CHANNELS:function(state,channelData){
        state.userChannels.push(channelData)
        
    },
    ADD_NEW_CHANNEL:function(state,channel){
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
    
