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
          Рассчёт суммы скидок
        </h1>
        <div >
          Рассчитать сумму значений поля discount для всех объектов.
        </div>
        <UButton @click="refreshAll"
                 color="purple"
                 class="h-12 w-30 rounded-xl font-semibold text-lg">
          Обновить
        </UButton>
        <div class="self-start text-center h-20 w-48 p-4 text-4xl border-4 border-purple-300 rounded-xl">
          {{sums}}
        </div>
      </div>
    </template>
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
const url = config.public.baseURL + '/tickets/discount/sum'
const errorHappened = ref(false)



const {data: sums, pending, error} = await useFetch(url, {
  key: 'sum',
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
    await refreshNuxtData('sum')
  } finally {
  }
}


</script>
