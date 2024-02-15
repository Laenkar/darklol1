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
<!--      <div class="flex items-center gap-3 px-4 py-3">-->
<!--           <MyButton v-on:click="revertFormActive" style="width: 170px; height: 30px; ">Create ticket</MyButton>-->
<!--      </div>-->


      <UTable v-show="!formActive" :rows="tickets" :columns="columns" :loading="pending" @select="select" :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }">

      </UTable>
      <tickets-form v-show="formActive">

      </tickets-form>


      <template #footer>

      </template>
   </UCard>

</template>

<script lang="ts" setup>

//Store
const formActive = ref(false)
function revertFormActive() {
  formActive.value = !formActive.value
}
const currentRoute = useRoute().path

const config = useRuntimeConfig();

// let count_default = [
//   {
//     "id": 2,
//     "name": "10 ряд 1 место",
//     "coordinates": {
//       "x": 500,
//       "y": 200.0
//     },
//     "creationDate": "2024-02-14",
//     "price": 1500.0,
//     "discount": 50.0,
//     "refundable": true,
//     "type": "USUAL",
//     "event": {
//       "id": 1,
//       "name": "Восемь против ДПШ",
//       "date": "2024-02-28",
//       "minAge": 6,
//       "eventType": "BASKETBALL"
//     }
//   }
// ]
const url = 'https://localhost:9443/tickets'
console.log('base url is' , url)
const {pending, data: tickets, refresh} = await useFetch(url, {
  lazy: true,
  server: false,
  // immediate: false,
  default: () => []
})

// const offset = ref(0)
// const limit = ref(5)
// const filter = ref('id[gt]=2')
// const sort = ref('type')
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
console.log(tickets)

// Columns
const columns = [{
   key: 'id',
   label: '#',
   sortable: false
}, {
   key: 'name',
   label: 'Name',
   sortable: false
}, {
   key: 'coordinates',
   label: 'Coordinates',
   sortable: false
}, {
   key: 'creationDate',
   label: 'Creation date',
   sortable: false
},{
   key: 'price',
   label: 'Price',
   sortable: false
},{
   key: 'discount',
   label: 'Discount',
   sortable: false
},{
   key: 'refundable',
   label: 'Refundable',
   sortable: false
},{
   key: 'type',
   label: 'Type',
   sortable: false
},{
   key: 'event',
   label: 'Event',
   sortable: false
},]


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