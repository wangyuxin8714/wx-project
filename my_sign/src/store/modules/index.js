const state={
    longitude: '113.324520',
    latitude: '23.099994',
    openid:{}
}

const getters = {

}
//异步
const actions={
    getLocation({commit}, payload){
        wx.getLocation({
            type: 'wgs84',
            success (res) {
                console.log(res)
                commit('updateLocation', res)
            }
        })
    },
  
    
}
//同步
const mutations={
    updateLocation(state, payload){
        state.longitude = payload.longitude
        state.latitude = payload.latitude
    },
    updateopenid(state,payload){
        state.openid={...state.openid,...payload}
        // console.log(state.openid)
    }

}


export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}