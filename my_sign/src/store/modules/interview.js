import {addview,getview,getdetail} from "../../services/user" 
const moment=require("moment")
const state={
    address:{},
    current:{
        company:"",
        address:{},
        start_time:"",
        phone:"",
        form_id:"",
        description:""
    },
    viewlist:[],
    listdetail:{}
}

const getters = {
    
}
//异步
const actions={

    async addview(state, payload){
        return new Promise(async (resolve, reject)=>{
            // console.log(state.address,payload)
            payload.latitude=payload.address.location.lat,
            payload.longitude=payload.address.location.lng
            payload.address=JSON.stringify(payload.address)
            // console.log(payload)
            let result = await addview(payload);
            // console.log(result)
            resolve(result);
        })
    },
    
    async getview({state,commit},payload){

        let data=await getview(payload)
        // console.log(data)
        commit("getview",{data:data.data,page:payload.page})
        
    },
    async getdetail({commit}, payload){
        return new Promise(async (resolve, reject)=>{
            let result = await getdetail(payload);
            commit("getdetails",result.data)
            resolve(result);
        })
    },

    
}
//同步
const mutations={
    updateaddress(state,payload){
        state.current.address=payload
        state.address={
            latitude:payload.location.lat,
            longitude:payload.location.lng
        }
    },
    getview(state,payload){
        if(payload.page===1){
            state.viewlist=payload.data
        }else{
            state.viewlist=[...state.viewlist,...payload.data]
        }
        // console.log('getview',state.viewlist)
        state.viewlist.map(item=>{
            if(item.address.includes("{")){
                item.address=JSON.parse(item.address).address
                item.start_time=moment(+item.start_time).format('YYYY-MM-DD HH:mm')
            }
        })
    },
    getdetails(state,payload){
        state.listdetail={...state.listdetail,...payload}
        state.listdetail.address=JSON.parse(state.listdetail.address).address
        state.listdetail.start_time=moment(+state.listdetail.start_time).format('YYYY-MM-DD HH:mm')

    }



}


export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}