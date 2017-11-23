<template>
  <div class="check" @click.stop="selectHandler" :class="selectCls">
    <span class="operation-btn"></span>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isSelected: false
      }
    },
    computed: {
      selectCls() {
        return this.isSelected ? 'select' : ''
      }
    },
    methods: {
      selectHandler() {
        this.isSelected = !this.isSelected
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
