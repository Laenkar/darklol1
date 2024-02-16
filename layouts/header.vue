<template>
   <header>
      <nav>
         <NuxtLink to="/tickets">
            <UButton color="purple"
                     class="h-16 w-64 rounded-xl font-semibold text-2xl justify-center">БИЛЕТЫ</UButton>
         </NuxtLink>
         <NuxtLink to="/events">
            <UButton color="purple"
                     class="h-16 w-64 rounded-xl font-semibold text-2xl justify-center">СОБЫТИЯ</UButton>
         </NuxtLink>
         <NuxtLink to="/booking/sell">
           <UButton color="purple"
                    class="h-16 w-64 rounded-xl font-semibold text-2xl justify-center">БРОНИРОВАНИЕ</UButton>
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