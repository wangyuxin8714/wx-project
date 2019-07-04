import {updatedetail} from "../../services/user"
const state={
    
}

const getters = {

}
//异步
const actions={
    updatedetail({commit},payload){
        updatedetail(payload.id,payload.data).then(res=>{
            console.log(res)
        })
    },
    // 更新面试状态
    updateDetail({commit,dispatch}, payload){
        return new Promise(async (resolve, reject)=>{
        let data = await updatedetail(payload.id, payload.params);
        if (data.code == 0){
            // 重新获取详情
            dispatch('update/interview/getDetail', payload.id);
        }
        resolve(data);
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