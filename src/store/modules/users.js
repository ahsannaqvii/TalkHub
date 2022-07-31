import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
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
        // console.log(state)
        context.commit('SET_USER',user)
    },
    
    async fetchChannels(context){
        // TODO:USE THESE  ALL CONDITIONS IN COMPONENTS , DOESNT LOOOK FUNCTIONAL IN VUEX STORE 
        const tempArr=[]
        const response = await axios.get('http://localhost:3001/channels')
        const data=response.data
        // console.log(data)
        

        this.tempArr=[]
        // TODO:FIND AN EASIER WAY TO DO THIS 
        for ( var i=0; i<data.length ;i++){
            const len=data[i].users.length
            for(var j=0;j<len;j++){
                if(data[i].users[j].email===state.currentUser.email){
                    if(tempArr.indexOf(data[i].name) ===-1){  //value not found
                        tempArr.push(data[i].name)
                        // console.log(tempArr)
                        
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
        // console.log(obj)
        const {users}=obj
        // console.log(users)
        //returns a new array with common Channel
            const response=await axios.get(`http://localhost:3001/channels?q=${obj.name}`)
            if(!response.data.length){
                //If the user object exists , we will convert that to arr 
                if(obj.users && !Array.isArray(obj.users)) obj.users=[obj.users]
    
                const res=await axios.post('http://localhost:3001/channels',obj)
                context.commit('ADD_NEW_CHANNEL',res.data)
            }
            else{
                if(!obj.isDirect){
                    // console.log('ELSE WORKING')
                    const newLength=response.data[0].users.push(users)
                    console.log(newLength)
                    // const data=response.data[0] //OBJECT.
                    // console.log(response.data[0])
                    try{    
                    const res=await axios.put(`http://localhost:3001/channels/${response.data[0].id}`,response.data[0])
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
        // console.log("USER'S CURRENT CHANNEL IN USERS.JS" , currChannel)
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

//THIS SHALL BE NAMED EXPORTS NOT DEFAULT BECAUSE DEFAULT TOU AIK HI HUTA HAI .
export  {
    state,
    getters,
    actions,
    mutations,
}
    
