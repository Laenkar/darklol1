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
      <div class="flex items-center justify-between gap-3 px-4 py-3">
        <MyButton style="width: 170px; height: 30px; background-color: forestgreen">Создать мероприятие</MyButton>
        <MyButton style="width: 170px; height: 30px; background-color: brown"></MyButton>
        <MyButton style="width: 170px; height: 30px; background-color: orange">Update event</MyButton>
      </div>
    </template>

    <UForm :validate="validate" :state="state" class="grid grid-cols-6 grid-flow-row gap-4 justify-between" @submit="onSubmit" >
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
        <UFormGroup label="Date" name="date" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.date" type="date"/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Minimal age" name="minAge" :ui="{ label: { base: 'text-black font-semibold' } }">
          <UInput v-model="state.minAge" type="number" step="1" min="0" max="35"/>
        </UFormGroup>
      </div>

      <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
        <UFormGroup label="Type" name="type" :ui="{ label: { base: 'text-black font-semibold' } }">
          <USelect v-model="state.eventType" :options="eventTypes" />
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
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  id: undefined,
  name: undefined,
  date: undefined,
  minAge: undefined,
  eventType: undefined
})

const eventTypes = [
  {
    label: "Baseball match",
    value: "BASEBALL"
  },
  {
    label: "Basketball match",
    value: "BASKETBALL"
  },
  {
    label: "Concert",
    value: "CONCERT"
  },
  {
    label: "Theatre performance",
    value: "THEATRE_PERFORMANCE"
  },
  {
    label: "(нет)",
    value: ""
  }
]

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Field is required!' })

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