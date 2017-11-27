<template>
<div class="unapproval" ref="unapprovalWrapper">
    <scroll
      ref="scroll"
      :data="unapprovalList"
      :pull-down-refresh="pullDownRefresh"
      @pulling-down="onPullingDown"
      :pull-up-load="pullUpLoad"
      @pulling-up="onPullingUp"
      :pullDownStyle="{ color: '#2DBBFA', fontSize: '13px' }"
    >
    <ul>
      <li class="list-item"
          v-for="(item,index) in unapprovalList"
          :key="index"
          ref="list"
          v-show="!isMutiple"
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
      <li v-for="(item,index) in unapprovalList"
          :key="index"
          class="list-item"
          v-show="isMutiple"
      >
        <div class="item-inner">
          <check-select @ischangeselectall="isChangeSelectAll" ref="checkList">
            <approval-list :item="item"></approval-list>
          </check-select>
        </div>
      </li>
    </ul>
  </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Scroll} from 'cube-ui'
  import {prefixStyle} from 'common/js/dom'
  import {getUnapproval} from 'api/unapproval'
  import CheckSelect from 'components/check-select/check-select'
  import ApprovalList from 'base/approval-list/approval-list'
  import {mapMutations, mapGetters} from 'vuex'

  const SLIDE_BTN_WIDTH = 65
  const START_SLIDE = 20
  const PADDING_BOTTOM = 50
  const transform = prefixStyle('transform')
  const transition = prefixStyle('transition')
  export default {
    props: {
      isMutiple: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters([
        'isSelectAll'
      ])
    },
    data() {
      return {
        activeItem: -1,
        // 是否还有数据
        unapprovalList: [],
        hasmore: false,
        count: 0,
        // checkBox的状态
        isSelected: false,
        pullDownRefresh: {
          txt: '下拉加载成功...'
        },
        pullUpLoad: {
          threshold: 40,
          txt: {
            more: 'Load more',
            noMore: '没有更多的数据加载了...'
        }
      }
      }
    },
    created() {
      this.touch = {} // eslint-disable-next-line
      getUnapproval().then((res) =>{
        this.hasmore = true
        this.unapprovalList = res.unapprovalList
        this.showUnapproval(this.unapprovalList.length)
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
      onPullingDown() {
        const _self = this
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            const temp = {
              'type': '差旅费报销单',
              'time': '2016 04 16  21：08',
              'name': '王晶',
              'total': '￥700.00'
            }
            _self.unapprovalList.push(temp)
          } else {
            // 如果没有新数据
            _self.$refs.scroll.forceUpdate()
          }
        }, 1000)
      },
      onPullingUp() {
        const _self = this
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            this.count++
            const temp = {
              'type': '差旅费报销单',
              'time': '2016 04 16  21：08',
              'name': '王晶' + _self.count,
              'total': '￥700.00'
            }
            _self.unapprovalList.push(temp)
            _self.showUnapproval(_self.unapprovalList.length)
          } else {
            // 如果没有新数据
            _self.$refs.scroll.forceUpdate()
          }
        }, 1000)
      },
      showUnapproval(length) {
        this.$emit('showunapprovallistlength', length)
      },
      isChangeSelectAll(flag) {
        let checkList = this.$refs.checkList
        let activeIndex = checkList.findIndex((item) => item.isSelected === true)
        if (activeIndex > -1) {
          this.setAtLeastOne(true)
        } else {
          this.setAtLeastOne(false)
        }
        if (flag === false) {
          this.setSelectAll(false)
        } else {
          let index = checkList.findIndex((item) => item.isSelected === false)
          if (index > -1) {
            this.setSelectAll(false)
          } else {
            this.setSelectAll(true)
          }
        }
      },
      _offsetWidth() {
        return this.$refs.swipeBtns[0].children.length * SLIDE_BTN_WIDTH
      },
      ...mapMutations({
        'setSelectAll': 'SET_SELECT_ALL',
        'setAtLeastOne': 'SET_AT_LEAST_ONE'
      })
    },
    components: {
      ApprovalList, Scroll, CheckSelect
    },
    watch: {
      isMutiple(newVal) {
        const unapprovalWrapper = this.$refs.unapprovalWrapper
        if (newVal) {
          unapprovalWrapper.style.bottom = PADDING_BOTTOM + 'px'
        } else {
          unapprovalWrapper.style.bottom = '0px'
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
