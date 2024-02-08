<template>
   <div>
      EVENTS
   </div>
</template>
<script setup>
async function getEvents() {
   const events = await $fetch('',{
      method: 'get'
   })
}
</script>
<style lang="less">
   
</style>