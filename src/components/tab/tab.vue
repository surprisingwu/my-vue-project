<template>
  <div class="tab">
    <div class="tab-item" @click="clickUnapproval">
      <router-link tag="div" to="/unapproval" class="text">{{unapprovalAmount}}</router-link>
    </div>
    <div class="tab-item" @click="clickApproval">
      <router-link tag="div" to="/approval" class="text">已审批</router-link>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      unapprovalListLength: {
        type: Number,
        default: 0
      }
    },
    computed: {
      unapprovalAmount() {
        return this.unapprovalListLength === 0 ? '未审批' : `未审批(${this.unapprovalListLength})`
      }
    },
    methods: {
      clickUnapproval() {
        this.$emit('clickunapproval')
      },
      clickApproval() {
        this.$emit('clickapproval')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/styl/variable.styl'
  @import '~common/styl/mixin.styl'
  .tab
    display: flex
    height: 44px
    font-size: 0
    border-1px($border-bootm-color)
    .tab-item
      flex: 1
      text-align center
      color: $color-666
      .text
        display inline-block
        padding 0 30px
        height 100%
        line-height 44px
        font-size $font-l-mid
        box-sizing border-box
        &.router-link-active
          color: $color-theme
          border-collapse collapse
          border-bottom 2px solid $color-theme
</style>
