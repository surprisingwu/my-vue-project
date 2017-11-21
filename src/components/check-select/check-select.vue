<template>
 <div class="check">
   <label class="input-wrapper">
     <span >
       <input type="checkbox" class="input-cls">
       <span class="operation-btn"></span>
     </span>
   </label>
 </div>
</template>

<script type="text/ecmascript-6">
 export default {
     data() {
         return {
           value: []
         }
     }
 }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .input-wrapper
    display: block
    padding 10px 0
    .input-cls
      display: none;
    .operation-btn
      display: inline-block
      background-color: #fff
      border-radius: 100%
      border: 1px solid #ccc
      position: relative
      width: 20px
      height: 20px
      vertical-align: middle
      &::after
        border: 2px solid transparent
        border-left: 0
        border-top: 0
        content: " "
        top: 3px
        left: 6px
        position: absolute
        width: 4px
        height: 8px
        transform: rotate(45deg) scale(0)
        transition: -webkit-transform .2s
        transition: transform .2s
        transition: transform .2s
    .input-cls:checked + .operation-btn
      background-color: #26a2ff
      border-color: #26a2ff
    .input-cls:checked + .operation-btn::after
      border-color: #fff
      transform: rotate(45deg) scale(1)
</style>
