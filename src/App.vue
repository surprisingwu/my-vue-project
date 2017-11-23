<template>
  <div id="app">
    <w-header
      :isSelectAll="isMutiple"
      @mutipleoperation="mutipleOperation"
      @selectalloperation = "selectAllOperation"
    ></w-header>
    <tab
      @clickunapproval="clickUnapproval"
      @clickapproval="clickApproval"
      :unapprovalListLength="unapprovalListLength"
    ></tab>
    <router-view
      @approvalclick = "approvalClick"
      @deleteclick = "deleteClick"
      @processclick = "processClick"
      :startMutiple="startMutiple"
      @showunapprovallistlength="showUnapprovalListLength"
    ></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import WHeader from 'components/w-header/w-header'
  import Tab from 'components/tab/tab'
  import { mapMutations } from 'vuex'
  export default {
    name: 'app',
    created() {
    },
    data() {
      return {
        isMutiple: false,
        startMutiple: false,
        unapprovalListLength: 0
      }
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
        this.isMutiple = false
      },
      clickApproval() {
        this.isMutiple = false
      },
      mutipleOperation(bol) {
        this.startMutiple = bol
      },
      showUnapprovalListLength(num) {
        this.unapprovalListLength = num
      },
      selectAllOperation() {
        this.setSelectAll(true)
      },
      ...mapMutations({
        setSelectAll: 'SET_SELECT_ALL'
      })
    },
    components: {
      WHeader, Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
