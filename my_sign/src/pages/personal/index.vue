<template>
    <div class="wrap">
        <div class="pon"> 
          <p><img :src="avatar" alt=""></p>
          <!-- <p><img src="../../../static/images/logo.png" alt=""></p> -->
          <span>{{phone}}</span>
        </div>
        <ul>
          <li @click="golist">
            <icon type="waiting"></icon>
            <label>我的面试</label>
            <img src="../../../static/images/arrow.svg" alt="">
          </li>
        </ul>
        <button @click="godialogue">
          <icon type="info"></icon>
          <label>客服中心</label>
          <img src="../../../static/images/arrow.svg" alt="">
        </button>
        <button @click="authenticates">
          <icon type="info"></icon>
          <label>生物认证</label>
          <img src="../../../static/images/arrow.svg" alt="">
        </button>
        <div v-if="!hasPhone" class="btn">
          <div v-if="showSetting" class="mask">
            <p>为了更好的使用我们的服务，我们需要获取你的手机号码</p>
            <button class="btn1"  open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">同意</button>
          </div>
          <div v-if="!showSetting" class="mask">
              <p>为了更好的使用我们的服务，我们需要获取你的信息</p>
              <button class='bottom btn1' type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">
                  授权登录
              </button>
          </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex"
import {encryptData} from '@/services/user'
export default {
  data () {
    return {
      hasPhone: false,
      showSetting: false,
      phoneNumber: '',
      avatar:""
    }
  },

  components: {
    
  },
  computed:{
    phone(){
      return this.phoneNumber=this.hasPhone?this.phoneNumber.slice(0,3)+"****"+this.phoneNumber.slice(7):"***********"
    }
  },
  onLoad(){
        var that = this;
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    that.showSetting = true;
                    wx.getUserInfo({
                        withCredentials: true,
                        success: function (res) {
                            // console.log(res)
                            let obj=JSON.parse(res.rawData)
                            // console.log(obj)
                            that.avatar=obj.avatarUrl
                            that.hasPhone = false;
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
    ...mapActions({
      authenticate:"personal/authenticate"
    }),
    async authenticates(){
      const that=this;
      wx.startSoterAuthentication({
        requestAuthModes: ['fingerPrint'],
        challenge: 'helloworld',
        authContent: '请用指纹解锁',
        success(res) {
          console.log('res...', res);
          let data = that.authenticate({
            openid:wx.getStorageSync('openid'),
            json_string:res.resultJSON,
            json_signature:res.resultJSONSignature
          })
          console.log("data",data)
          if(data.code===0){
            wx.showToast({
              title: '指纹验证成功',
              icon: 'none',
              duration: 1200
            })
          }else{
            wx.showToast({
              title: '指纹验证失败',
              icon: 'none',
              duration: 1200
            })
          }
        },
        fail(err) {
          console.log('err...', err);
        }
      })
    },
    godialogue(){
      wx.showModal({
        title: '模拟进入客服会话',
        content: '开发者工具暂不支持打开客服会话，请使用真机调试',
        showCancel:false,
        confirmText:"返回",
        confirmColor:"#ca654s",
      })
    },
    golist(){
      wx.navigateTo({url: '/pages/interviewlist/main'})
    },
    bindGetUserInfo(e){
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
          this.showSetting=true
          this.avatar=e.target.userInfo.avatarUrl
        }
    },
    async getPhoneNumber(e){
      console.log('e...', e, e.target.errMsg)
      if (e.target.errMsg != "getPhoneNumber:fail user deny"){
        // 1.2.1 用户授权成功
        let data = await encryptData({
          encryptedData: e.target.encryptedData,
          iv: e.target.iv
        })
        wx.showToast({
          title: '绑定手机号成功',
          icon: 'success',
          duration: 1500
        })
        this.hasPhone = true;
        this.showSetting = false;
        this.phoneNumber = data.data.phoneNumber

      }else{
        wx.showToast({
          title: '绑定手机号失败',
          icon: 'none',
          duration: 1500
        })
      }
    }
  },

  created () {
    // let that = this;
    // // 1.获取已授权状态
    // wx.getSetting({
    //     success (res) {
    //     console.log('auth...',res)
    //     if (res.authSetting['scope.userInfo']){
    //       // 1.1 用户已经授权
    //       wx.getUserInfo({
    //         withCredentials: true,
    //         success(res){
    //           // 1.1.1 调用api获取用户信息
    //           // console.log("yonghu",res)
    //           that.hasPhone = true;
    //           // console.log('userInfo...', res);
    //         }
    //       })
    //     }else{
    //       // 1.2 用户没有授权
    //       that.hasPhone = false;
    //     }
    //   }
    // })
    
  },
  
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
.wrap{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.pon{
  background:#f4f6f9;
  width:100%;
  height:350rpx;
  box-sizing:border-box;
  padding:50rpx 0;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around;
}
.pon p{
  width:100rpx;
  height:100rpx;
  background:#fff;
  text-align:center;
  /* padding:20rpx; */
  border-radius:50%;
  overflow: hidden;
}
.pon p img{
  width:100%;
  height:100%
}
ul li{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  box-sizing:border-box;
  padding:30rpx 40rpx;
  border-bottom:1rpx solid #eee;
}
li label{
  flex:1;
  margin-left:40rpx;
  color:#666;
  font-size:36rpx;
  background:transparent;
  text-align:left;
}
li img{
  width:40rpx;
  height:40rpx;
}
button{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  border: 0;
  border-radius: 0;
  box-sizing:border-box;
  padding:30rpx 40rpx;
  border-bottom:1rpx solid #eee;
  background: #fff;

}
button label{
  flex:1;
  margin-left:40rpx;
  color:#666;
  font-size:36rpx;
  background:transparent;
  text-align:left;
}
button img{
  width:40rpx;
  height:40rpx;
}
</style>
