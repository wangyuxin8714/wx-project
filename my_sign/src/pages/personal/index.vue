<template>
    <div class="wrap">
        <div class="pon"> 
          <p><img src="../../../static/images/logo.png" alt=""></p>
          <span>31135416354</span>
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
    </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },

  components: {

  },

  methods: {
    golist(){
      wx.navigateTo({url: '/pages/interviewlist/main'})
    }

  },

  created () {
    
  }
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
