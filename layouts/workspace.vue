<template>
   <div id="workspace">
      <slot></slot>
   </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
#workspace {
   overflow: hidden;
   position: relative;
   top: 0;
   margin: 0 auto;
   width: calc(100% - 100px);
}
</style>