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
      <h1 class="text-4xl text-center font-semibold">Просмотр билета</h1>
    <div class="flex justify-end gap-3 px-4 py-3">
      <UButton @click="isDeleteMode=true" color="red" class="h-8 w-36 rounded-xl font-semibold justify-center">Удалить билет</UButton>
      <UButton @click="revertUpdateMode" color="yellow" class="h-8 w-36 rounded-xl font-semibold justify-center">Обновить билет</UButton>
    </div>
    </template>

<UForm :validate="validate" :state="state" class="grid grid-cols-5 grid-flow-row gap-4 justify-between" @submit="onSubmit" >

  <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
    <UFormGroup label="Номер" name="id" :ui="{ label: { base: 'text-black font-semibold' } }">
      <UInput v-model="state.id" disabled/>
    </UFormGroup>
  </div>

<div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
  <UFormGroup label="Наименование" name="name" :ui="{ label: { base: 'text-black font-semibold' } }">
    <UInput v-model="state.name" type="text" :disabled="!isUpdateMode"/>
  </UFormGroup>
</div>

<div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
  <UFormGroup label="Координата X" name="coordinateX" :ui="{ label: { base: 'text-black font-semibold' } }">
    <UInput v-model="state.coordinateX" type="number" step="1" min="-686" :disabled="!isUpdateMode"/>
  </UFormGroup>
</div>

<div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
  <UFormGroup label="Координата Y" name="coordinateY" :ui="{ label: { base: 'text-black font-semibold' } }">
    <UInput v-model="state.coordinateY" type="number" step="0.01" :disabled="!isUpdateMode"/>
  </UFormGroup>
</div>

  <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
    <UFormGroup label="Дата создания" name="creationDate" :ui="{ label: { base: 'text-black font-semibold' } }">
      <UInput v-model="state.creationDate" type="date" step="0.01" disabled/>
    </UFormGroup>
  </div>

<div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
  <UFormGroup label="Цена" name="price" :ui="{ label: { base: 'text-black font-semibold' } }">
    <UInput v-model="state.price" type="number" step="0.01" min="1" max="1000000000" :disabled="!isUpdateMode"/>
  </UFormGroup>
</div>

<div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
  <UFormGroup label="Скидка" name="discount" :ui="{ label: { base: 'text-black font-semibold' } }">
    <UInput v-model="state.discount" type="number" step="0.01" min="1" max="100" :disabled="!isUpdateMode"/>
  </UFormGroup>
</div>

<div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
  <UFormGroup label="Возвратный" name="refundable" :ui="{ label: { base: 'text-black font-semibold' } }">
    <USelect v-model="state.refundable" :options="boolOption" :disabled="!isUpdateMode"/>
  </UFormGroup>
</div>

<div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
  <UFormGroup label="Тип" name="type" :ui="{ label: { base: 'text-black font-semibold' } }">
    <USelect v-model="state.type" :options="ticketTypes" :disabled="!isUpdateMode"/>
  </UFormGroup>
</div>

<div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
  <UFormGroup label="Номер события" name="eventId" :ui="{ label: { base: 'text-black font-semibold' } }">
    <UInput v-model="state.eventId" :disabled="!isUpdateMode"/>
  </UFormGroup>
</div>

  <div v-show="!isUpdateMode" class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
    <UFormGroup  label="Событие" name="eventId" :ui="{ label: { base: 'text-black font-semibold' } }">
      <UInput v-model="state.eventName" disabled/>
    </UFormGroup>
  </div>

<div v-show="isUpdateMode" class="box-content h-20 w-48 p-4 ">
  <UButton  type="submit" color="purple" class="h-16 w-40 rounded-xl font-semibold text-xl justify-center">
    Submit
  </UButton>
</div>

</UForm>
</UCard>
  <UModal v-model="ticketIdNotExist" prevent-close >
    <div class="mx-auto max-w-md justify-items-center grid">
      <div class="mx-auto max-w-md p-4 text-lg text-center font-semibold">
        Билет с номером {{route.params.id}} не найден!
      </div>
      <NuxtLink to="/tickets">
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
        Вы действительно хотите удалить билет?
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
        {{showTicketMessage}}
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
const url = config.public.baseURL + `/tickets/${route.params.id}`
const submitClick = ref(false)
const showTicketMessage = ref(undefined)
const ticketIdNotExist = ref(false)

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
const state = reactive ({
  id: undefined,
  name: undefined,
  coordinateX: undefined,
  coordinateY: undefined,
  creationDate: undefined,
  price: undefined,
  discount: undefined,
  refundable: undefined,
  type: undefined,
  eventId: undefined,
  eventName: undefined
})

watch(ticket, (newValue) => {
  if (newValue) {
    state.id = newValue.id
    state.name = newValue.name
    state.coordinateX = newValue.coordinates?.x
    state.coordinateY = newValue.coordinates?.y
    state.price = newValue.price
    state.creationDate = newValue.creationDate
    state.discount = newValue.discount
    state.refundable = newValue.refundable
    state.type = newValue.type
    state.eventId = newValue.event?.id
    state.eventName = newValue.event?.name
    // ticketExists.value = noTicketError.value.data.errors[0]
  }
})

watch(noTicketError, (newError) => {
  if (newError) {
    ticketIdNotExist.value = true
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


const boolOption = [
  {
    label: "Да",
    value: "true"
  },
  {
    label: "Нет",
    value: "false"
  }
]

const ticketTypes = [
  {
    label: "VIP",
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

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Поле необходимо заполнить!' })
  if (!state.coordinateY) errors.push({ path: 'coordinateY', message: 'Поле необходимо заполнить!' })
  if (!state.coordinateX) errors.push({ path: 'coordinateX', message: 'Поле необходимо заполнить!' })
  if (!state.price) errors.push({ path: 'price', message: 'Поле необходимо заполнить!' })
  if (!state.discount) errors.push({ path: 'discount', message: 'Поле необходимо заполнить!' })
  if (!state.refundable) errors.push({ path: 'refundable', message: 'Поле необходимо заполнить!' })
  if (!state.eventId) errors.push({ path: 'eventId', message: 'Поле необходимо заполнить!' })

  if (state.name?.length > 255) errors.push({ path: 'name', message: 'Имя слишком длинное! Максимум 255 символов' })

  return errors
}

async function onSubmit () {

  const {error: createError} = await useFetch(url, {
    lazy: true,
    server: false,
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: {
      name: `${state.name}`,
      coordinates: {
        x: `${state.coordinateX}`,
        y: `${state.coordinateY}`
      },
      price: `${state.price}`,
      discount: `${state.discount}`,
      refundable: (state.refundable === 'true'),
      type: `${state.type}`,
      event: {
        id: `${state.eventId}`,
      }
    }
  })

  submitClick.value=true

  if (createError.value?.data) {
    showTicketMessage.value = createError.value.data.errors[0]
  } else {
    showTicketMessage.value = "Билет успешно изменён!"
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
    ticketIdNotExist.value=true
  } else {
      submitClick.value=true
      showTicketMessage.value = deleteError.value.data.errors[0]
  }

}

</script>
