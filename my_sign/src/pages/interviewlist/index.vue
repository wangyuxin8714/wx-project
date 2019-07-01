<template>
    <div class="wrap">
        <header>
            <span class="active">未开始</span>
            <span>已打卡</span>
            <span>已放弃</span>
            <span>全部</span>
        </header>
        <main>
            <dl @click="godetail">
                <dt>
                    <h2>百度</h2>
                    <span>未开始</span>
                </dt>
                <p>
                    北京市海淀区东北旺西路8号
                </p>
                <dd>
                    <span>面试时间:2019-07-04 18:50</span>
                    <span>未提醒</span>
                </dd>
            </dl>
        </main>
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
            ind:0
        }
    },
    computed:{

    },
    methods:{
        godetail(){
            wx.navigateTo({url: '/pages/listdetail/main'})
        }
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
    display: flex;
    flex-direction: column;
    border-top: 1px solid #eee;
}

header{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
header span{
    line-height: 50px;
}
.active{
    color:#197dbf;
    border-bottom: 1px solid #197dbf; 
}
main{
    flex: 1;
}
dl{
    padding: 10px;
    box-sizing: border-box;
    border-top: 20rpx solid #eee;
}
dl dt{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
dl dt h2{
    font-size: 22px;
}
dl dt span{
    padding: 3px 5px;
    font-size: 15px;
    background: #eee;
    color:#909399;
}
p{
    font-size: 16px;
    padding: 7px 0;
    color: #aaa;
}
dd{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

dd span{
    font-size: 17px;
    color: #666;
}

dd span:nth-child(2){
    background:hsla(0,87%,69%,.1); 
    color:#f56c6c;
    padding: 3px 6px;
}

</style>