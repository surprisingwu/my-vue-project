<template>
  <div class="check" @click.stop="selectHandler" :class="selectCls">
    <span class="operation-btn"></span>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        isSelected: false,
        hasOneNotSelect: true
      }
    },
    computed: {
      selectCls() {
        return this.isSelected ? 'select' : ''
      },
      ...mapGetters([
        'isSelectAll', 'isTriggerSelectAll'
      ])
    },
    methods: {
      selectHandler() {
        // 一旦点击列， 取消watch
        this.setTriggerSelectAll(false)
        this.isSelected = !this.isSelected
        this.$emit('ischangeselectall', this.isSelected)
      },
      ...mapMutations({
        'setTriggerSelectAll': 'SET_TRIGGER_SELECT_ALL',
         'setAtLeastOne': 'SET_AT_LEAST_ONE'
      })
    },
    watch: {
      isSelectAll(newVal, oldVal) {
        // 只有通过点击全选和取消全选下面才能执行
        if (this.isTriggerSelectAll) {
          this.isSelected = newVal
          this.setAtLeastOne(newVal)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .check
    position relative
    padding 0 15px 0 25px
    height 100%
    .operation-btn
      display: inline-block
      position: absolute
      top 50%
      left 0
      transform translateY(-50%)
      width: 20px
      height: 20px
      background-color: #fff
      border-radius: 100%
      border: 1px solid #ccc
      vertical-align: middle
      &::after
        border: 2px solid transparent
        border-left: 0
        border-top: 0
        content: " "
        top: 3px
        left: 7px
        position: absolute
        width: 4px
        height: 8px
        transform: rotate(45deg) scale(0)
        transition: -webkit-transform .2s
        transition: transform .2s
        transition: transform .2s
  .select .operation-btn
    background-color: #26a2ff
    border-color: #26a2ff

  .select .operation-btn::after
    border-color: #fff
    transform: rotate(45deg) scale(1)
</style>
