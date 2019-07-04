<template>
    <div class="container">
        <map 
            id="map" 
            :longitude="longitude" 
            :latitude="latitude" 
            scale="14"  
            subkey="X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL"
            show-location 
            show-compass
            :circles="circle"
            :include-points="points"
            :markers="markers"
            @markertap="markertap"
            @regionchange="regionChange"
            style="width: 100%; height: 100%;">
        </map>
        <div class="location" @click="goCurrent">
             <cover-image class="location" @click="goCurrent" src="/static/images/location.png" />
             <!-- <img src="../../static/images/location.png" alt=""> -->
        </div>
    </div>
</template>
<script>
import QQMapWX from '@/utils/qqMap'
import {mapState,mapMutations,mapActions} from "vuex"
import {getLocation,getAuth} from "../utils/index"
import getDistance from '@/utils/distance.js'

export default {
    props:{
        reLocation: {
            type: Boolean,
            default: false
        },
        updateDistance: {
            typef: Function,
            default: ()=>{}
        },
        markers: {
            type: Array,
            default: []
        },
        markertap: {
            type: Function,
            default: ()=>{}
        },
        reginonChange: {
            type: Function,
            default: ()=>{}
        },
    },
    components:{
        
        },
    data(){
        return {
            longitude:40.03298,
            latitude:116.29891,
            distance: 0
        }
    },
    computed:{
        // ...mapState({
        //     longitude:state=>state.index.longitude,
        //     latitude:state=>state.index.latitude
        // }),
        points(){
            return [this.longitude,this.latitude, ...this.markers]
        },
        circle(){
            if (!this.markers.length){
                return []
            }else{
                return [{
                ...this.markers[0],
                color:  this.distance>100?'#C9394A': '#197DBF',
                fillColor: 'rgba(0,0,0, .3)',
                radius: 100,
                strokeWidth: 2
                }]
            }
        }
    },
    watch: {
        reLocation(){
            // 检测重新定位当前位置
            this.goCurrent();
        }
    },
    methods:{
        // ...mapActions({
        //     getLocation: 'index/getLocation'
        // }),
        ...mapMutations({
            updateLocation:"index/updateLocation"
        }),
        
        goCurrent(){
            const that=this
            getAuth('scope.userLocation', async ()=>{
                let location = await getLocation();
                // console.log("location....",location)
                this.location = location;
                that.longitude=1,
                that.latitude=2
                that.longitude=location.longitude,
                that.latitude=location.latitude
                // console.log(that.longitude,that.latitude)
                // console.log('scope.userLocation...', this.location, this.markers[0]);
                // 重新计算距离
                if (this.updateDistance){
                    this.distance = getDistance(this.location.latitude, this.location.longitude, this.markers[0].latitude, this.markers[0].longitude)
                    this.updateDistance(this.distance)
                }
            })
        }
    },
    created(){
        let qqmapsdk = new QQMapWX({
            key: 'X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL'
        });

        // this.getLocation();
    },
    mounted(){
        this.goCurrent();
    }
}
</script>
<style scoped lang="">
.container{
  height: 100%;
}
.location{
  width: 80rpx;
  height: 80rpx;
  position: fixed;
  bottom: 80px;
  left: 10px;
  border-radius: 50%;
}
img{
  width: 100%;
  height: 100%;
}
</style>