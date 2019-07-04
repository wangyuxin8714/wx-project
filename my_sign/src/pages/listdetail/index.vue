<template>
    <div class="wrap">
        <div class="list">
            <view class="section">
                <span>面试地址:</span>
                <label>{{listdetail.address}}</label>
            </view>
            <view class="section">
                <span>面试时间:</span>
                <label>{{listdetail.start_time}}</label>
            </view>
            <view class="section">
                <span>联系方式:</span>
                <label @click="msg">{{listdetail.phone}}</label>
            </view>
            <view class="section">
                <span>是否提醒:</span>
                <label v-if="listdetail.remind===-1">未提醒</label>
                <label v-if="listdetail.remind===0">已提醒</label>
            </view>
            <view class="section">
                <span>面试状态:</span>
                <label v-if="listdetail.status===-1">未开始</label>
                <label v-if="listdetail.status===0">已打卡</label>
                <label v-if="listdetail.status===1">已放弃</label>
            </view>
            <view v-if="listdetail.status===-1" class="section" >
                <span>取消提醒:</span>
                <switch @change="switchChange"/>
            </view>
        </div>
        <div v-if="listdetail.status===-1" class="btn">
            <button type="default" @click="goclock">去打卡</button>
            <button type="default" @click="godetail(listdetail.id)">放弃面试</button>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from "vuex"
export default {
    props:{

    },
    components:{

    },
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            listdetail:state=>state.interview.listdetail
        })
    },
    methods:{
        ...mapActions({
            updatedetail:"update/updatedetail",
            getview:"interview/getview",
        }),
        switchChange(e){
            if(e.mp.detail.value){
                this.updatedetail(
                    {
                        id:this.listdetail.id,
                        data:{
                            remind:0
                        }
                    }
                )
            }else{
                this.updatedetail(
                    {
                        id:this.listdetail.id,
                        data:{
                            remind:-1
                        }
                    }
                )
            }
        },
        goclock(){
            wx.navigateTo({url: '/pages/clock/main'})
        },
        godetail(id){
            this.updatedetail(
                {
                    id,
                    data:{
                        status:1
                    }
                }
            )
            this.getview(1)
            this.$bus.$emit("ind",2)
            wx.navigateTo({url: '/pages/interviewlist/main'})
        },
        msg(){
            wx.showModal({
                content: '拨打13102058753?',
                showCancel:false,
                success: function(res) {
                    if (res.confirm) {
                        // wx.navigateTo({url: '/pages/interviewlist/main'})
                        console.log('用户点击确定')
                    }
                }
            })
        }
    },
    created(){
        
    },
    mounted(){
        
    },
    async onShow(){
    // 修改标题
        wx.setNavigationBarTitle({ title: this.listdetail.company });
    },
}
</script>
<style scoped lang="">
.wrap{
    width: 100%;
    height: 100%;

}
.list{
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    
}
.section{
    display: flex;
    font-size: 15px;
    align-items: center;
    margin: 0 15px;
    height: 88rpx;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    position: relative;
}
.section:last-child{
    border-bottom: 0;
}
.section span{
    margin-right: 25px;
}
.section label{
    flex: 1;
}
.btn{
    width: 100%;
    display:flex;
    padding:50rpx 15rpx;
    box-sizing: border-box;
}
.btn button{
    color: #fff;
    flex: 1;
    border: 0;
    margin: 15rpx;
    border-radius: 0
}
.btn button:first-child{
    background: #197dbf;

}
.btn button:last-child{
    background: #dc4e42;
}
</style>