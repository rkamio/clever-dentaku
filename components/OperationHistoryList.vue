<template>
  <v-container>
    <v-list three-line v-if="$store.state.history.operationHistory.length > 0">
      <template v-for="(item, index) in $store.state.history.operationHistory">
        <v-divider v-if="index !== 0 && index !== $store.state.history.operationHistory.length - 1" :key="index"></v-divider>
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
}
</script>
