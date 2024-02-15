<template>
  <tickets-form>

  </tickets-form>
</template>

<script lang="ts" setup>

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id)
  }
})



</script>

<style scoped>

</style>