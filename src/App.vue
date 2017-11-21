<template>
  <div id="app">
    <w-header :isSelectAll="isMutiple"></w-header>
    <tab
      :unapprovalList="unapprovalList"
      @clickunapproval="clickUnapproval"
      @clickapproval="clickApproval"
    ></tab>
    <router-view
      @approvalclick = "approvalClick"
      @deleteclick = "deleteClick"
      @processclick = "processClick"
    ></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import WHeader from 'components/w-header/w-header'
  import Tab from 'components/tab/tab'
  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    created() {
      console.log(this)
    },
    data() {
      return {
        isMutiple: true
      }
    },
    computed: {
      ...mapGetters(['unapprovalList'])
    },
    methods: {
      approvalClick(item) {
        alert('click is approval')
      },
      deleteClick(item) {
        alert('click is delete')
      },
      processClick(item) {
        alert('click is process')
      },
      clickUnapproval() {
        this.isMutiple = true
      },
      clickApproval() {
        this.isMutiple = false
      }
    },
    components: {
      WHeader, Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
