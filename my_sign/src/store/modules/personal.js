import {authenticate} from "../../services/user"
const state={
    
}

const getters = {

}
//异步
const actions={
    async authenticate({commit},payload){
        let data=await authenticate(payload)
        console.log(data)
        return data
    }
    
}
//同步
const mutations={
    

}


export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}