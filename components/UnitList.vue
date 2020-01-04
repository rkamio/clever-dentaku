<template>
  <v-container>
    <div>
      <v-banner sticky v-if="signInAlert">
        <v-alert v-model="signInAlert" dismissible dense outlined type="error">
          「お気に入り」を利用するにはログインしてください。
        </v-alert>
      </v-banner>
      <v-banner sticky v-if="favoriteCountAlert">
        <v-alert v-model="favoriteCountAlert" dismissible dense outlined type="error">
          「お気に入り」数の上限を超えています。
        </v-alert>
      </v-banner>
      <v-text-field v-model="search" label="検索" single-line hide-details></v-text-field>
      <br/>
      <v-data-table 
        :headers="headers" 
        :items="units" 
        :search="search" 
        :page.sync="page" 
        :items-per-page="itemsPerPage" 
        :loading="loading"
        hide-default-footer 
        @page-count="pageCount=$event"
        no-data-text="現在、データがありません。"
        no-results-text="見つかりませんでした。"
      >
        <template v-slot:item.name="{ item }">
          <v-btn @click="$emit('unit',item)">{{ item.name }}</v-btn>
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
  import db from '~/plugins/db.js'
  
  export default {
    data () {
      return {
        page: 1,
        pageCount: 0,
        itemsPerPage: parseInt(process.env.NUXT_ENV_USER_FAV_MAX),
        loading: true,
        search: '',
        headers: [
          { text: '名前', value: 'name' },
          { text: '1単位', value: 'perUnit' },
          { text: '単位系', value: 'unit' },
          { text: 'カテゴリ', value: 'category' },
          { text: 'スター', value: 'isFavorite' },
          { text: 'スター数', value: 'favoriteCount' },
        ],
        units:[],
        signInAlert: false,
        favoriteCountAlert: false,
      }
    },
    created() {
      console.log("created UnitList.");
      this.loadUnits();
      
    },
    methods: {
      /* TODO: serverside pagination, serverside sort */
      loadUnits: function() {
        const favorites = this.$store.state.users.favorites;
        db.collection("units")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let unitData = doc.data();
              unitData["unitId"] = doc.id;
              unitData["isFavorite"] = favorites.indexOf(doc.id) > -1 ? true : false ; 
              this.units.push(unitData);
            })
            console.log("loadUnits success.");
            console.log(this.units);
            this.loading = false ;
          })
          .catch((err)=>{
            console.error(err);
            this.loading = false;
          })
      },
      editFavorite: function(item) {
        if (!this.$store.state.users.isAuthorized) {
          this.signInAlert = true;
          return ;
        }

        const editedIndex = this.units.indexOf(item);
        if (this.units[editedIndex].isFavorite) {
          this.$store.dispatch('users/cancelFavorite',item);
          this.favoriteCountAlert = false;
          /* NOTE: 表示高速化 */
          this.units[editedIndex].favoriteCount -= 1;
          this.units[editedIndex].isFavorite = false;
        } else {
          this.$store.dispatch('users/addFavorite',item)
            .then(result => {
              console.log('success');
            })
            .catch(error => {
              if (error === 'FavoriteCountExceedException') {
                this.favoriteCountAlert = true;
              }
              console.error(error);
              /* ロールバック */
              this.units[editedIndex].favoriteCount -= 1;
              this.units[editedIndex].isFavorite = false;
            })
          /* NOTE: 表示高速化 */
          this.units[editedIndex].favoriteCount += 1;
          this.units[editedIndex].isFavorite = true;
        }
      },
    }
  }
</script>

<style>

</style>