<template>
 <div class="wrapper" v-show="isShow">
   <div class="toast"></div>
   <div class="main">
     <div class="header">
       <span class="cancel">取消</span>
       <h1 class="title">{{title}}</h1>
       <span class="confirm">确认</span>
     </div>
     <div class="content">
       <textarea class="text" placeholder="批转请输入意见"></textarea>
     </div>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
 export default {
   props: {
     title: {
       type: String,
       default: '批准'
     }
   },
   data() {
     return {
       isShow: false
     }
   },
   methods: {
     show() {
       this.isShow = true
     },
     hide() {
       this.isShow = false
     }
   }
 }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/styl/variable.styl"
@import "~common/styl/mixin.styl"  
  .wrapper
    position file
    top 0
    left 0
    right 0
    bottom 0
    overflow hidden
    .toast
      position absolute
      top 0
      left 0
      right 0
      bottom 0 
      background-color rgba(0, 0, 0, .3)
    .main
      position fixed
      bottom 0
      left 0
      right 0
      z-index 1
      .header
        position relative
        height 44px
        width 100%
        line-height 44px
        box-sizing border-box
        border-1px($color-theme)
        background-color #fff
        font-size 0
        color $color-theme
        .title
          text-align center
          font-size $font-header
        .cancel
          position absolute
          top 0
          left 0
          padding 0 15px
          font-size $font-s-mid
          color #999
        .confirm
          position absolute
          top 0
          right 0
          padding 0 15px
          font-size $font-s-mid    
      .content
        height 190px
        width 100%
        .text
          width 100%
          height 100%
          line-height 21px
          text-indent 15px
          font-size $font-mid
          color #999
          outline none
        textarea::placeholder
          font-size $font-mid
          color #CCC  

 
</style>
