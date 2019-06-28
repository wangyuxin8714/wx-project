<template>
    <div class="wrap">
        <main>
           <QQMap></QQMap>
        </main>
        <footer>
           <div class="location">
             <img src="../../../static/images/location.png" alt="">
           </div>
           <div class="my">
             <img src="../../../static/images/logo.png" alt="">
           </div>
          <button type="default">添加面试</button>
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
