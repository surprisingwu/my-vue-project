<template>
  <div id="app">
    <w-header></w-header>
    <tab :unapprovalList="unapprovalList"></tab>
    <router-view :unapprovalList="unapprovalList"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import WHeader from 'components/w-header/w-header'
  import Tab from 'components/tab/tab'

  export default {
    name: 'app',
    data() {
     return {
       unapprovalList: [
         {type: '差旅费报销单', time: '2016 04 16  21：08', name: '王晶', total: '￥700.00'},
         {type: '住宿费报销单', time: '2016 04 15  11：08', name: '王娟', total: '￥1700.00'},
         {type: '差旅费报销单', time: '2016 04 16  1：08', name: '任佳璐', total: '￥2700.00'},
         {type: '差旅费报销单', time: '2016 04 17  20：08', name: '张光', total: '￥3700.00'},
         {type: '差旅费报销单', time: '2016 04 18  22：08', name: '王斌', total: '￥4700.00'}
       ]
     }
    },
    created() {
    },
    components: {
      WHeader, Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
