<template>
    <div class="wrap">
        <main>
           <QQMap></QQMap>
        </main>
        <footer>
           <div class="location" @click="location">
             <img src="../../../static/images/location.png" alt="">
           </div>
           <div class="my" @click="gopersonal">
             <img src="../../../static/images/logo.png" alt="">
           </div>
          <button type="default" @click="goaddinter"  lang="zh_CN">添加面试</button>
        </footer>
    </div>
</template>

<script>
import QQMap from "@/components/qqMap"
import {mapState,mapActions} from "vuex"
export default {
  data () {
    return {
      
    }
  },

  components: {
    QQMap
  },

  methods: {
    ...mapActions({
      getLocation:"index/getLocation"
    }),
    goaddinter(){
      wx.navigateTo({url: '/pages/addinterview/main'})
    },
    gopersonal(){
      wx.navigateTo({url: '/pages/personal/main'})
    },
    location(){
      this.getLocation()


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
