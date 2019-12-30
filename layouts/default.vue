<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title>
        <h1 class="white--text font-weight-bold">電卓</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-app-bar-nav-icon v-if="!$vuetify.breakpoint.xs" @click.stop="rightDrawer = !rightDrawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-if="!$vuetify.breakpoint.xs"　app v-model="rightDrawer" :right="right" fixed>
      <v-list>
        <v-list-item @click.stop="rightDrawer = !rightDrawer">
          <v-list-item-title>履歴</v-list-item-title>
        </v-list-item>
        <OperationHistoryList />
      </v-list>
    </v-navigation-drawer>


    <v-content v-if="$vuetify.breakpoint.xs">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-content v-else>
      <v-container>
        <v-row>
          <v-col cols="2"></v-col>
          <v-col cols="8">
            <nuxt />
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-bottom-navigation app :value="activeBtn" grow color="teal" v-if="$vuetify.breakpoint.xs">
      <v-btn @click="$router.push('/')">
        <span>電卓</span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>
      <v-btn @click="$router.push('/operation-history')">
        <span>履歴</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-footer app v-else>
      <v-col　class="text-center"　cols="12"> &copy; {{ new Date().getFullYear() }} - rkamy </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import OperationHistoryList from "~/components/OperationHistoryList.vue"
const pathList = {"index":0,"operation-history":1}

export default {
  data () {
    return {
      activeBtn:pathList[this.$route.name],
      right: true,
      rightDrawer: false,
    }
  },
  watch: {
    $route: function() {
      this.activeBtn=pathList[this.$route.name]
    }
  },
  components: {
    OperationHistoryList
  }
}
</script>
<style>
  a { 
    text-decoration:none;
    color:white;
  }
  a:visited {
    text-decoration:none;
    color:white;
  }
</style>
