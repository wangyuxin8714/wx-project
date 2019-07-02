<template>
    <div class="wrap">
        <header>
            <span :class="{'active':ind===index}"
                @click="tab(index)"
                v-for="(item,index) in list" :key="index" 
            >{{item}}</span>
            
        </header>
        <main v-if="viewlist.length!==0">
            <dl @click="godetail(item.id)"
            v-for="(item,index) in viewlist" :key="index"
            >
                <dt>
                    <h2>{{item.company}}</h2>
                    <span v-if="item.status===-1">未开始</span>
                    <span v-if="item.status===0">已打卡</span>
                    <span v-if="item.status===1">已放弃</span>
                </dt>
                <p>
                    {{item.address}}
                </p>
                <dd>
                    <span>面试时间:{{item.start_time}}</span>
                    <span v-if="item.remind===-1">未提醒</span>
                    <span v-if="item.remind===0">已提醒</span>
                </dd>
            </dl>
        </main>
        <main v-if="viewlist.length===0" class="main">
            当前分类还没有面试！
        </main>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from "vuex"
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            ind:0,
            list:[
                "未开始",
                "已打卡",
                "已放弃",
                "全部"
            ]
        }
    },
    computed:{
        ...mapState({
            viewlist:state=>state.interview.viewlist
        })
    },
    methods:{
        ...mapActions({
            getview:"interview/getview",
            getdetail:"interview/getdetail"
        }),
        ...mapMutations({
            filterview:"interview/filterview"
        }),
        godetail(id){
            this.getdetail(id)
            
            wx.navigateTo({url: '/pages/listdetail/main'})
        },
        tab(ind){
            this.ind=ind
            if(ind===0){
                this.getview(-1)
            }
            if(ind===1){
                this.getview(0)
            }
            if(ind===2){
                this.getview(1)
            }
            if(ind===3){
                this.getview(2)
            }
        }
    },
    created(){
        this.getview(-1)
        this.$bus.$on("ind",(ind)=>{
             this.ind=ind
         })
    },
    mounted(){

    }
}
</script>
<style scoped lang="">
.main{
    padding: 40px;
    text-align: center;
    color: red;
    font-size: 16px;
}
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
    overflow: hidden;
    overflow-y: scroll;
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