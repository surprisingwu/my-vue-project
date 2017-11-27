<template>
 <div class="btn-wrapper">
     <span class="btn-item" :class="{'approval-active':atLeastOne}">批准</span>
     <span class="btn-item" :class="{'reject-active':atLeastOne}">驳回</span>
 </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
// 只要选中一下，就高亮
 export default {
     computed: {
         ...mapGetters([
             'atLeastOne'
         ])
     }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/styl/variable.styl'
.btn-wrapper
    display flex
    position fixed
    bottom 0
    left 0
    right 0
    width 100%
    height 50px
    line-height 50px
    font-size 0
    background-color #D3D3D3
    .btn-item
        flex 1
        text-align center
        font-size $font-l-mid
        color #fff
        &.approval-active
            background-color $approval-color
        &.reject-active
            background-color $delete-color    


 
</style>
