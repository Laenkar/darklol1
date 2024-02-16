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
      <h1 class="font-semibold text-4xl text-black leading-tight text-center">
        Скидки на билеты
      </h1>
      <div>
        <nav style="display: flex; justify-content: center">
          <NuxtLink to="/tickets/discount/count">
            <UButton color="purple"
                     class="h-8 w-80 rounded-xl font-semibold text-xl justify-center">Группировка скидок</UButton>
          </NuxtLink>
          <NuxtLink to="/tickets/discount/sum">
            <UButton color="purple"
                     class="h-8 w-80 rounded-xl font-semibold text-xl justify-center">Сумма скидок</UButton>
          </NuxtLink>
        </nav>
        <slot />
      </div>
    </template>
  </UCard>
</template>

<script>

</script>
