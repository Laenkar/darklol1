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
          Сумма типов
        </h1>
        <div >
          Вернуть количество объектов, значение поля type которых меньше заданного.
        </div>
        <UButton @click="refreshAll"
                 color="purple"
                 class="h-12 w-30 rounded-xl font-semibold text-lg">
          Обновить
        </UButton>
        <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Тип" name="type" :ui="{ label: { base: 'text-black font-semibold' } }">
            <USelect v-model="type" :options="ticketTypes" />
          </UFormGroup>
        </div>
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
const url = config.public.baseURL + '/tickets/type/count'
const errorHappened = ref(false)
const type = ref("VIP")
const sums = ref(0)

watch(errorHappened, (newError) => {
  if (newError) {
    errorHappened.value = true
  }
})

const refreshAll = async () => {
  try {
    const { data } = await useFetch(url, {
      method: 'POST',
      body: { type: type.value }
    })
    sums.value = data
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

const ticketTypes = [
  {
    label: "ВИП",
    value: "VIP"
  },
  {
    label: "Обычный",
    value: "USUAL"
  },
  {
    label: "Бюджетный",
    value: "BUDGETARY"
  },
  {
    label: "Дешёвый",
    value: "CHEAP"
  }
]


</script>
