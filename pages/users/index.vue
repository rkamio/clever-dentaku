<template>
  <v-container fluid v-touch:swipe.right="() => { if($vuetify.breakpoint.xs) $router.push('/operation-history') }">

    <v-row justify="center" align="end">
      <div v-if="!$store.state.users.isAuthorized">
        <v-btn x-large @click="signIn">ログイン</v-btn>
      </div>
      <div v-else>
        <v-row justify="center" align="center">
          <v-avatar>
            <img :src="$store.state.users.photoURL" alt="$store.state.users.name">
          </v-avatar>
          <span class="title font-weight-bold ">「{{$store.state.users.email}}」</span>
        </v-row>
        <br/>
        <v-row>
          <v-divider></v-divider>
        </v-row>
        <br/>
        <v-row justify="center">
          <div>
            <v-card class="mx-auto" :loading="loading">
              <v-card-text v-if="favorites.length > 0">
                <p class="title text--primary">
                  お気に入り
                </p>
                <v-simple-table dense>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">名前</th>
                        <th class="text-left">カテゴリ</th>
                        <th class="text-left">削除</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in favorites">
                        <td>{{ item.name }}</td>
                        <td>{{item.category}}</td>
                        <td>
                          <v-btn fab x-small dark @click="cancelFavorite(item)">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
              <v-card-text v-else-if="loading">
                <p class="title text--primary">
                  読み込み中。少々お待ちください。
                </p>
              </v-card-text>
              <v-card-text v-else>
                <p class="title text--primary">
                  「お気に入り」はありません。
                </p>
              </v-card-text>
            </v-card>
          </div>
        </v-row>
        

        <br/>
        <v-row justify="center" align="end">
          <div>
            <v-btn @click="signOut">ログアウト</v-btn>
          </div>
        </v-row>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import db from '~/plugins/db.js'

export default {
  data() {
    return {
      loading: true,
      favorites:[]
    };
  },
  mounted() {
    console.log("mouted run");
    this.loadFavorites();
  },
  computed: {
    favoritesId() {
      console.log("computed run")
      return this.$store.state.users.favorites;
    }
  },
  watch: {
    async favoritesId(val) {
      console.log("watch run",val)
      console.log("wathc run this.favorite",this.favorites);
      if (!this.$store.state.users.isAuthorized) {
        return ;
      }
      
      /* OPTIMIZE: 遅い。dbのusers/favoritesにunitを入れて冗長化すべきだった。*/
      if (this.favorites.length === 0) {
        await this.loadFavorites();
      }
      this.favorites = this.favorites.filter(favoriteUnit => val.includes(favoriteUnit.unitId));
    }
  },
  methods: {
    signIn () {
      this.$store.dispatch('users/googleSignIn');
    },
    signOut () {
      this.$store.dispatch('users/googleSignOut');
    },
    cancelFavorite(item) {
      this.$store.dispatch('users/cancelFavorite',item);
    },
    async loadFavorites() {
      this.loading = true;
      let favorites = [];
      for (let i=0;i<this.favoritesId.length;i++) {
        const doc = await db.collection('units').doc(this.favoritesId[i]).get();
        if (!doc.exists) {
          this.$store.dispatch('users/removeFavorite',{unitId: this.favoritesId[i]});
          continue;
        }
        let unitData = doc.data();
        unitData["unitId"] = doc.id;
        favorites.push(unitData);
      }
      this.favorites = favorites;
      this.loading = false;
    }
  }
}
</script>

<style>

</style>