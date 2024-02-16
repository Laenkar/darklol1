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
      <div class="mx-auto p-4 text-lg text-center justify-center grid grid-cols-1 place-items-center">
        <h1 class="font-semibold text-4xl text-black leading-tight text-center">
          Домашняя страница
        </h1>
      </div>
    </template>
  </UCard>

</template>

<script lang="ts" setup>

</script>
