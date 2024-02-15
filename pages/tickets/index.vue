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
         <h2 class="font-semibold text-xl text-gray-900 leading-tight text-center">
            Ticket Service
         </h2>
        <div>
          <nav style="display: flex; justify-content: center">
<!--            <MyButton @click="displayError">Notify</MyButton>-->
            <MyButton v-on:click="revertFormActive" v-show="!formActive" style="width: 230px; height: 30px">Create ticket</MyButton>
            <MyButton v-on:click="revertFormActive" v-show="formActive" style="width: 230px; height: 30px">Go to table</MyButton>
            <NuxtLink to="/tickets/type">
              <MyButton style="width: 230px; height: 30px">Type options</MyButton>
            </NuxtLink>
            <NuxtLink to="/tickets/discount">
              <MyButton style="width: 230px; height: 30px">Discount options</MyButton>
            </NuxtLink>
          </nav>
          <slot />
        </div>
      </template>

      <!-- Filters -->
      <div v-show="!formActive" class="flex items-center gap-3 px-4 py-3">
        <UForm class="flex items-center gap-3 px-4 py-3">
          <div>
            <UFormGroup label="field to filter" :ui="{ label: { base: 'text-black font-semibold' } }">
                <USelect  v-model="filterField" :options="columns"/>
            </UFormGroup>
          </div>
          <div>
            <UFormGroup label="filter option" :ui="{ label: { base: 'text-black font-semibold' } }">
                <USelect v-model="filterOption" :options="filterOptions"/>
            </UFormGroup>
          </div>
          <div>
            <UFormGroup label="filter value" :ui="{ label: { base: 'text-black font-semibold' } }">
                <UInput v-model="filterValue" type="text"/>
            </UFormGroup>
          </div>
          <div>
            <UButton v-on:click="applyFilter" color="purple" class="h-8 w-28 rounded-xl font-semibold justify-center">
              Apply filter
            </UButton>
          </div>
          <div>
            <UFormGroup label="sort field" class="w-20" :ui="{ label: { base: 'text-black font-semibold' } }">
              <USelect  v-model="sortField" :options="sortFields"/>
            </UFormGroup>
          </div>
          <div>
            <UFormGroup label="sort mode" class="w-20" :ui="{ label: { base: 'text-black font-semibold' } }">
              <USelect  v-model="sortMode" :options="sortModes"/>
            </UFormGroup>
          </div>
          <div>
            <UButton v-on:click="applySort" color="purple" class="h-8 w-28 rounded-xl font-semibold justify-center">
              Apply sorting
            </UButton>
          </div>
          <div>
            <UFormGroup label="page size" :ui="{ label: { base: 'text-black font-semibold' } }">
              <USelect v-model="size" :options="limitOptions"/>
            </UFormGroup>
          </div>

        </UForm>

      </div>


      <UTable v-show="!formActive"
              v-model="selected"
              :rows="tickets"
              :columns="columns"
              :loading="pending"
              @select="printIdOnClick"
              :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }">
      </UTable>
     <UCard v-show="formActive" class="w-full" :ui="{
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
          <UFormGroup label="Name" name="name" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.name" type="text"/>
          </UFormGroup>
       </div>

       <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
         <UFormGroup label="Coordinate X" name="coordinateX" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.coordinateX" type="number" step="1" min="-686"/>
         </UFormGroup>
       </div>

       <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
         <UFormGroup label="Coordinate Y" name="coordinateY" :ui="{ label: { base: 'text-black font-semibold' } }">
           <UInput v-model="state.coordinateY" type="number" step="0.01"/>
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
          <UFormGroup label="Event id" name="eventId" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.eventId" />
          </UFormGroup>
       </div>

       <div class="box-content h-20 w-48 p-4 ">
          <UButton type="submit" color="purple" class="h-16 w-40 rounded-xl font-semibold text-xl justify-center">
            Submit
          </UButton>
       </div>

      </UForm>


</UCard>


      <template #footer>
        <div class="flex flex-wrap justify-between items-center">
          <div>
               <span class="text-sm leading-5">
                  Showing
                  <span class="font-medium">{{ pageFrom }}</span>
                  to
                  <span class="font-medium">{{ pageTo }}</span>
                  of
                  <span class="font-medium">{{ pageTotal }}</span>
                  results
               </span>
          </div>

          <UPagination v-model="page" :page-count="size" :total="pageTotal" :ui="{
               wrapper: 'flex items-center gap-1',
               rounded: '!rounded-full min-w-[32px] justify-center',
               default: {
                  activeButton: {
                     variant: 'outline'
                  }
               }
            }" >
            <template #prev="{ onClick }">
              <UTooltip text="Previous page">
                <UButton icon="i-heroicons-arrow-small-left-20-solid" color="purple" :ui="{ rounded: 'rounded-full' }" class="rtl:[&_span:first-child]:rotate-180 me-2" @click="onClick" />
              </UTooltip>
            </template>

            <template #next="{ onClick }">
              <UTooltip text="Next page">
                <UButton icon="i-heroicons-arrow-small-right-20-solid" color="purple" :ui="{ rounded: 'rounded-full' }" class="rtl:[&_span:last-child]:rotate-180 ms-2" @click="onClick" />
              </UTooltip>
            </template>

            <template #first="{ onClick }">
              <UTooltip text="First page">
                <UButton icon="i-heroicons-arrow-uturn-left" color="purple" :ui="{ rounded: 'rounded-full' }" class="rtl:[&_span:first-child]:rotate-180 me-2" @click="onClick" />
              </UTooltip>
            </template>

            <template #last="{ onClick }">
              <UTooltip text="Last page">
                <UButton icon="i-heroicons-arrow-uturn-right-20-solid" color="purple" :ui="{ rounded: 'rounded-full' }" class="rtl:[&_span:last-child]:rotate-180 ms-2" @click="onClick" />
              </UTooltip>
            </template>

          </UPagination>
        </div>
      </template>
   </UCard>
<!--  <UNotifications-->
<!--    :ui="{-->
<!--    title: 'text-black font-italic'-->
<!--    }"-->

<!--  />-->
</template>

<script lang="ts" setup>

//store
const router = useRouter()
const config = useRuntimeConfig()
const url = config.public.baseURL + '/tickets'
const formActive = ref(false)

const filterField = ref('id')
const filterOption = ref('[gt]=')
const filterValue = ref('0')
const filter = ref(filterField.value + filterOption.value + filterValue.value)

const sortField = ref('id')
const sortMode = ref('')
const sort = ref(sortMode.value + sortField.value)


const {data: pageTotal} = await useFetch(url + '/count', {
  lazy: true,
  server: false,
  immediate: true,
  default: () => []
})
const page = ref(1)
const size = ref(10)
const pageFrom = computed(() => (page.value - 1) * size.value + 1)
const pageTo = computed(() => Math.min(page.value * size.value, pageTotal.value))



//data fetch
const {pending, data: tickets, error: serverError, refresh} = await useFetch(url, {
  lazy: true,
  server: false,
  query: { page, size, filter, sort},
  // immediate: false,
  default: () => []
})

//functions

function revertFormActive() {
  formActive.value = !formActive.value
}

function applyFilter () {
  filter.value = filterField.value + filterOption.value + filterValue.value;
}

function applySort () {
  sort.value = sortMode.value + sortField.value;
}

async function printIdOnClick (row) {
  await navigateTo(`/tickets/${row.id}`)
}


//models
const filterOptions = [{
  label: 'greater than',
  value: '[gt]=',
}, {
  label: 'less than',
  value: '[lt]='
}, {
  label: 'equal',
  value: '[eq]='
}, {
  label: 'not equal',
  value: '[ne]='
}, {
  label: 'greater or equal',
  value: '[gte]='
}, {
  label: 'less or equal',
  value: '[lte]'
}]

const limitOptions = [{
  label: '5'
},{
  label: '10'
},{
  label: '25'
},{
  label: '50'
}]

const columns = [{
   key: 'id',
   label: 'ID',
   value: 'id'
}, {
   key: 'name',
   label: 'Name',
   value: 'name'
}, {
   key: 'coordinates',
   label: 'Coordinates',
   value: 'coordinates'
}, {
   key: 'creationDate',
   label: 'Creation date',
   value: 'creationDate'
},{
   key: 'price',
   label: 'Price',
   value: 'price'
},{
   key: 'discount',
   label: 'Discount',
   value: 'discount'
},{
   key: 'refundable',
   label: 'Refundable',
   value: 'refundable'
},{
   key: 'type',
   label: 'Type',
   value: 'type'
},{
   key: 'event',
   label: 'Event',
   value: 'event'
}]

const sortFields = [{
  key: 'id',
  label: 'ID',
  value: 'id'
}, {
  key: 'name',
  label: 'Name',
  value: 'name'
}, {
  key: 'creationDate',
  label: 'Creation date',
  value: 'creationDate'
},{
  key: 'price',
  label: 'Price',
  value: 'price'
},{
  key: 'discount',
  label: 'Discount',
  value: 'discount'
}]

const sortModes = [{
  label: 'ascending',
  value: ''
},{
  label: 'descending',
  value: '-'
}]

const state = reactive ({
  name: undefined,
  coordinateX: undefined,
  coordinateY: undefined,
  price: undefined,
  discount: undefined,
  refundable: undefined,
  type: undefined,
  eventId: undefined
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
  if (!state.coordinateY) errors.push({ path: 'coordinateY', message: 'Field is required!' })
  if (!state.coordinateX) errors.push({ path: 'coordinateX', message: 'Field is required!' })
  if (!state.price) errors.push({ path: 'price', message: 'Field is required!' })
  if (!state.discount) errors.push({ path: 'discount', message: 'Field is required!' })
  if (!state.refundable) errors.push({ path: 'refundable', message: 'Field is required!' })
  if (!state.eventId) errors.push({ path: 'eventId', message: 'Field is required!' })

  // if (state.name.trim.length === 0) errors.push({ path: 'name', message: 'String cannot be empty!' })

  if (state.name.length > 255) errors.push({ path: 'name', message: 'Name is too long! 255 characters max' })

  return errors
}


async function onSubmit (event: FormSubmitEvent<any>) {

  const {error: serverError} = await useFetch(url, {
    lazy: true,
    server: false,
    method: 'POST',
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
}

</script>

<style lang="less"></style>