<template>
    <div class="wrap">
        <main>
           <QQMap></QQMap>
        </main>
        <footer>
           <div class="location">
             <img src="../../../static/images/location.png" alt="">
           </div>
           <div class="my" @click="gopersonal">
             <img src="../../../static/images/logo.png" alt="">
           </div>
          <button type="default" @click="goaddinter" open-type="getUserInfo" lang="zh_CN" @tap="goAdd" bindgetuserinfo="onGotUserInfo">添加面试</button>
        </footer>
    </div>
</template>

<script>
import QQMap from "@/components/qqMap"
export default {
  data () {
    return {
      
    }
  },

  components: {
    QQMap
  },

  methods: {
    goaddinter(){
      // wx.navigateTo({url: '/pages/addinterview/main'})
    },
    gopersonal(){
      wx.navigateTo({url: '/pages/personal/main'})
    },
    goAdd(){
       // 查看是否授权
      wx.getSetting({
        success (res){
          
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              
            wx.getUserInfo({
              success: function(res) {
                console.log(res)
              }
            })
          }else{
            调用授权接口
            wx.authorize({
              scope: 'scope.userLocation',
              success:(res)=>{
                console.log(res)
                // /.getUserInfo();//获取用户信息 调用前需要 用户授权
              },
              fail:(res)=>{
                console.log("error",res)
                // /.openSetting();//调用设置界面

              }
            })
          }
        }
      })
      // wx.navigateTo({ url: '/pages/sign/add/main' });
    }
  },

  created () {
    
  }
}
</script>

<style scoped>
.location{
  width: 80rpx;
  height: 80rpx;
  position: fixed;
  bottom: 80px;
  left: 10px;
  border-radius: 50%;
}

.my{
  width: 80rpx;
  height: 80rpx;
  position: fixed;
  bottom: 80px;
  right: 15px;
  border-radius: 50%;
  background: #000;
  overflow: hidden;
}
img{
  width: 100%;
  height: 100%;
}
.wrap{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
main{
  flex: 1;
}
footer{
  width: 100%;
  height: 50px;
}
button{
  width: 100%;
  height: 100%;
  background: #000;
  color: #fff;
  border-radius: 0;
  font-size: 20px;
}
</style>
