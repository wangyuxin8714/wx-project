<template>
    <div class="wrap">
        <main>
           <QQMap :reLocation="reLocation"></QQMap>
        </main>
        <footer>
           
           <div class="my" @click="gopersonal">
             <cover-image src="/static/images/logo.png"/>
           </div>
          <button type="default" @click="goaddinter"  lang="zh_CN">添加面试</button>
        </footer>
        <div v-if="!hasPhone" class="btn">
          <div class="mask">
              <p>为了更好的使用我们的服务，我们需要获取你的信息</p>
              <button class='bottom btn1' type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">
                  授权登录
              </button>
          </div>
        </div>
    </div>
</template>

<script>
import QQMap from "@/components/qqMap"
import {mapState,mapActions} from "vuex"

import {encryptData} from '@/services/user'

export default {
  data () {
    return {
      reLocation: false,
      hasPhone: false,
      showSetting: false,
    }
  },

  components: {
    QQMap
  },
  onLoad(){
        var that = this;
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
              // console.log(res)
                if (res.authSetting['scope.userInfo']) {
                    that.hasPhone = true;
                    wx.getUserInfo({
                        withCredentials: true,
                        success: function (res) {
                            let obj=JSON.parse(res.rawData)
                            that.avatar=obj.avatarUrl
                        }
                    });
                }else{
                    // 1.2 用户没有授权
                    that.hasPhone = false;
                }
            }
        })
    },
  methods: {
    
    goaddinter(){
      wx.navigateTo({url: '/pages/addinterview/main'})
    },
    gopersonal(){
      wx.navigateTo({url: '/pages/personal/main'})
    },
    async bindGetUserInfo(e){
        if(e.target.errMsg==="getUserInfo:fail auth deny"){
          wx.showToast({
            title: '用户授权失败',
            icon: 'none',
            duration: 1200
          })
        }else{
          wx.showToast({
            title: '用户授权成功',
            icon: 'none',
            duration: 1200
          })
          this.hasPhone = true;
          this.avatar=e.target.userInfo.avatarUrl
        }
    },
    
  },

  created () {
    
  }
}
</script>

<style scoped>
.btn{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0,0,0,.3);
}
.mask{
  width:70%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.mask p{
  background: #fff;
  border-radius: 10px 10px 0 0;
  padding: 10px 5px;
  font-size: 17px;
  box-sizing: border-box;
  line-height: 1.5;
}
button.btn1{
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  background:#197dbf !important;
  color:#fff;
  border-radius:0 0 10px 10px;
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
