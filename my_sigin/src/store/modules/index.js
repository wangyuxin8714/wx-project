const state={
    longitude: '113.324520',
    latitude: '23.099994',
    time:"2019-06-08 22:20",
    hours : [],
    minutes : [],
    days : [],
    date : new Date()
}

const getters = {

}
//异步
const actions={
    getLocation({commit}, payload){
        wx.getLocation({
            type: 'wgs84',
            success (res) {
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
    getTimes(state,payload){
        for (let i = state.date.getDate(); i <=31; i++) {
            state.years.push(i)
        }
        for (let i = state.date.getHours() ; i <= 24; i++) {
            state.hours.push(i)
        }
        for (let i = state.date.getMinutes() ; i <= 60; i++) {
            state.minutes.push(i)
        }
        console.log(state.years)
    }
    // bindChange(state,payload) {
    //     const val = e.detail.value
    //     this.setData({
    //       year: this.data.years[val[0]],
    //       month: this.data.months[val[1]],
    //       day: this.data.days[val[2]]
    //     })
    // }
}


export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}