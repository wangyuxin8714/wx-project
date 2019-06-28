<template>
    <div class="wrap">
        <main>
           <QQMap></QQMap>
        </main>
        <footer>
          <button type="default">打卡</button>
        </footer>
    </div>
</template>

<script>
import QQMap from "@/components/qqMap"
export default {
  data () {
    return {
      
    }
  },

  components: {
    QQMap
  },

  methods: {
    

  },

  created () {

  }
}
</script>

<style scoped>

.wrap{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
main{
  flex: 1;
}
footer{
  width: 100%;
  height: 50px;
}
button{
  width: 100%;
  height: 100%;
  background: #000;
  color: #fff;
  border-radius: 0;
  font-size: 20px;
}
</style>
