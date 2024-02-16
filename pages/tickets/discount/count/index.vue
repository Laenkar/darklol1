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
      <div class="mx-auto  p-4 text-lg text-center">
      <h1 class="font-semibold text-4xl text-black leading-tight text-center">
        Группировка скидок
      </h1>
      <div >
        Сгруппировать объекты по значению поля discount, вернуть количество элементов в каждой группе.
      </div>
        <UButton @click="refreshAll"
                 color="purple"
                 class="h-12 w-30 rounded-xl font-semibold text-lg justify-center">
          Обновить
        </UButton>
      </div>
      </template>
      <UTable
              :rows="discounts"
              :columns="columns"
              :loading="pending"
              :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
              :ui="{td: { color: 'text-black dark:text-black' }}"

      >
      </UTable>

  </UCard>
  <UModal v-model="errorHappened" prevent-close >
    <div class="mx-auto max-w-md justify-items-center grid">
      <div class="mx-auto max-w-md p-4 text-lg text-center font-semibold">
        Произошла непредвиденная ошибка!
      </div>
      <UButton color="purple"
               class="rounded-xl font-semibold text-xl justify-center h-12 w-16"
               @click="errorHappened=false"
               label="OK"
      />
    </div>
  </UModal>
</template>

<script lang="ts" setup>

//store
const config = useRuntimeConfig()
const url = config.public.baseURL + '/tickets/discount/count'
const errorHappened = ref(false)



  const {data: discounts, pending, error} = await useFetch(url, {
    key: 'count',
    lazy: true,
    server: false,
    method: 'POST',
    immediate: true,
    default: () => []
  })

watch(errorHappened, (newError) => {
  if (newError) {
    errorHappened.value = true
  }
})

const refreshAll = async () => {
  try {
    await refreshNuxtData('count')
  } finally {
  }
}


const columns = [{
  key: 'discount',
  label: 'Размер скидки'
}, {
  key: 'count',
  label: 'Количество билетов'
}]

</script>
