<template>
  <UCard class="w-full" :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
      footer: { padding: 'p-4' }
   }">
  <template #header>
    <h2 class="font-semibold text-xl text-gray-900 leading-tight text-center">
      Booking service
      Choose person id?
    </h2>
    <div>
      <nav style="display: flex; justify-content: center">
        <NuxtLink to="/booking/sell">
          <MyButton style="width: 230px; height: 30px">Get ticket discount</MyButton>
        </NuxtLink>
        <NuxtLink to="/booking/sell">
          <MyButton style="width: 230px; height: 30px">Get VIP ticket</MyButton>
        </NuxtLink>
      </nav>
      <slot />
    </div>
  </template>
  </UCard>
</template>


<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>