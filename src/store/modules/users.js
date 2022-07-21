import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)
const state ={
    currentUser:null,
    currentChannel:{
        "channelName": "Whereabouts",
        "id": 2
    },
    userChannels:[],
 }

const getters={
    currentUser:(state) =>state.currentUser ,
    userChannels:(state)=>state.userChannels ,
    currentChannel:(state)=>state.currentChannel
}

const actions  = {
    setUser(context,user){
        context.commit('SET_USER',user)
    },
  
    async fetchChannels(context){

        state.userChannels=[]
        const response = await axios.get('http://localhost:3001/channels')
        const data=response.data
        console.log(data)
        //ISKI SETTING KARNI PAREGI
        for ( var i=0; i<data.length ;i++){
            for(var j=0;j<data.length;j++){
                if(data[i].users[j].email===state.currentUser.email){
                    context.commit('SET_USER_CHANNELS', {
                        channelName:data[i].channelName,id:data[i].id
                    } )
                }
                else{
                    continue
                }
            }
        }
        
    },
    async setChannelinDatabase(context,obj){
        const {users}=obj
        const response=await axios.get(`http://localhost:3001/channels?q=${obj.channelName}`)//returns a new array with common Channel

        // PROBLEM ::         HANDLE IF updatedData IS NULL.
        console.log(typeof(response.data))  
         const newLength=response.data[0].users.push(users)
         console.log(newLength)
         const data=response.data[0] //OBJECT.
        try{    
          const res=await axios.put(`http://localhost:3001/channels/${response.data[0].id}`,data)
        context.commit('ADD_NEW_CHANNEL',res.data)
        }catch(e){
            console.log(e.message)
        }
        
    },
    setCurrentChannel(context,currChannel){
        console.log("USER'S CURRENT CHANNEL IN USERS.JS" , currChannel)
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
        const {channelName,id}=channel
        state.userChannels.push({name:channelName,id:id})
        
    },
    SET_CURRENT_CHANNEL:function(state,CurrChannel){
        state.currentChannel=CurrChannel
    }


}

//THIS SHALL BE NAMED EXPORTS NOT DEFAULT BECAUSE DEFAULT TOU AIK HI HUTA HAI .
export  {
    state,
    getters,
    actions,
    mutations,
}
    
