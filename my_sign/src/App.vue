<script>
import request from "./utils/request"
import {getAuth,getLocation} from "./utils"
import {mapMutations} from "vuex"
import {login} from "./services/user"
export default {
  methods: {
    ...mapMutations[{
      updateopenid:"updateopenid"
    }]
  },
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }



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
