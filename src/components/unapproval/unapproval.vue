<template>
  <div class="unapproval">
    <ul>
      <li class="list-item"
          v-for="(item,index) in unapprovalList"
          :key="index"
          ref="list"
          @touchstart="touchSlideStart(index,$event)"
          @touchmove="touchSlideMove(index,$event)"
          @touchend="touchSlideEnd(index,$event)"
      >
        <div class="item-inner">
        <approval-list :item="item"></approval-list>
          <span class="icon icon-right"></span>
          <div class="swipe-container">
            <div class="delete-btn">删除</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import ApprovalList from 'base/approval-list/approval-list'
  import {prefixStyle} from 'common/js/dom'

  const SLIDE_BTN_WIDTH = 65
  const START_SLIDE = 20
  const transform = prefixStyle('transform')
  const transition = prefixStyle('transition')
  export default {
    props: {
      unapprovalList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        activeItem: -1
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      // 实现侧滑:
      // 1. 一个状态记录是否开启了侧滑,以及是哪一个li开启了侧滑
      // 2. 再触摸的时候,先判断是否开启了侧滑,没有的话,偏移.有的话,先关闭之前的
      touchSlideStart(index, $event) {
        if (this.activeItem >= 0) {
          this.$refs.list[this.activeItem].style[transform] = `translate3d(0,0,0)`
          this.$refs.list[this.activeItem].style[transition] = '0.3s  ease-in-out'
          this.activeItem = -1
          return
        }
        this.activeItem = index
        this.touch.initiated = true
        const touches = $event.touches[0]
        this.touch.startX = touches.pageX
      },
      touchSlideMove(index, $event) {
        if (this.initiated || this.activeItem < 0) return
        let touches = $event.touches[0]
        let deltaX = touches.pageX - this.touch.startX
        if (Math.abs(deltaX) < START_SLIDE) return
        if (deltaX > 0) {
          this.$refs.list[index].style[transform] = `translate3d(0,0,0)`
        } else {
          this.$refs.list[index].style[transform] = `translate3d(-${SLIDE_BTN_WIDTH}px,0,0)`
        }
        this.$refs.list[index].style[transition] = '0.3s  ease-in-out'
      },
      touchSlideEnd(index, $event) {
        this.initiated = false
      }
    },
    components: {
      ApprovalList
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
          box-sizing border-box
          border-1px($border-bootm-color)
          .icon
            position: absolute;
            right: 7px;
            top: 0;
            height: 100%;
            line-height: 70px;
            font-size: 20px;
          .delete-btn
            position: absolute
            right: -($slide-btn-width)
            top: 0
            height: 100%
            line-height 70px
            width $slide-btn-width
            text-align center
            font-size $font-s-mid
            color #fff
            background-color $delete-color


</style>
