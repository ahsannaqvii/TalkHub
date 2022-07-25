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
        // TODO:USE THESE  ALL CONDITIONS IN COMPONENTS , DOESNT LOOOK FUNCTIONAL IN VUEX STORE 
        const tempArr=[]
        console.log('work1')
        const response = await axios.get('http://localhost:3001/channels')
        const data=response.data
        console.log(data)

        this.tempArr=[]
        // TODO:FIND AN EASIER WAY TO DO THIS 
        for ( var i=0; i<data.length ;i++){
            const len=data[i].users.length
            for(var j=0;j<len;j++){
                if(data[i].users[j].email===state.currentUser.email){
                    if(tempArr.indexOf(data[i].channelName) ===-1){  //value not found
                        tempArr.push(data[i].channelName)
                        console.log(tempArr)
                            context.commit('SET_USER_CHANNELS', {
                                channelName:data[i].channelName,id:data[i].id
                            } )
                    }       
                }
                else{
                    continue
                }
            }
        }
        
    },
    async setChannelinDatabase(context,obj){
        const {users}=obj
        console.log(users)
        //returns a new array with common Channel
        const response=await axios.get(`http://localhost:3001/channels?q=${obj.channelName}`)
        if(response.data.length===0){
            console.log('IF WORKING')
            // TODO:FEELS LIKE THIS WORK IS REPETIVE , NEED TO SOLVE THIS. 

      
            const res=await axios.post('http://localhost:3001/channels',obj)
            context.commit('ADD_NEW_CHANNEL',res.data)


        }
        else{
            console.log('ELSE WORKING')

            const newLength=response.data[0].users.push(users)
            console.log(newLength)
            const data=response.data[0] //OBJECT.
            try{    
            const res=await axios.put(`http://localhost:3001/channels/${response.data[0].id}`,data)
            context.commit('ADD_NEW_CHANNEL',res.data)
            }catch(e){
                console.log(e.message)
            }
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
    
