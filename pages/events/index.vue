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
        События
      </h1>
      <div>
        <nav style="display: flex; justify-content: center">
          <!--            <MyButton @click="displayError">Notify</MyButton>-->
          <UButton v-on:click="revertFormActive" v-show="!formActive" color="purple"
                   class="h-8 w-80 rounded-xl font-semibold text-xl justify-center">Создать событие</UButton>
          <UButton v-on:click="revertFormActive" v-show="formActive" color="purple"
                   class="h-8 w-80 rounded-xl font-semibold text-xl justify-center">Перейти к таблице</UButton>
<!--          <NuxtLink to="/events/type">-->
<!--            <UButton color="purple"-->
<!--                     class="h-8 w-80 rounded-xl font-semibold text-xl justify-center">Расчёт по типам</UButton>-->
<!--          </NuxtLink>-->
        </nav>
        <slot />
      </div>
    </template>

    <!-- Filters -->
    <div v-show="!formActive" class="flex items-center gap-3 px-4 py-3">
      <UForm class="flex items-center gap-3 px-4 py-3">
        <div>
          <UFormGroup label="Поле фильтрации" :ui="{ label: { base: 'text-black font-semibold' } }">
            <USelect  v-model="filterField" :options="filterFields"/>
          </UFormGroup>
        </div>
        <div>
          <UFormGroup label="Опция фильтрации" :ui="{ label: { base: 'text-black font-semibold' } }">
            <USelect v-model="filterOption" :options="filterOptions"/>
          </UFormGroup>
        </div>
        <div>
          <UFormGroup label="Значение фильтра" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="filterValue" type="text"/>
          </UFormGroup>
        </div>
        <div>
          <UButton v-on:click="applyFilter" color="purple" class="h-8 w-28 rounded-xl font-semibold justify-center">
            Фильтровать
          </UButton>
        </div>
        <div>
          <UFormGroup label="Поле сортировки" :ui="{ label: { base: 'text-black font-semibold' } }">
            <USelect  v-model="sortField" :options="sortFields"/>
          </UFormGroup>
        </div>
        <div>
          <UFormGroup label="Режим сортировки" :ui="{ label: { base: 'text-black font-semibold' } }">
            <USelect  v-model="sortMode" :options="sortModes"/>
          </UFormGroup>
        </div>
        <div>
          <UButton v-on:click="applySort" color="purple" class="h-8 w-28 rounded-xl font-semibold justify-center">
            Сортировать
          </UButton>
        </div>
        <div>
          <UFormGroup label="Размер страницы" :ui="{ label: { base: 'text-black font-semibold' } }">
            <USelect v-model="size" :options="limitOptions"/>
          </UFormGroup>
        </div>
        <div>
          <UButton v-on:click="refreshAll" color="purple" class="h-8 w-28 rounded-xl font-semibold justify-center">
            Обновить
          </UButton>
        </div>

      </UForm>

    </div>


    <UTable v-show="!formActive"
            v-model="selected"
            :rows="events"
            :columns="columns"
            :loading="pending"
            @select="goToIdOnClick"
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
            :ui="{td: { color: 'text-black dark:text-black' }}"

    >
    </UTable>
    <UCard v-show="formActive" class="w-full" :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
      footer: { padding: 'p-4' }
   }">

      <UForm :validate="validate" :state="state" class="grid grid-cols-5 grid-flow-row gap-4 justify-between" @submit="onSubmit" >

        <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Название" name="name" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.name" type="text"/>
          </UFormGroup>
        </div>

        <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Дата" name="date" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.date" type="date" />
          </UFormGroup>
        </div>

        <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Мин.Возраст" name="minAge" :ui="{ label: { base: 'text-black font-semibold' } }">
            <UInput v-model="state.minAge" type="number" step="1" min="0" max="35"/>
          </UFormGroup>
        </div>

        <div class="box-content h-20 w-48 p-4 border-4 border-purple-300 rounded-xl">
          <UFormGroup label="Тип" name="type" :ui="{ label: { base: 'text-black font-semibold' } }">
            <USelect v-model="state.eventType" :options="eventTypes" />
          </UFormGroup>
        </div>

        <div class="box-content h-20 w-48 p-4 ">
          <UButton type="submit"
                   color="purple"
                   class="h-16 w-40 rounded-xl font-semibold text-xl justify-center">
            Создать
          </UButton>
        </div>

      </UForm>
    </UCard>


    <template v-show="!formActive" #footer>
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
  <UModal v-model="submitClick" prevent-close >
    <div class="mx-auto max-w-md justify-items-center grid">
      <div class="mx-auto max-w-md p-4 text-lg text-center font-semibold">
        {{createEventMessage}}
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
const router = useRouter()
const config = useRuntimeConfig()
const url = config.public.baseURL + '/events'
const formActive = ref(false)
const submitClick = ref(false)
const createEventMessage = ref(undefined)

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
  // immediate: true,
  default: () => []
})
const page = ref(1)
const size = ref(10)
const pageFrom = computed(() => (page.value - 1) * size.value + 1)
const pageTo = computed(() => Math.min(page.value * size.value, pageTotal.value))


//data fetch
const {pending, data: events} = await useFetch(url, {
  key: 'events',
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

async function goToIdOnClick (row) {
  await navigateTo(`/events/${row.id}`)
}

const refreshAll = async () => {
  submitClick.value = false
  state.name = undefined
  state.date = undefined
  state.minAge = undefined
  state.eventType = undefined
  try {
    await refreshNuxtData('events')
  } finally {
    submitClick.value = false
  }
}


//models
const filterOptions = [{
  label: 'больше чем',
  value: '[gt]=',
}, {
  label: 'меньше чем',
  value: '[lt]='
}, {
  label: 'равно',
  value: '[eq]='
}, {
  label: 'не равно',
  value: '[ne]='
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

const filterFields = [{
  key: 'id',
  label: 'Номер',
  value: 'id'
}, {
  key: 'name',
  label: 'Название',
  value: 'name'
},
//   {
//   key: 'date',
//   label: 'Дата',
//   value: 'date'
// },
  {
  key: 'minAge',
  label: 'Мин.Возраст',
  value: 'minAge'
}]

const columns = [{
  key: 'id',
  label: 'Номер'
}, {
  key: 'name',
  label: 'Название'
}, {
  key: 'date',
  label: 'Дата'
},{
  key: 'minAge',
  label: 'Мин.Возраст'
},{
  key: 'eventType',
  label: 'Тип'
},]

const sortFields = [{
  key: 'id',
  label: 'Номер',
  value: 'id'
}, {
  key: 'name',
  label: 'Наименование',
  value: 'name'
}, {
  key: 'creationDate',
  label: 'Дата создания',
  value: 'creationDate'
},{
  key: 'price',
  label: 'Цена',
  value: 'price'
},{
  key: 'discount',
  label: 'Скидка',
  value: 'discount'
}]

const sortModes = [{
  label: 'Возрастание',
  value: ''
},{
  label: 'Убывание',
  value: '-'
}]

const state = reactive({
  id: undefined,
  name: undefined,
  date: undefined,
  minAge: undefined,
  eventType: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Поле необходимо заполнить!!' })

  if (state.name?.length > 255) errors.push({ path: 'name', message: 'Имя слишком длинное! Максимум 255 символов' })

  return errors
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
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: bodyParams
    }
  )

  submitClick.value=true

  if (createError.value?.data) {
    createEventMessage.value = createError.value.data.errors[0]
  } else {
    createEventMessage.value = "Событие успешно создано!"
  }

}

</script>