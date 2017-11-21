<template>
<div>
  <scroll class="unapproval" 
  :data="unapprovalList"
  @scrolltoend="pullUploadHandler"
  :pullUpload = "pullUpload"
  :pullDownRefresh="pullDownRefresh"
  @scrolltotop="pullDownHandler"
  >
    <ul>
      <transition name="slide">
        <loading v-show="isPullDownRefresh" class="pull-down"></loading>
      </transition>  
      <li class="list-item"
          v-for="(item,index) in unapprovalList"
          :key="index"
          ref="list"
          @touchstart.prevent="touchSlideStart(index,item,$event)"
          @touchmove.prevent="touchSlideMove(index,$event)"
          @touchend="touchSlideEnd(index,$event)"
      >
        <div class="item-inner">
        <approval-list :item="item"></approval-list>
          <span class="icon icon-right"></span>
          <div class="swipe-container" ref="swipeBtns">
            <div class="approval-btn">提交</div>
            <div class="delete-btn">删除</div>
            <div class="process-btn">流程</div>
          </div>
        </div>
      </li>
      <loading v-show="hasmore"></loading>
    </ul>
  </scroll>
  <div class="loading-wrapper" v-show="!unapprovalList.length">
    <loading></loading>
  </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import ApprovalList from 'base/approval-list/approval-list'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {prefixStyle} from 'common/js/dom'
  import {getUnapproval} from 'api/unapproval'
  import {mapMutations} from 'vuex'

  const SLIDE_BTN_WIDTH = 65
  const START_SLIDE = 20
  const transform = prefixStyle('transform')
  const transition = prefixStyle('transition')
  export default {
    props: {},
    data() {
      return {
        activeItem: -1,
        unapprovalList: [],
        hasmore: false,
        pullUpload: true,
        pullDownRefresh: true,
        isPullDownRefresh: false
      }
    },
    created() {
      this.touch = {} // eslint-disable-next-line    
      getUnapproval().then((res) =>{
        this.unapprovalList = res.unapprovalList
        this.hasmore = true
        this.setUnapprovalList(res.unapprovalList)
      })
    },
    methods: {
      // 实现侧滑:
      // 1. 一个状态记录是否开启了侧滑,以及是哪一个li开启了侧滑
      // 2. 再触摸的时候,先判断是否开启了侧滑,没有的话,偏移.有的话,先关闭之前的
      touchSlideStart(index, item, $event) {
        if (this.activeItem >= 0) {
          if ($event.target.innerText === '提交') {
            this.$emit('approvalclick', item)
            return
          }
          if ($event.target.innerText === '删除') {
            this.$emit('deleteclick', item)
            return
          }
          if ($event.target.innerText === '流程') {
            this.$emit('processclick', item)
            return
          }
          this.$refs.list[this.activeItem].style[transform] = `translate3d(0,0,0)`
          this.$refs.list[this.activeItem].style[transition] = '0.3s cubic-bezier(0,0,0.58,1)'
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
          this.$refs.list[index].style[transform] = `translate3d(-${this._offsetWidth()}px,0,0)`
        }
        this.$refs.list[index].style[transition] = '0.3s cubic-bezier(0,0,0.58,1)'
      },
      touchSlideEnd(index, $event) {
        this.initiated = false
      },
      pullUploadHandler() {
        setTimeout(() => {
          this.hasmore = false
        }, 500)
      },
      pullDownHandler() {
       this.isPullDownRefresh = true
       setTimeout(() => {
         this.isPullDownRefresh = false
       }, 500)
      },
      _offsetWidth() {
        return this.$refs.swipeBtns[0].children.length * SLIDE_BTN_WIDTH
      },
      ...mapMutations({
        'setUnapprovalList': 'SET_UNAPPROVAL_LIST'
      })
    },
    components: {
      ApprovalList, Scroll, Loading
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
    z-index -1
    width: 100% 
    ul
      overflow hidden
      .pull-down
        color #666
        &.slide-enter-active, &.slide-leave-active
          transition: height  all .5s linear
        &.slide-enter, &.slide-leave-to
          opacity: 0   
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
          .delete-btn, .approval-btn, .process-btn
            position: absolute
            top: 0
            height: 100%
            line-height 70px
            width $slide-btn-width
            text-align center
            font-size $font-s-mid
            color #fff
          .approval-btn
            right -($slide-btn-width)
            background-color $approval-color
          .delete-btn
            right -2*($slide-btn-width)
            background-color $delete-color
          .process-btn
            right -3*($slide-btn-width)
            background-color $process-color 
  .loading-wrapper
    position fixed
    top 50%
    left 50%
    transform translate3d(-50%,-50%,0) 
</style>
