<template>
   <UCard class="w-full" :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
      footer: { padding: 'p-4' }
   }">
     <template v-show="currentRoute !== '/tickets'" #header">
       <div class="flex items-center justify-between gap-3 px-4 py-3" v-show="currentRoute !== '/tickets'">
         <MyButton style="width: 170px; height: 30px; background-color: brown">Delete ticket</MyButton>
         <MyButton style="width: 170px; height: 30px; background-color: orange">Update ticket</MyButton>
       </div>
     </template>

     <UForm :validate="validate" :state="state" class="grid grid-cols-5 grid-flow-row gap-4 justify-between" @submit="onSubmit" >
       <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Id" name="id" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.id" readonly/>
          </UFormGroup>
       </div>

       <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Name" name="name" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.name" type="text"/>
          </UFormGroup>
       </div>

       <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Coordinates" name="coordinates" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.coordinates" type="number" step="0.01"/>
          </UFormGroup>
       </div>

       <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Creation date" name="creationDate" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.creationDate" type="date" readonly format="YYYY-MM-DD"/>
          </UFormGroup>
       </div>

       <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Price" name="price" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.price" type="number" step="0.01" min="1" max="1000000000"/>
          </UFormGroup>
       </div>

       <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Discount" name="discount" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.discount" type="number" step="0.01" min="1" max="100"/>
          </UFormGroup>
       </div>

       <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Refundable" name="refundable" :ui="{ label: { base: 'text-black font-semibold' } }">
            <USelect v-model="state.refundable" :options="boolOption" />
          </UFormGroup>
       </div>

       <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Type" name="type" :ui="{ label: { base: 'text-black font-semibold' } }">
              <USelect v-model="state.type" :options="ticketTypes" />
          </UFormGroup>
       </div>

       <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Event" name="event" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.event" />
          </UFormGroup>
       </div>

       <div class="box-content h-20 w-48 p-4 ">
         <UButton type="submit" color="purple" class="h-16 w-40 rounded-xl font-semibold text-xl justify-center">
           Submit
         </UButton>
       </div>

     </UForm>

     <template #footer>
       <Placeholder class="h-8" />
     </template>
   </UCard>
</template>
<script setup lang="ts">

//Store
const currentRoute = useRoute().path

import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  id: undefined,
  name: undefined,
  coordinates: undefined,
  creationDate: undefined,
  price: undefined,
  discount: undefined,
  refundable: undefined,
  type: undefined,
  event: undefined
})

const boolOption = [
    {
      label: "True",
      value: true
    },
    {
      label: "False",
      value: false
    }
]

const ticketTypes = [
    {
      label: "VIP",
      value: "VIP"
    },
    {
      label: "Usual",
      value: "USUAL"
    },
    {
      label: "Budgetary",
      value: "BUDGETARY"
    },
    {
      label: "Cheap",
      value: "CHEAP"
    }
]

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Field is required!' })
  if (!state.coordinates) errors.push({ path: 'coordinates', message: 'Field is required!' })
  if (!state.price) errors.push({ path: 'price', message: 'Field is required!' })
  if (!state.discount) errors.push({ path: 'discount', message: 'Field is required!' })
  if (!state.refundable) errors.push({ path: 'refundable', message: 'Field is required!' })
  if (!state.event) errors.push({ path: 'event', message: 'Field is required!' })

  if (state.name.trim.length === 0) errors.push({ path: 'name', message: 'String cannot be empty!' })

  if (state.name.length > 255) errors.push({ path: 'name', message: 'Name is too long! 255 characters max' })



  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}
</script>
<style lang="less">
   
</style>