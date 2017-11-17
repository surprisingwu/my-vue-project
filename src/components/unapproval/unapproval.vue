<template>
<div class="unapproval">
<ul>
  <li class="list-item"
      v-for="(item,index) in unapprovalList"
      :key="index"
      @touchstart="touchSlideStart"
      @touchmove="touchSlideMove"
      @touchend="touchSlideEnd"
  >
    <div class="item-inner">
      <div class="top">
        <span class="item-type">{{item.type}}</span>
        <span class="item-time">{{item.time}}</span>
      </div>
      <div class="bottom">
        <span class="item-name">{{item.name}}</span>
        <span class="item-total">{{item.total}}</span>
      </div>
      <span class="icon icon-right"></span>
    </div>
  </li>
</ul>
</div>
</template>
<script type="text/ecmascript-6">
    export default {
      props: {
        unapprovalList: {
          type: Array,
          default() {
            return []
          }
        },
        created() {
          this.touch = {}
        },
        methods: {
          touchSlideStart(e) {
            this.touch.initiated = true
            const touches = e.touches[0]
            this.touch.startX = touches.pageX
            this.touch.startY = touches.pageY
          }
        }
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/styl/variable.styl"
@import "~common/styl/mixin.styl"
  .unapproval
    position fixed
    top: 88px
    bottom 0
    left: 0
    width: 100%
    ul
      overflow hidden
      .list-item
        position relative
        height 70px
        width 100%
        box-sizing border-box
        .item-inner
           margin-left 15px
           padding-right 30px
           height 100%
           border-1px($border-bootm-color)
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
           .icon
              position: absolute;
              right: 7px;
              top: 0;
              height: 100%;
              line-height: 70px;
              font-size: 20px;



</style>
