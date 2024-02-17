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
          Индивидуальный VIP билет
        </h1>
        <div >
          Скопировать указанный билет, создав такой же, но с категорией "VIP" и с удвоенной ценой
        </div>
        <UButton @click="getDiscount"
                 color="purple"
                 class="h-12 w-30 rounded-xl font-semibold text-lg">
          Получить
        </UButton>
      </div>
    </template>
    <div class="grid grid-cols-5 grid-flow-row gap-4 justify-between">
      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Номер" name="id" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.id" disabled/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Наименование" name="name" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.name" type="text" disabled/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Координата X" name="coordinateX" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.coordinateX" type="number" step="1" min="-686" disabled/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Координата Y" name="coordinateY" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.coordinateY" type="number" step="0.01" disabled/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Дата создания" name="creationDate" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.creationDate" type="date" step="0.01" disabled/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Цена" name="price" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.price" type="number" step="0.01" min="1" max="1000000000" disabled/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Скидка" name="discount" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.discount" type="number" step="0.01" min="1" max="100" disabled/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Возвратный" name="refundable" :ui="{ label: { base: 'text-black font-semibold' } }">
          <USelect v-model="state.refundable" :options="boolOption" disabled/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Тип" name="type" :ui="{ label: { base: 'text-black font-semibold' } }">
          <USelect v-model="state.type" :options="ticketTypes" disabled/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Номер события" name="eventId" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.eventId" disabled/>
        </UFormGroup>
      </div>

      <div v-show="!isUpdateMode" class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup  label="Событие" name="eventId" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.eventName" disabled/>
        </UFormGroup>
      </div>
    </div>
  </UCard>
  <UModal v-model="errorHappened" prevent-close >
    <div class="mx-auto max-w-md justify-items-center grid">
      <div class="mx-auto max-w-md p-4 text-lg text-center font-semibold">
        {{errorMsg}}
      </div>
      <NuxtLink to="/booking/sell">
        <UButton color="purple"
                 @click="errorHappened=true"
                 class="rounded-xl font-semibold text-xl justify-center h-12 w-16"
                 label="OK"
        />
      </NuxtLink>

    </div>
  </UModal>
  <UModal v-model="operationSuccess" prevent-close >
    <div class="mx-auto max-w-md justify-items-center grid">
      <div class="mx-auto max-w-md p-4 text-lg text-center font-semibold">
        {{successMsg}}
      </div>
      <UButton color="purple"
               @click="operationSuccess=false"
               class="rounded-xl font-semibold text-xl justify-center h-12 w-16"
               label="OK"
      />

    </div>
  </UModal>

</template>

<script lang="ts" setup>

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig()
const url = config.public.baseURLSecond + route.path
const ticketId = ref(null);
const personId = ref(null);
const discount = ref(null);
const errorHappened = ref(false)
const operationSuccess = ref(false)
const errorMsg = ref()
const successMsg = ref()
const sums = ref(0)

onMounted(() => {
  // Get parameters from the route
  const { ticketId: tId, personId: pId} = router.currentRoute.value.params;

  // Check if all parameters are present
  if (!isNaN(tId) && !isNaN(pId)) {
    // Assign parameter values to refs
    ticketId.value = parseInt(tId);
    personId.value = parseInt(pId);
  } else {
    // Redirect to a different route if any parameter is not a number
    errorHappened.value = true
    errorMsg.value = "Недопустимый путь! Валидный путь: /booking/sell/vip/[число]/[число]"
  }
})


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

watch(sums, (newValue) => {
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

const getDiscount = async () => {

  const { data: newTicket, error: ticketError } = await useFetch(url, {
    method: 'POST',
  })
  sums.value = newTicket.value
  if (ticketError.value?.data) {
    errorHappened.value=true
    errorMsg.value=ticketError.value.data
  } else {
    operationSuccess.value = true
    successMsg.value = "Индивидуальный VIP билет создан!"
  }

}



</script>
