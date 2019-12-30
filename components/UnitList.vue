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
          <v-btn @click="setUnit(item)">{{ item.name }}</v-btn>
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
          { text: '1単位', value: 'perUnit' },
          { text: '単位系', value: 'unit' },
          { text: 'カテゴリ', value: 'category' },
          { text: 'スター', value: 'isFavorite' },
          { text: 'スター数', value: 'starCount' },
        ],
        units: [
          {
            name: '東京ドーム',
            perUnit:46.755,
            unit:'平方メートル',
            category: '面積',
            isFavorite: false,
            starCount: 24,
          },
          {
            name: 'スカイツリー',
            perUnit:634,
            unit:'m',
            category: "高さ",
            isFavorite: false,
            starCount: 37,
          },
          {
            name: '日本の人口',
            perUnit:126800000,
            unit:'人',
            category: "個数",
            isFavorite: true,
            starCount: 23,
          },
          {
            name: 'コイントス連続表',
            perUnit:0.5,
            unit:'連続試行',
            category: "確率",
            isFavorite: true,
            starCount: 67,
          },
          {
            name: 'サイコロ連続１の目',
            perUnit:0.166,
            unit:'連続試行',
            category:"確率",
            isFavorite: false,
            starCount: 49,
          },
          {
            name: '日本の国家予算',
            perUnit:101456400000000,
            unit:'円',
            category: "金額",
            isFavorite: true,
            starCount: 94,
          },
          {
            name: 'フェラーリ',
            perUnit:30000000,
            unit:'円',
            category: "金額",
            isFavorite: false,
            starCount: 98,
          },
          {
            name: '新幹線',
            perUnit:285,
            unit:'km/h',
            category: "速さ",
            isFavorite: false,
            starCount: 87,
          },
          {
            name: '白鵬',
            perUnit:154,
            unit:'kg',
            category: "重さ",
            isFavorite: false,
            starCount: 51,
          },
          {
            name: 'KitKat',
            perUnit:518.4,
            unit:'kcal',
            category: "カロリー",
            isFavorite: false,
            starCount: 65,
          },
          {
            name: 'ピカチュウ',
            perUnit:100000,
            unit:'v',
            category: "ボルト",
            isFavorite: false,
            starCount: 65,
          },
          {
            name: 'iphone 8',
            perUnit:148,
            unit:'g',
            category: "重さ",
            isFavorite: false,
            starCount: 65,
          },
          {
            name: 'A4用紙の長い方',
            perUnit:297,
            unit:'mm',
            category: "長さ",
            isFavorite: false,
            starCount: 65,
          },
          {
            name: '1インチ',
            perUnit:2.54,
            unit:'cm',
            category:'基本',
            isFavorite:false,
            starCount:6,
          },
          {
            name: '宝くじ',
            perUnit:0.00000005,
            unit:'',
            category:'確率',
            isFavorite:false,
            starCount:6,
          },
          {
            name: '宝くじ',
            perUnit:0.00000005,
            unit:'連続試行',
            category:'確率',
            isFavorite:false,
            starCount:6,
          }
        ],
      }
    },
    methods: {
      editFavorite (item) {
        const editedIndex = this.units.indexOf(item)
        this.units[editedIndex].isFavorite = !this.units[editedIndex].isFavorite
      },
      setUnit (item) {
        this.$store.commit("convert/setUnit",item);
        this.$store.commit("convert/closeDialog");
      }
    }
  }
</script>
