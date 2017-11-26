<template>
  <div id="app">
    <w-header
      :isMutiple="isMutiple"
      @mutipleoperation="mutipleOperation"
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
      :isMutiple="isMutiple"
      @showunapprovallistlength="showUnapprovalListLength"
    ></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import WHeader from 'components/w-header/w-header'
  import Tab from 'components/tab/tab'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'app',
    data() {
      return {
        isMutiple: false,
        unapprovalListLength: 0
      }
    },
    computed: {
      ...mapGetters(['isSelectAll'])
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
        // 如果已经出发批量操作，再点击已办时，进行变量初始化
        this.isMutiple = false
        if (this.isSelectAll) {
          this.setSelectAll(false)
        }
      },
      mutipleOperation() {
        this.isMutiple = !this.isMutiple
        if (!this.isMutiple) {
          this.setSelectAll(false)
          this.setTriggerSelectAll = true
        }
      },
      showUnapprovalListLength(num) {
        this.unapprovalListLength = num
      },
      ...mapMutations({
        'setSelectAll': 'SET_SELECT_ALL',
        'setTriggerSelectAll': 'SET_TRIGGER_SELECT_ALL'
      })
    },
    components: {
      WHeader, Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
