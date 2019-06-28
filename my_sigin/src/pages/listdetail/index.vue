<template>
    <div class="wrap">
        <div class="list">
            <view class="section">
                <span>面试地址:</span>
                <label>俺是个大叔的噶萨达嘎嘎</label>
            </view>
            <view class="section">
                <span>面试时间:</span>
                <label>2019-06-29  20:20</label>
            </view>
            <view class="section">
                <span>联系方式:</span>
                <label>13102058753</label>
            </view>
            <view class="section">
                <span>是否提醒:</span>
                <label>未提醒</label>
            </view>
            <view class="section">
                <span>面试状态:</span>
                <label>未开始</label>
            </view>
            <view class="section">
                <span>取消提醒:</span>
                <switch bindchange="switch2Change"/>
            </view>
        </div>
        <div class="btn">
            <button type="default">去打卡</button>
            <button type="default">放弃面试</button>
        </div>
    </div>
</template>
<script>
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

    },
    methods:{

    },
    created(){

    },
    mounted(){

    }
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