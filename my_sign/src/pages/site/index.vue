<template>
    <div>
        <view class="section">
            <span>北京</span>
            <input placeholder="面试地址"  v-model="text" @input="nearby_search" auto-focus/>
        </view>
        <ul>
            <li v-for="(item,index) in list" :key="index" @click="goaddinter(index)">
                <img src="../../../static/images/location.svg" alt="">
                <dl>
                    <dt>{{item.title}}</dt>
                    <dd>{{item.address}}</dd>
                </dl>
            </li>
        </ul>
    </div>
</template>
<script>
import QQMapWX from '../../utils/qqMap';
import {mapMutations} from "vuex"
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            text:"",
            list:[]
        }
    },
    computed:{

    },
    methods:{
        ...mapMutations({
            updateaddress:"interview/updateaddress"
        }),
        goaddinter(ind){
            console.log(this.list[ind].address)
            // console.log($bus)
            this.updateaddress(this.list[ind])
            // $bus.$emit("address",this.list[ind].address)
            wx.navigateTo({url: '/pages/addinterview/main'})
        },
        nearby_search(e){
            const _this = this;
            let qqmapsdk = new QQMapWX({
                key: 'X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL'
            });

            // 调用接口
            qqmapsdk.search({
                keyword: e.target.value,
                location: '39.980014,116.313972',
                success: function (res) {
                    // console.log("res.......",res);
                },
                fail: function (res) {
                    // console.log(res);
                },
                complete: function (res) {
                    // console.log("res111111",res);
                    _this.list=res.data
                    console.log(_this.list)
                    // console.log("data....",this.list)
                }
            })
        }
    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="">
.section{
    display:flex;
    align-items:center;
    border-top:2rpx solid #eee;
    border-bottom:2rpx solid #eee;
    height:88rpx;
}
.section span{
    width:26%;
    text-align:center;
    box-sizing:border-box;
    border-right:2rpx solid #eee;
}
.section input{
    padding:0 20rpx;
}

ul li{
    height:100rpx;
    padding:10rpx 0 10rpx 60rpx;
    box-sizing:border-box;
    border-bottom:2rpx solid #eee;
    display:flex;
    align-items:center;
    flex-direction:row;
}
ul li:hover{
    background:#eee;
}
ul li img{
    width:44rpx;
    height:44rpx;
}
dl{
    flex:1;
    margin-left:30rpx;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
}
dt{
    font-size:34rpx;

}
dd{
    font-size:24rpx;
    color:silver;
    overflow: hidden;
    height: 15px;
}
</style>