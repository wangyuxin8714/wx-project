<template>
    <div class="wrap">
        <div class="pon"> 
          <p><img src="../../../static/images/logo.png" alt=""></p>
          <span>{{phone}}</span>
        </div>
        <ul>
          <li @click="golist">
            <icon type="waiting"></icon>
            <label>我的面试</label>
            <img src="../../../static/images/arrow.svg" alt="">
          </li>
        </ul>
        <button>
          <icon type="info"></icon>
          <label>客服中心</label>
          <img src="../../../static/images/arrow.svg" alt="">
        </button>
        <div v-if="!hasPhone">
          <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
        </div>
        <button v-if="showSetting" open-type="openSetting">打开设置页</button>
    </div>
</template>

<script>
import {encryptData} from '@/services/user'
export default {
  data () {
    return {
      hasPhone: false,
      showSetting: false,
      phoneNumber: ''
    }
  },

  components: {
    
  },
  computed:{
    phone(){
      return this.phoneNumber=this.hasPhone?this.phoneNumber.slice(0,3)+"****"+this.phoneNumber.slice(7):"***********"
    }
  },
  methods: {
    golist(){
      wx.navigateTo({url: '/pages/interviewlist/main'})
    },
    async getPhoneNumber(e){
      console.log('e...', e, e.target.errMsg)
      if (e.target.errMsg != "getPhoneNumber:fail user deny"){
        // 1.2.1 用户授权成功
        let data = await encryptData({
          encryptedData: e.target.encryptedData,
          iv: e.target.iv
        })
        this.hasPhone = true;
        this.phoneNumber = data.data.phoneNumber

      }else{
        // 1.2.2 用户授权失败, 打开设置页面
        this.showSetting = true;
      }
    }
  },

  created () {
    let that = this;
    // 1.获取已授权状态
    wx.getSetting({
        success (res) {
        console.log('auth...', res.authSetting)
        if (res.authSetting['scope.userInfo']){
          // 1.1 用户已经授权
          wx.getUserInfo({
            withCredentials: true,
            success(res){
              // 1.1.1 调用api获取用户信息
              console.log("yonghu",res)
              that.hasPhone = true;
              console.log('userInfo...', res);
            }
          })
        }else{
          // 1.2 用户没有授权
          that.hasPhone = false;
        }
      }
    })
    
  },
  
}
</script>

<style scoped>

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
  padding:20rpx;
  border-radius:50%;
}
.pon p img{
  width:90%;
  height:90%
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
