<template>
    <div class="wrap">
        <main>
           <QQMap :markers="markers" :updateDistance="updateDistance"></QQMap>
        </main>
        <footer>
          <button type="default" @click="godetail">打卡</button>
        </footer>
    </div>
</template>

<script>
import QQMap from "@/components/qqMap"
import {mapState,mapActions} from "vuex"
export default {
  data () {
    return {
      distance: 0
    }
  },

  components: {
    QQMap
  },
  computed: {
    ...mapState({
      info: state => state.interview.listdetail
    }),
    distance(){
      return getDistance(this.info.latitude, this.info.longitude, )
    },
    markers(){
      if (this.info && Object.keys(this.info)){
        return [{
          iconPath: '/static/images/job.png',
          latitude: this.info.latitude,
          longitude: this.info.longitude,
          title: this.info.company,
          width: 20,
          height: 20
        }]
      }else{
        return []
      }
    }
  },
  methods: {
    godetail(){
        wx.navigateTo({url: '/pages/interviewlist/main'})      
    },
    ...mapActions({
      updateDetail: 'update/updateDetail'
    }),
    // 点击标注物
    marketTap(e){

    },
    updateDistance(distance){
      // console.log('distance...', distance);
      this.distance = distance;
    },
    async godetail(){
      let distance = this.distance;
      if (this.distance < 100){
        let result = await this.updateDetail({
          id: this.info.id,
          params: {
            status: 0,
            sign_time: +new Date()
          }
        })
        // console.log('result...', result);
        wx.showToast({
          title: '打卡成功', //提示的内容,
          icon: 'none' //图标,
        });
        wx.navigateTo({url: '/pages/interviewlist/main'})    
      }else{
          if (this.distance > 1000){
            distance = (this.distance/1000).toFixed(2)+'公里'
          }else{
            distance = this.distance+'米'
          }
          // console.log('distance...', distance, this.distance);
          wx.showToast({
            title: `你距目的地还有${distance},暂时还不能打卡`, //提示的内容
            icon: 'none'
          });
      }
    }

  },

  created () {

  },
  async onShow(){
    // 修改标题
    wx.setNavigationBarTitle({ title: '打卡: '+this.info.company });
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
