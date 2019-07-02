<template>
    <div>
        <form @submit="formSubmit" report-submit=true>
        <h5>面试信息</h5>
        <div>    
            <view class="section_input">
                <span>公司名称</span>
                <input name="input1" v-model="current.company" placeholder="请输入公司名称" />
            </view>
            <view class="section_input">
                <span>公司电话</span>
                <input name="input2" v-model="current.phone" placeholder="请输入面试联系人电话" />
            </view>
            <view class="section_input">
                <span>面试时间</span>
                <label>
                    <picker mode="multiSelector" @columnchange="columnChange" @change="bindMultiPickerChange" :value="multiIndex" :range="newMultiArray">
                        <span>{{time}}</span>
                    </picker>
                </label>
                <icon @click="mask" type="warn" color="#197DBF" size="25"/>
            </view>
            <view class="section_input">
                <span>面试地址</span>
                <input name="input3" placeholder="请选择面试地址" v-model="current.address" :value="current.address.address"  @click="goloca"/>
            </view>
        </div>
        <h5>备注信息</h5>
        <div>
            <view class="section_text">
                <textarea  placeholder="备注信息(可选，100个字以内)" name="textarea"/>
            </view>
            <button form-type="submit"> 确认 </button>
             <!--  -->
        </div>
        </form>
    </div>
</template>
<script>
import {mapState, mapMutations,mapActions} from "vuex"

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
        ...mapState({
            current:state=>state.interview.current
        }),
        
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
        ...mapActions({
            submit:"interview/addview",
            getview:"interview/getview"
        }),
        columnChange(e){
            console.log(e)

        },
        mask(){
            wx.showToast({
                title:'在面试前一个小时我们会通知你哦',
                icon:"none",
                duration: 1000
            })
        },
        async formSubmit(e){
            // console.log("e...........................",e.mp.detail.formId)
             // 判断公司名称是否为空
            const _this=this
            if (!this.current.company){
                wx.showToast({
                    title: '请输入公司名称', //提示的内容,
                    icon: 'none', //图标,
                });
                return false
            }
            // 判断手机号是否符合规范
            if (!/^1(3|4|5|7|8)\d{9}$/.test(this.current.phone) || !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.current.phone)){
                wx.showToast({
                    title: '请输入面试联系人的手机或座机', //提示的内容,
                    icon: 'none', //图标,
                });
                return false
            }
            // 判断公司地址
            if (!this.current.address.address){
                wx.showToast({
                    title: '请选择公司地址', //提示的内容,
                    icon: 'none', //图标,
                });
                return false
            }
            this.current.start_time=+new Date(this.time)
            this.current.form_id=e.mp.detail.formId
            // console.log(this.current)
            let data=await this.submit(this.current)
            if(data.code===0){
                wx.showModal({
                    title: '温馨提示',
                    content: '添加面试成功',
                    showCancel:false,
                    success: function(res) {
                        if (res.confirm) {
                            // console.log('用户点击确定')
                            _this.getview(-1)
                            wx.navigateTo({url: '/pages/interviewlist/main'})
                        }
                    }
                })
            }else{
                wx.showModal({
                    title: '温馨提示',
                    content: data.msg,
                    
                })
            }
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
        // $bus.$on("address",(address)=>{
        //     console.log(address)
        // })
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