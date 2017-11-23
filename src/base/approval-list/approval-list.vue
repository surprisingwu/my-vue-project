<template>
  <div class="wrapper">
    <div class="top">
      <span class="item-type">{{item.type}}</span>
      <span class="item-time">{{item.time}}</span>
    </div>
    <div class="bottom">
      <span class="item-name">{{item.name}}</span>
      <span class="item-total">{{item.total}}</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      },
      created() {
        console.log(this.item)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/styl/variable.styl"
  @import "~common/styl/mixin.styl"
  .top, .bottom
    display flex
    font-size 0
    line-height 18px
    .item-type, .item-name
      color $color-333
      font-size $font-mid
    .item-time, .item-total
      flex 1
      text-align right
      font-size $font-small
  .top
    padding-top 10px
    margin-bottom 13px
    .item-time
      color $color-999
  .bottom
    .item-total
      color: $color-theme
</style>
