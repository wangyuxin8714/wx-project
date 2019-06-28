<template>
    <div>
        <view class="section">
            <span>北京</span>
            <input placeholder="面试地址" auto-focus/>
        </view>
        <ul>
            <li>
                <img src="../../../static/images/location.svg" alt="">
                <dl>
                    <dt>asdgfnsgdjl</dt>
                    <dd>asdgasgdsd</dd>
                </dl>
            </li>
        </ul>
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

}
</style>