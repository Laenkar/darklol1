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
      <div class="flex items-center justify-between gap-3 px-4 py-3">
         <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
         <NuxtLink to="/tickets/ticketId">
           <MyButton style="width: 170px; height: 30px; ">Create ticket</MyButton>
         </NuxtLink>
<!--         <USelectMenu v-model="selectedStatus" :options="ticketTypes" multiple placeholder="Type" class="w-40" />-->
      </div>

      <!-- Header and Action buttons -->
      <div class="flex justify-between items-center w-full px-4 py-3">
         <div class="flex items-center gap-1.5">
            <span class="text-sm leading-5">Rows per page:</span>

            <USelect v-model="pageCount" :options="[3, 5, 10, 20, 30, 40]" class="me-2 w-20" size="xs" />
         </div>

         <div class="flex gap-1.5 items-center">

           <USelectMenu v-model="selectedColumns" :options="columns" multiple>
             <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
               Columns
             </UButton>
           </USelectMenu>

            <UButton icon="i-heroicons-funnel" color="gray" size="xs"
               :disabled="search === '' && selectedStatus.length === 0" @click="resetFilters">
               Reset
            </UButton>
         </div>
      </div>

      <!-- Table -->
<!--      <UTable v-model:sort="sort" :rows="todos" :columns="columnsTable" :loading="pending"-->
<!--         sort-asc-icon="i-heroicons-arrow-up" sort-desc-icon="i-heroicons-arrow-down" sort-mode="manual" class="w-full"-->
<!--         :ui="{ td: { base: 'max-w-[0] truncate' } }" @select="select">-->
<!--&lt;!&ndash;         <template #completed-data="{ row }">&ndash;&gt;-->
<!--&lt;!&ndash;            <UBadge size="xs" :label="row.completed ? 'Completed' : 'In Progress'"&ndash;&gt;-->
<!--&lt;!&ndash;               :color="row.completed ? 'emerald' : 'orange'" variant="subtle" />&ndash;&gt;-->
<!--&lt;!&ndash;         </template>&ndash;&gt;-->

<!--&lt;!&ndash;         <template #actions-data="{ row }">&ndash;&gt;-->
<!--&lt;!&ndash;            <UButton v-if="!row.completed" icon="i-heroicons-check" size="2xs" color="emerald" variant="outline"&ndash;&gt;-->
<!--&lt;!&ndash;               :ui="{ rounded: 'rounded-full' }" square />&ndash;&gt;-->

<!--&lt;!&ndash;            <UButton v-else icon="i-heroicons-arrow-path" size="2xs" color="orange" variant="outline"&ndash;&gt;-->
<!--&lt;!&ndash;               :ui="{ rounded: 'rounded-full' }" square />&ndash;&gt;-->
<!--&lt;!&ndash;         </template>&ndash;&gt;-->
<!--      </UTable>-->

      <div>
        <h1>Data is {{count}}</h1>
        <h2>Data is {{count2}}</h2>

      </div>
      <!-- Number of rows & Pagination -->
      <template #footer>

      </template>
   </UCard>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

// const url = 'https://catfact.ninja/fact'
const url = 'https://127.0.0.1:9443/tickets'
console.log('================')
console.log('base url is' , url)
const { data: count } = await useFetch(url)
console.log(count)
console.log('================')
const url2 = 'https://catfact.ninja/fact'
console.log('base url is' , url2)
const { data: count2 } = await useFetch('https://catfact.ninja/fact')
console.log(count2)
console.log('================')
// Table scripts
// Columns
const columns = [{
   key: 'id',
   label: '#',
   sortable: true
}, {
   key: 'name',
   label: 'Name',
   sortable: true
}, {
   key: 'coordinates',
   label: 'Coordinates',
   sortable: true
}, {
   key: 'creationDate',
   label: 'Creation date',
   sortable: true
},{
   key: 'price',
   label: 'Price',
   sortable: true
},{
   key: 'discount',
   label: 'Discount',
   sortable: true
},{
   key: 'refundable',
   label: 'Refundable',
   sortable: true
},{
   key: 'type',
   label: 'Type',
   sortable: true
},{
   key: 'event',
   label: 'Event',
   sortable: true
},]

const selectedColumns = ref(columns)
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

// Selected Rows
const selectedRows = ref([])

function select(row) {
   const index = selectedRows.value.findIndex((item) => item.id === row.id)
   if (index === -1) {
      selectedRows.value.push(row)
   } else {
      selectedRows.value.splice(index, 1)
   }
}

// Actions
// const types = [
//    [{
//       key: 'VIP',
//       label: 'VIP',
//       icon: 'i-heroicons-check'
//    }], [{
//       key: 'uncompleted',
//       label: 'In Progress',
//       icon: 'i-heroicons-arrow-path'
//    }]
// ]

// Filters
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

const search = ref('')
const selectedStatus = ref([])
const searchStatus = computed(() => {
   if (selectedStatus.value?.length === 0) {
      return ''
   }

   if (selectedStatus?.value?.length > 1) {
      return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`
   }

   return `?completed=${selectedStatus.value[0].value}`
})

const resetFilters = () => {
   search.value = ''
   selectedStatus.value = []
}

</script>

<style lang="less"></style>