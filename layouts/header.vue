<template>
   <header>
      <nav>
         <NuxtLink to="/tickets">
            <MyButton>TICKETS</MyButton>
         </NuxtLink>
         <NuxtLink to="/events">
            <MyButton>EVENTS</MyButton>
         </NuxtLink>
         <NuxtLink to="/booking/sell">
           <MyButton>BOOKING</MyButton>
         </NuxtLink>
      </nav>
      <slot />
   </header>
</template>
<script setup>

</script>
<style lang="less" scoped>
header {
   width: 100%;
   height: 80px;
   background-color: gainsboro;

   nav {
      width: auto;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
   }
}
</style>