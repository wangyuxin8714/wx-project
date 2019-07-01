<template>
    <div>

        <picker mode="multiSelector" @change="bindMultiPickerChange" :value="multiIndex" :range="newMultiArray">
            <span>当前时间：{{time}}</span>
        </picker>
    </div>
</template>
<script>
// import {mapState, mapMutations} from "vuex"

export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            hours:[],
            time: "",
            multiArray: [],
            multiIndex: [0, 0, 0, 0, 0]
        }
    },
    computed:{
        newMultiArray: () => {
        let array = [];
        const date = new Date();
        const days = [];
        const hours = [];
        const minutes = [];
        for (let i = new Date().getDate(); i <= new Date().getDate()+10; i++) {
            days.push(i);
        }
        array.push(days);
        for (let i = 0; i < 24; i++) {
            hours.push(i);
        }
        this.hours=[...hours]
        console.log(this.hours)
        let hour=hours.filter(item=>item>new Date().getHours())
        array.push(hour);

        for (let i = 0; i < 60; i+=10) {
            minutes.push(i);
        }
        array.push(minutes);
        return array;
        },

  
    },
    methods:{

        bindMultiPickerChange(e) {
            this.multiIndex = e.target.value;
            if(e.target.value>new Date().getDate()){
                this.newMultiArray[1]=[...this.hours]
            }
            const index = this.multiIndex;
            const day = this.newMultiArray[0][index[0]];
            const hour = this.newMultiArray[1][index[1]];
            const minute = this.newMultiArray[2][index[2]];
            this.time = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + day + " " + hour + ":" + minute;
        }

        
    },
    created(){
        
    },
    mounted(){
        
    }
}
</script>
<style scoped lang="">



</style>