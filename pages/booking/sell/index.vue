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
        Продажа
      </h1>
      <nav style="display: flex; justify-content: center">
        <UButton color="purple"
                 @click="onVipClick"
                 class="h-8 w-80 rounded-xl font-semibold text-xl justify-center">VIP билет</UButton>
        <UButton color="purple"
                 @click="onDiscountClick"
                 class="h-8 w-80 rounded-xl font-semibold text-xl justify-center">Индивидуальная скидка</UButton>
      </nav>
    </template>

    <div class="flex justify-center">
      <div class="h-20 w-48 p-4  border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Номер человека" name="personId" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="personId" type="number" step="1" min="1" max="1000000000"/>
        </UFormGroup>
      </div>
    <div class="h-20 w-48 p-4 grid grid-col-3 border-4 border-purple-300 rounded-xl">
      <UFormGroup label="Номер билета" name="ticketId" :ui="{ label: { base: 'text-black font-semibold' } }">
        <UInput v-model="ticketId" type="number" step="1" min="1" max="1000000000"/>
      </UFormGroup>
    </div>
    <div class="h-20 w-48 p-4 grid grid-col-3 border-4 border-purple-300 rounded-xl">
      <UFormGroup label="Желаемая скидка" name="discount" :ui="{ label: { base: 'text-black font-semibold' } }">
        <UInput v-model="discount" type="number" step="0.01" min="1" max="100"/>
      </UFormGroup>
    </div>
    </div>

  </UCard>
  <UModal v-model="errorHappened" prevent-close >
    <div class="mx-auto max-w-md justify-items-center grid">
      <div class="mx-auto max-w-md p-4 text-lg text-center font-semibold">
        {{ errorMsg }}
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
const url = config.public.baseURL + '/booking/sell'
const router = useRouter()
const errorHappened = ref(false)
const errorMsg = ref()
const personId = ref(undefined)
const ticketId = ref(undefined)
const discount = ref(undefined)

function onVipClick () {
  if (!ticketId.value || !personId.value){
    errorMsg.value = "Номер билета и номер человека должны быть заполнены!"
    errorHappened.value = true
  } else {
    // router.navigateTo(`/booking/sell/vip/${ticketId.value}/${personId.value}`)
    router.push(`/booking/sell/vip/${ticketId.value}/${personId.value}`)
  }
}

function onDiscountClick () {
  if (!ticketId.value || !personId.value || !discount.value){
    errorMsg.value = "Номер билета, номер человека и скидка должны быть заполнены!"
    errorHappened.value = true
  } else {
    router.push(`/booking/sell/discount/${ticketId.value}/${personId.value}/${discount.value}`)
  }
}



</script>
