<template>
    <div>

        

        <div>
            <div class='header'>
                <image src='/images/wx_login.png'></image>
            </div>

            <div class='content'>
                <span>申请获取以下权限</span>
                <text>获得你的公开信息(昵称，头像等)</text>
            </div>

            <button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">
                授权登录
            </button>
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
    onLoad(){
        var that = this;
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res)
                            //从数据库获取用户信息
                            // that.queryUsreInfo();
                            //用户已经授权过
                            // wx.switchTab({
                            //     url: '/pages/index/index'
                            // })
                        }
                    });
                }
            }
        })
    },
    methods:{
        bindGetUserInfo(e){
            console.log(e)
        }


        
    },
    created(){
        
    },
    mounted(){
        
    }
}
</script>
<style scoped lang="">
.header {
    margin: 90rpx 0 90rpx 50rpx;
    text-align: center;
    width: 650rpx;
    height: 300rpx;
    line-height: 450rpx;
}

.header image {
    width: 200rpx;
    height: 200rpx;
}

.content {
    margin-left: 50rpx;
    margin-bottom: 90rpx;
}

.content text {
    display: block;
    color: #9d9d9d;
    margin-top: 40rpx;
}

.bottom {
    border-radius: 80rpx;
    margin: 70rpx 50rpx;
    font-size: 35rpx;
}



</style>