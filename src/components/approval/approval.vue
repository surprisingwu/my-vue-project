<template>
  <div>
    <div class="approval">
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
          <li v-for="(item,index) in unapprovalList" :key="index" class="list-item">
            <div class="item-inner">
              <check-select>
                <approval-list :item="item"></approval-list>
              </check-select>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Scroll} from 'cube-ui'
  import CheckSelect from 'components/check-select/check-select'
  import ApprovalList from 'base/approval-list/approval-list'
  import {getUnapproval} from 'api/unapproval'

  export default {
    data() {
      return {
        count: 0,
        unapprovalList: [],
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
      getUnapproval().then(res => {
        this.unapprovalList = res.unapprovalList
      })
    },
    methods: {
      onPullingDown() {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            const temp = {
              'type': '差旅费报销单',
              'time': '2016 04 16  21：08',
              'name': '王晶',
              'total': '￥700.00'
            }
            this.unapprovalList.unshift(temp)
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      },
      onPullingUp() {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            this.count++
            const temp = {
              'type': '差旅费报销单',
              'time': '2016 04 16  21：08',
              'name': '王晶' + this.count,
              'total': '￥700.00'
            }
            this.unapprovalList.push(temp)
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      }
    },
    components: {
      CheckSelect, ApprovalList, Scroll
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/styl/variable.styl"
  @import "~common/styl/mixin"
  .approval
    position fixed
    top 88px
    bottom 0px
    left 0
    right 0
    z-index -1
    width 100%
    .list-item
      padding-left 15px
      height 70px
      font-size 0
      .item-inner
        height 100%
        border-1px($border-bootm-color)
</style>
