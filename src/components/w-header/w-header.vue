<template>
  <div class="m-header">
    <span class="back icon-back" v-show="!isMutiple"></span>
    <span class="back select-all" v-show="isMutiple" @click.stop="selectAllHandler">{{selectOption}}</span>
    <h1 class="title">审批</h1>
    <div class="options-btn">
      <span class="check-btn" v-show="!isMutiple">查询 </span>
      <span class="much-option" @click="mutipleOperation">{{selectText}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    name: 'w-header',
    data() {
      return {
        selectAll: false,
        isMutiple: false
      }
    },
    computed: {
      selectText() {
        if (this.selectAll) {
          return '取消'
        }
        return '批量'
      },
      selectOption() {
        if (this.isSelectAll) {
          return '取消全选'
        }
        return '全选'
      },
      ...mapGetters(['isSelectAll'])
    },
    methods: {
      mutipleOperation() {
        this.isMutiple = !this.isMutiple
        this.$emit('mutipleoperation', this.isMutiple)
      },
      selectAllHandler() {
        this.selectAll = !this.selectAll
        if (this.selectAll) {
          this.$emit('selectalloperation')
        }
      }
    },
    components: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/styl/variable.styl';
  @import '~common/styl/mixin.styl';

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    border-1px($border-bootm-color)
    .back
      position: absolute
      left: 0
      top: 0
      height: 100%
      padding: 0 15px 0 10px
      line-height: 44px
      text-align: left
      font-size: 25px
      color: $color-theme
    .select-all
      font-size $font-mid
      padding 0 15px
    h1
      height: 44px
      line-height: 44px
      font-size: $font-header
      font-weight: bold
    .options-btn
      position: absolute
      top: 0px
      right: 0
      font-size: 0
      .check-btn, .much-option
        display: inline-block
        height: 100%
        line-height: 44px
        padding: 0 15px
        font-size: $font-mid



</style>
