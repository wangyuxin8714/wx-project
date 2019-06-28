<template>
    <div>
        <h5>面试信息</h5>
        <div>
            <view class="section_input">
                <span>公司名称</span>
                <input placeholder="请输入公司名称" auto-focus/>
            </view>
            <view class="section_input">
                <span>公司电话</span>
                <input placeholder="请输入面试联系人电话" auto-focus/>
            </view>
            <view class="section_input">
                <span>面试时间</span>
                <label @click="getTime()">{{time}}</label>
                <icon type="warn" color="#197DBF" size="20"/>
            </view>
            <view class="section_input">
                <span>面试地址</span>
                <input placeholder="请选择面试地址" auto-focus/>
            </view>
        </div>
        <h5>备注信息</h5>
        <div>
            <view class="section_text">
                <textarea placeholder="备注信息(可选，100个字以内)" name="textarea"/>
            </view>
            <button type="submit"> 确认 </button>
        </div>
        <div v-if="flag" class="picker">
            <div class="pickview"> 
                <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" >
                    <!-- value="{{value}}"  -->
                    <!-- <picker-view-column>
                        <view wx:for="{{days}}" style="line-height: 50px">{{item}}年</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view wx:for="{{hours}}" style="line-height: 50px">{{item}}月</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view wx:for="{{miuntes}}" style="line-height: 50px">{{item}}日</view>
                    </picker-view-column> -->
                </picker-view>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from "vuex"

export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            flag:false
        }
    },
    computed:{
        ...mapState({
            time:state=>state.index.time,
            days:state=>state.index.days,
            hours:state=>state.index.hours,
            miuntes:state=>state.index.miuntes,
        }),
    },
    methods:{
        
        ...mapMutations({
            getTimes:mutations=>mutations.index.getTimes
        }),
        getTime(){
            this.flag=true
            this.getTimes()
        }
    },
    created(){
        
    },
    mounted(){

    }
}
</script>
<style scoped lang="">
.picker{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    left: 0;
    top: 0;
}
.pickview{
    width: 100%;
    position:fixed;
    bottom: 0;
}
h5{
    background: #f6f6f6;
    font-size: 17px;
    padding: 9px 10px;
}
.section_input{
    display: flex;
    font-size: 15px;
    align-items: center;
    margin: 0 15px;
    height: 88rpx;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    position: relative;
}
.section_input span{
    margin-right: 25px;
}
.section_input input{
    flex: 1;
}
.section_input label{
    flex: 1;
}
.section_text{
    padding: 15px 10px;
    box-sizing: border-box;
}
.section_text textarea{
    border: 1px solid #ccc;
    height:100px;
    padding: 5px;
    box-sizing: border-box;
    font-size: 15px;
}

button{
    margin-top: 15px;
    border-radius: 0;
    background: #999;
    color: #fefefe;
}


</style>