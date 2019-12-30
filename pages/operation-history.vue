<template>
  <v-container 
    fluid 
    v-touch:swipe.right="() => { if($vuetify.breakpoint.xs) $router.push('/') }" 
    v-touch:swipe.left="() => { if($vuetify.breakpoint.xs) $router.push('/users/') }"
  >
    <h1>履歴</h1>
    <OperationHistoryList />
  </v-container>
</template>

<script>
import OperationHistoryList from "~/components/OperationHistoryList.vue"

export default {
  components: {
    OperationHistoryList
  }
}
</script>

<style>

</style>