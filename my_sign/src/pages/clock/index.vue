<template>
  <div class="wrap">
    <main>
      <QQMap :markers="markers" :updateDistance="updateDistance">
      </QQMap>
    </main>
    <footer>
      <button type="default" @click="godetail">打卡</button>
    </footer>
    <div class="my" @click="masktrue">
      <cover-image src="/static/images/course.png" />
    </div>
        <cover-view v-if="maskflag" class="btn">
          <cover-view class="mask">
            <cover-view class="mask_h3">路线规划</cover-view>
            <cover-view class="mask_ul">
              <cover-view class="mask_li" v-for="(item,index) in courses" :key="index">{{index+1}}.{{item.instruction}}</cover-view>
            </cover-view>
            <cover-view class="mask_span" @click="masktrue">确定</cover-view>
          </cover-view>
        </cover-view>
  </div>
</template>

<script>
import QQMap from "@/components/qqMap";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      distance: 0,
      courses: [],
      maskflag: true
    };
  },

  components: {
    QQMap
  },
  computed: {
    ...mapState({
      info: state => state.interview.listdetail
    }),
    distance() {
      return getDistance(this.info.latitude, this.info.longitude);
    },
    markers() {
      if (this.info && Object.keys(this.info)) {
        return [
          {
            iconPath: "/static/images/job.png",
            latitude: this.info.latitude,
            longitude: this.info.longitude,
            title: this.info.company,
            width: 30,
            height: 30
          }
        ];
      } else {
        return [];
      }
    }
  },
  methods: {
    masktrue() {
      this.maskflag = !this.maskflag;
    },
    godetail() {
      wx.navigateTo({ url: "/pages/interviewlist/main" });
    },
    ...mapActions({
      updateDetail: "update/updateDetail"
    }),
    // 点击标注物
    marketTap(e) {},
    updateDistance(distance) {
      // console.log('distance...', distance);
      this.distance = distance;
    },
    async godetail() {
      let distance = this.distance;
      if (this.distance < 100) {
        let result = await this.updateDetail({
          id: this.info.id,
          params: {
            status: 0,
            sign_time: +new Date()
          }
        });
        // console.log('result...', result);
        wx.showToast({
          title: "打卡成功", //提示的内容,
          icon: "none" //图标,
        });
        wx.navigateTo({ url: "/pages/interviewlist/main" });
      } else {
        if (this.distance > 1000) {
          distance = (this.distance / 1000).toFixed(2) + "公里";
        } else {
          distance = this.distance + "米";
        }
        // console.log('distance...', distance, this.distance);
        wx.showToast({
          title: `你距目的地还有${distance},暂时还不能打卡`, //提示的内容
          icon: "none"
        });
      }
    }
  },
  mounted() {
    this.$bus.$on("courses", courses => {
      this.courses = courses;
      console.log(this.courses);
    });
    this.maskflag = true;
  },
  created() {},
  async onShow() {
    // 修改标题
    wx.setNavigationBarTitle({ title: "打卡: " + this.info.company });
  }
};
</script>

<style scoped>
.my {
  width: 80rpx;
  height: 80rpx;
  position: fixed;
  bottom: 80px;
  right: 15px;
  overflow: hidden;
}
.btn {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
}
.mask {
  background: #fff;
  width: 70%;
  height: 70%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
}
.mask_h3 {
  height: 30px;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
}
.mask_ul {
  flex: 1;
  overflow-y: scroll;
}
.mask_li {
  line-height: 30px;
  font-size: 16px;
  padding: 0 10px;
  box-sizing: border-box;
}
.mask_span {
  height: 40px;
  text-align: center;
  border-top: 1px solid #ccc;
  line-height: 40px;
  background: limegreen;
}

.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
}
footer {
  width: 100%;
  height: 50px;
}
button {
  width: 100%;
  height: 100%;
  background: #000;
  color: #fff;
  border-radius: 0;
  font-size: 20px;
}
</style>
