import {addview,getview,getdetail} from "../../services/user" 

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
    
    getview({commit},payload){
        getview(payload).then(res=>{
            console.log(res)
            commit("getview",res)
        })
    },
    getdetail({commit}, payload){
        getdetail(payload).then(res=>{
            console.log(res)
            commit("getdetails",res.data)
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
        state.viewlist=payload.data
        state.viewlist.map(item=>{
            item.address=JSON.parse(item.address).address
            item.start_time=new Date(Number(item.start_time)).toLocaleString()
        })
    },
    getdetails(state,payload){
        state.listdetail={...state.listdetail,...payload}
        state.listdetail.address=JSON.parse(state.listdetail.address).address
        state.listdetail.start_time=new Date(Number(state.listdetail.start_time)).toLocaleString()
        console.log(state.listdetail)
    }



}


export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}