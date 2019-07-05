import Vue from "vue"
import Vuex, { mapMutations } from "vuex"
// import createLogger from "vuex/dist/logger"

import index from "./modules/index"
import interview from "./modules/interview"
import update from "./modules/update"
import personal from "./modules/personal"


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        index,
        interview,
        update,
        personal
    },
    state:{
       info:{}
    },
    mutations:{
        updateinfo(state,payload){
            // console.log("payload",payload)
            state.info=payload
        }
    }
    // plugins:[createLogger()]
})