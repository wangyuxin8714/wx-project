<script>
import request from "./utils/request"
import {getAuth,getLocation} from "./utils"
import {mapMutations} from "vuex"
import {login} from "./services/user"
export default {
  methods: {
    ...mapMutations({
      updateopenid:"index/updateopenid"
    })
  },
  created () {

    wx.login({
        success: async res=>{
          console.log('res...', res);
          let data = await login(res.code);
          console.log(data)
          this.updateopenid(data.data)
          wx.setStorageSync('openid', data.data.openid);
        }
      })

    getAuth('scope.userLocation', async ()=>{
      let location = await getLocation();
      wx.setStorageSync('location', location)
      console.log('location...', location);
    })



  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
