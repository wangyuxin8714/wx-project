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
                <label>
                    <picker mode="multiSelector" @change="bindMultiPickerChange" :value="multiIndex" :range="newMultiArray">
                        <span>{{time}}</span>
                    </picker>
                </label>
                <icon @click="mask" type="warn" color="#197DBF" size="25"/>
            </view>
            <view class="section_input">
                <span>面试地址</span>
                <input placeholder="请选择面试地址" auto-focus @click="goloca"/>
            </view>
        </div>
        <h5>备注信息</h5>
        <div>
            <view class="section_text">
                <textarea placeholder="备注信息(可选，100个字以内)" name="textarea"/>
            </view>
            <button type="submit" @click="golist"> 确认 </button>
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
            time: new Date().getFullYear() + "-" + (new Date().getMonth()+1>=10?new Date().getMonth()+1:"0"+(new Date().getMonth()+1)) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes(),
            multiArray: [],
            multiIndex: [0, 0, 0, 0, 0]
        }
    },
    computed:{
        newMultiArray: () => {
            let array = [];
            const date = new Date();
            const years = [];
            const months = [];
            const dates = [];
            const hours = [];
            const minutes = [];
            for (let i = new Date().getDate(); i <= new Date().getDate()+10; i++) {
                dates.push(i+"号");
            }
            array.push(dates);
            for (let i = 0; i < 24; i++) {
                hours.push(i+"点");
            }
            let hour=hours.filter(item=>parseInt(item)>new Date().getHours())
            array.push(hour);
            for (let i = 0; i < 60; i+=10) {
                minutes.push(i+"分");
            }
            array.push(minutes);
            return array;
        }
    },
    methods:{
        mask(){
            wx.showToast({
                title:'在面试前一个小时我们会通知你哦',
                icon:"none",
                duration: 1000
            })
        },
        golist(){
            wx.showModal({
                title: '温馨提示',
                content: '添加面试成功',
                showCancel:false,
                success: function(res) {
                    if (res.confirm) {
                        wx.navigateTo({url: '/pages/interviewlist/main'})
                        // console.log('用户点击确定')
                    }
                }
            })

        },
        goloca(){
            wx.navigateTo({url: '/pages/site/main'})
        },
        bindMultiPickerChange(e) {
            this.multiIndex = e.target.value;
            const index = this.multiIndex;
            const date = parseInt(this.newMultiArray[0][index[0]]);
            const hour = parseInt(this.newMultiArray[1][index[1]]);
            const minute = parseInt(this.newMultiArray[2][index[2]]);
            console.log("当前选择的时间", date,hour,minute);
            this.time = new Date().getFullYear() + "-" + (new Date().getMonth()+1>=10?new Date().getMonth()+1:"0"+(new Date().getMonth()+1)) + "-" + (date>10?date:"0"+date) + " " + (hour>10?hour:"0"+hour) + ":" + minute;
        }
        
    },
    created(){
        
    },
    mounted(){
        
    }
}
</script>
<style scoped lang="">

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