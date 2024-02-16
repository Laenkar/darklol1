<template>
  <UCard class="w-full" :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
      footer: { padding: 'p-4' }
   }">
    <template #header class="grid">
      <h1 class="text-4xl text-center font-semibold">Просмотр события</h1>
      <div class="flex justify-end gap-3 px-4 py-3">
        <UButton @click="isDeleteMode=true" color="red" class="h-8 w-36 rounded-xl font-semibold justify-center">Удалить событие</UButton>
        <UButton @click="revertUpdateMode" color="yellow" class="h-8 w-36 rounded-xl font-semibold justify-center">Обновить событие</UButton>
      </div>
    </template>

    <UForm :validate="validate" :state="state" class="grid grid-cols-5 grid-flow-row gap-4 justify-between" @submit="onSubmit" >

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Номер" name="id" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="route.params.id" disabled/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Название" name="name" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.name" type="text" :disabled="!isUpdateMode"/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Дата" name="date" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.date" type="date" :disabled="!isUpdateMode"/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Мин.Возраст" name="minAge" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.minAge" type="number" step="1" min="0" max="35" :disabled="!isUpdateMode"/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Тип" name="type" :ui="{ label: { base: 'text-black font-semibold' } }">
          <USelect v-model="state.eventType" :options="eventTypes" :disabled="!isUpdateMode"/>
        </UFormGroup>
      </div>

      <div v-show="isUpdateMode" class="box-content h-20 w-48 p-4 ">
        <UButton  type="submit" color="purple" class="h-16 w-40 rounded-xl font-semibold text-xl justify-center">
          Применить
        </UButton>
      </div>

    </UForm>
  </UCard>
  <UModal v-model="eventIdNotExist" prevent-close >
    <div class="mx-auto max-w-md justify-items-center grid">
      <div class="mx-auto max-w-md p-4 text-lg text-center font-semibold">
        Событие с номером {{route.params.id}} не найден!
      </div>
      <NuxtLink to="/events">
        <UButton color="purple"
                 class="rounded-xl font-semibold text-xl justify-center h-12 w-16"
                 label="OK"
        />
      </NuxtLink>

    </div>
  </UModal>
  <UModal v-model="isDeleteMode" prevent-close >
    <div class="mx-auto max-w-md justify-items-center grid">
      <div class="mx-auto max-w-md p-4 text-lg text-center font-semibold">
        Вы действительно хотите удалить событие?
      </div>
      <div>
        <UButton color="red"
                 class="rounded-xl font-semibold text-xl justify-center h-12 w-16"
                 label="Да"
                 @click="onDelete"
        />
        <UButton color="purple"
                 class="rounded-xl font-semibold text-xl justify-center h-12 w-16"
                 label="Нет"
                 @click="isDeleteMode=false"
        />
      </div>

    </div>
  </UModal>
  <UModal v-model="submitClick" prevent-close >
    <div class="mx-auto max-w-md justify-items-center grid">
      <div class="mx-auto max-w-md p-4 text-lg text-center font-semibold">
        {{showEventMessage}}
      </div>
      <UButton color="purple"
               class="rounded-xl font-semibold text-xl justify-center h-12 w-16"
               @click="refreshAll"
               label="OK"
      />
    </div>
  </UModal>

</template>

<script lang="ts" setup>

//store
const isUpdateMode = ref(false)
const isDeleteMode = ref(false)
const route = useRoute()
const config = useRuntimeConfig()
const url = config.public.baseURL + `/events/${route.params.id}`
const submitClick = ref(false)
const showEventMessage = ref(undefined)
const eventIdNotExist = ref(false)

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id)
  }
})

const {pending, data: ticket, error: noTicketError} = await useFetch(url, {
  lazy: true,
  server: false,
  // immediate: false,
  default: () => ({}),
})

const state = reactive({
  name: undefined,
  date: undefined,
  minAge: undefined,
  eventType: undefined
})

watch(ticket, (newValue) => {
  if (newValue) {
    state.name = newValue.name
    state.date = newValue.date
    state.minAge = newValue.minAge
    state.eventType = newValue.eventType
  }
})

watch(noTicketError, (newError) => {
  if (newError) {
    eventIdNotExist.value = true
  }
})

const refreshAll = async () => {
  submitClick.value = false
  try {
    await refreshNuxtData()
  } finally {
    submitClick.value = false
    isUpdateMode.value = false
    isDeleteMode.value = false
  }
}

function revertUpdateMode () {
  isUpdateMode.value = !isUpdateMode.value
}

const eventTypes = [
  {
    label: "Бейсбольный матч",
    value: "BASEBALL"
  },
  {
    label: "Баскетбольный матч",
    value: "BASKETBALL"
  },
  {
    label: "Концерт",
    value: "CONCERT"
  },
  {
    label: "Театральное выступление",
    value: "THEATRE_PERFORMANCE"
  }
]

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Поле необходимо заполнить!!' })

  if (state.name?.length > 255) errors.push({ path: 'name', message: 'Имя слишком длинное! Максимум 255 символов' })

  return errors
}

async function onSubmit () {

  const bodyParams = {};
  for (const [key, value] of Object.entries(state)) {
    if (value !== undefined) {
      bodyParams[key] = value;
    }
  }

  const {error: createError} = await useFetch(url, {
    lazy: true,
    server: false,
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: bodyParams
  })

  submitClick.value=true

  if (createError.value?.data) {
    showEventMessage.value = createError.value.data.errors[0]
  } else {
    showEventMessage.value = "Событие успешно изменёно!"
  }

}

async function onDelete () {
  const {error: deleteError, data: deleteStatus} = await useFetch(url, {
    lazy: true,
    server: false,
    method: 'DELETE'
  })

  if (deleteStatus.value === "deleted") {
    isDeleteMode.value=false
    eventIdNotExist.value=true
  } else {
    submitClick.value=true
    showEventMessage.value = deleteError.value.data.errors[0]
  }

}

</script>
