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
            :polyline="polyline"
            :circles="circle"
            :include-points="points"
            :markers="markers"
            @markertap="markertap"
            @regionchange="regionChange"
            style="width: 100%; height: 100%;">
        </map>
        <div class="location" @click="goCurrent">
             <cover-image class="location" @click="goCurrent" src="/static/images/location.png" />
        </div>
    </div>
</template>
<script>
import QQMapWX from '@/utils/qqMap'
import {mapState,mapMutations,mapActions} from "vuex"
import {getLocation,getAuth} from "../utils/index"
import getDistance from '@/utils/distance.js'
var coors;
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
            distance: 0,
            polyline:[]
        }
    },
    onLoad(){   
        var that =this;
        if(!this.markers.length){
            return
        }  
        wx.request({          
        url:"https://apis.map.qq.com/ws/direction/v1/driving/?from="+this.latitude+","+this.longitude+"&to="+this.markers[0].latitude+","+this.markers[0].longitude+"&output=json&callback=cb&key=X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL",
        success:function(res){  
            // console.log("res....",res)             
            coors = res.data.result.routes[0].polyline   
            that.$bus.$emit("courses",res.data.result.routes[0].steps)     
            for(var i=2; i< coors.length; i++) {                    
                coors[i]= coors[i-2]+ coors[i]/1000000              
            }                      
            //划线            
            var b=[];              
            for(var i=0; i< coors.length; i=i+2) {                 
                b[i/2]={latitude: coors[i],longitude:coors[i+1]};                            
            }            
            that.polyline= [{points: b,                        
                color:"#99FF00",                        
                width:5,                        
                dottedLine:false                    
            }]   
        }  
    }) 
    },
    computed:{
        ...mapState({
            longitude:state=>state.index.longitude,
            latitude:state=>state.index.latitude
        }),
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
                    radius: 10,
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
        ...mapMutations({
            updateLocation:"index/updateLocation"
        }),
        
        goCurrent(){
            // console.log("marker",this.markers)
            const that=this
            getAuth('scope.userLocation', async ()=>{
                let location = await getLocation();
                // console.log("location....",location)
                this.location = location;
                this.updateLocation({longitude:1,latitude:1})
                this.updateLocation(location)
                // console.log('scope.userLocation...', this.location, this.markers[0]);
                // 重新计算距离
                if (this.updateDistance){   
                    this.distance = getDistance(this.location.latitude, 
                                                this.location.longitude, 
                                                this.markers[0].latitude, 
                                                this.markers[0].longitude)
                    this.updateDistance(this.distance)
                }
            })     
            
        }
    },
    created(){
        let qqmapsdk = new QQMapWX({
            key: 'X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL'
        });

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