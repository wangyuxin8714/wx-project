import {updatedetail} from "../../services/user"
const state={
    
}

const getters = {

}
//异步
const actions={
    updatedetail({commit},payload){
        updatedetail(payload).then(res=>{
            console.log(res)
        })
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