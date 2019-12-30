<template>
  <v-container>
    <v-list three-line v-if="items.length > 0">
      <template v-for="(item, index) in items">
        <v-divider v-if="index !== 0 && index !== items.length - 1" :key="index"></v-divider>
        <v-list-item :key="item.calculation" @click="">
          <v-list-item-content>
            <v-list-item-title v-if="item.fomula!==''">{{ '計算式 : ' + item.fomula + '=' + item.calculatedResult }}</v-list-item-title>
            <v-list-item-subtitle v-if="item.convertedResult !== ''"> 
              {{ item.calculatedResult + ' = ' + item.convertedResult + ' (' +item.convertTo + ')' }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <p v-else>現在、履歴はありません。</p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: this.$store.state.history.operationHistory
    };
  }
}
</script>
