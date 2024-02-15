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
            <UFormGroup label="page size" :ui="{ label: { base: 'text-black font-semibold' } }">
                <USelect v-model="limit" :options="limitOptions"/>
            </UFormGroup>
          </div>
          <div>
            <UFormGroup label="page offset" class="w-20" :ui="{ label: { base: 'text-black font-semibold' } }">
                <UInput v-model="offset" type="number" step="1" min="0" />
            </UFormGroup>
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

        </UForm>






      </div>


      <UTable v-show="!formActive" :rows="tickets" :columns="columns" :loading="pending" @select="select" :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }">

      </UTable>
      <tickets-form v-show="formActive">

      </tickets-form>


      <template #footer>

      </template>
   </UCard>
<!--  <UNotifications-->
<!--    :ui="{-->
<!--    title: 'text-black font-italic'-->
<!--    }"-->

<!--  />-->
</template>

<script lang="ts" setup>

//Store
// const toast = useToast()
// function displayError () {
//   toast.add({
//     id: 'Error',
//     title: 'ERROR',
//     description: serverError,
//     icon: 'i-heroicons-x-circle',
//     timeout: 0,
//     actions: [{
//       label: 'OK',
//       click: () => {
//
//       }
//     }]
//   })
// }
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

const formActive = ref(false)
function revertFormActive() {
  formActive.value = !formActive.value
}

const filterField = ref('id')
const filterOption = ref('[gt]=')
const filterValue = ref('0')
const offset = ref(0)
const limit = ref(10)
const filter = ref(filterField.value + filterOption.value + filterValue.value)
function applyFilter () {
  filter.value = filterField.value + filterOption.value + filterValue.value;
}
const sortField = ref('id')
const sortMode = ref('')
const sort = ref(sortMode.value + sortField.value)
function applySort () {
  sort.value = sortMode.value + sortField.value;
}

const config = useRuntimeConfig();


const url = config.public.baseURL + '/tickets'
console.log('base url is' , url)
const {pending, data: tickets, error: serverError, refresh} = await useFetch(url, {
  lazy: true,
  server: false,
  query: { offset, limit, filter, sort},
  // immediate: false,
  default: () => []
})

console.log(serverError)



//
// const { data: count, pending } = await useLazyAsyncData<{
//   id: number
//   name: string,
//   coordinates: string,
//   creationDate: string,
//   price: number,
//   discount: number,
//   refundable: boolean,
//   type: string,
//   event: string
// }[]>('count', () => ($fetch as any)(url, {
//   query: {
//     '_offset': offset.value,
//     '_limit': limit.value,
//     '_filter': filter.value,
//     '_sort': sort.value
//   }
// }), {
//   default: () => [],
//   watch: [offset, limit, filter, sort]
// })

// Columns
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


const ticketTypes = [{
   key: 'VIP',
   label: 'VIP',
   value: 'VIP'
}, {
   key: 'USUAL',
   label: 'Usual',
   value: 'USUAL'
}, {
  key: 'BUDGETARY',
  label: 'Budgetary',
  value: 'BUDGETARY'
}, {
  key: 'CHEAP',
  label: 'Cheap',
  value: 'CHEAP'
}]

</script>

<style lang="less"></style>