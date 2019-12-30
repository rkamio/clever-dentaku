<template>
  <v-container fluid v-touch:swipe.right="() => { if($vuetify.breakpoint.xs) $router.push('/operation-history') }">
    <div>
      ユーザーページモック
    </div>
  </v-container>
</template>

<script>

</script>

<style>

</style>