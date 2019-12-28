<template>
  <v-container>
    <div>
      <v-text-field v-model="search" label="検索" single-line hide-details></v-text-field>
      <br/>
      <v-data-table 
        :headers="headers" 
        :items="units" 
        :search="search" 
        :page.sync="page" 
        :items-per-page="itemsPerPage" 
        hide-default-footer 
        @page-count="pageCount=$event"
        no-data-text="現在、データがありません。"
        no-results-text="見つかりませんでした。"
      >
        <template v-slot:item.name="{ item }">
          <v-btn>{{ item.name }}</v-btn>
        </template>
        <template v-slot:item.isFavorite="{ item }">
          <v-btn text icon @click="editFavorite(item)">
            <v-icon color="yellow" v-if="item.isFavorite" >mdi-star</v-icon>
            <v-icon color="grey lighten-1" v-else>mdi-star</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        search: '',
        headers: [
          { text: '名前', value: 'name' },
          { text: "1単位", value: "perUnit"},
          { text: 'カテゴリ', value: 'category' },
          { text: 'スター', value: 'isFavorite' },
          { text: 'スター数', value: 'starCount' },
        ],
        units: [
          {
            name: '東京ドーム',
            perUnit:1999,
            category: "面積",
            isFavorite: false,
            starCount: 24,
          },
          {
            name: 'スカイツリー',
            perUnit:1999,
            category: "高さ",
            isFavorite: false,
            starCount: 37,
          },
          {
            name: '日本列島',
            perUnit:1999,
            category: "面積",
            isFavorite: true,
            starCount: 23,
          },
          {
            name: 'コイントス連続表',
            perUnit:1999,
            category: "確率",
            isFavorite: true,
            starCount: 67,
          },
          {
            name: 'サイコロ連続１の目',
            perUnit:1999,
            category: "確率",
            isFavorite: false,
            starCount: 49,
          },
          {
            name: '日本の国家予算',
            perUnit:1999,
            category: "金額",
            isFavorite: true,
            starCount: 94,
          },
          {
            name: 'フェラーリ',
            perUnit:1999,
            category: "金額",
            isFavorite: false,
            starCount: 98,
          },
          {
            name: 'フェラーリ',
            perUnit:1999,
            category: "速さ",
            isFavorite: false,
            starCount: 87,
          },
          {
            name: '白鵬',
            perUnit:1999,
            category: "重さ",
            isFavorite: false,
            starCount: 51,
          },
          {
            name: 'KitKat',
            perUnit:1999,
            category: "カロリー",
            isFavorite: false,
            starCount: 65,
          },
          {
            name: '雷',
            perUnit:1999,
            category: "ボルト",
            isFavorite: false,
            starCount: 65,
          },
          {
            name: 'iphone 8',
            perUnit:1999,
            category: "重さ",
            isFavorite: false,
            starCount: 65,
          },
          {
            name: 'A4の神',
            perUnit:1999,
            category: "面積",
            isFavorite: false,
            starCount: 65,
          },
        ],
      }
    },
    methods: {
      editFavorite (item) {
        const editedIndex = this.units.indexOf(item)
        this.units[editedIndex].isFavorite = !this.units[editedIndex].isFavorite
      },
    }
  }
</script>
