import Vue from "vue"
import Vuex, { mapMutations } from "vuex"
// import createLogger from "vuex/dist/logger"

import index from "./modules/index"
import interview from "./modules/interview"
import update from "./modules/update"


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        index,
        interview,
        update
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