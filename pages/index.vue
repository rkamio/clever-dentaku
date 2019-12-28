<template>
  <v-container fluid v-touch:swipe.left="() => { if($vuetify.breakpoint.xs) $router.push('/operation-history') }">
    <v-row justify="start" style="height:5%;">
      <h3>計算欄</h3>
      <v-spacer></v-spacer>
      <h3>{{ fomula }}</h3>
      <v-row class="ma-2" justify="end">
        <v-btn x-small right @click="backSpace()">
          <span class="font-weight-bold">⬅︎</span>
        </v-btn>
      </v-row>
    </v-row>
    <v-row>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center" justify="start"style="height:5%;">
      <h3>変換結果</h3>
      <v-spacer></v-spacer>
      <h3>{{ fomula }}</h3>
      <v-row class="ma-2" justify="end">
        <!-- <v-dialog v-model="selectUnitdialog" scrollable max-width="300px" :fullscreen="$vuetify.breakpoint.xs"> -->
        <v-dialog v-model="selectUnitdialog" scrollable max-width="700px" :fullscreen="$vuetify.breakpoint.xs">
          <template v-slot:activator="{ on }">
            <v-btn large outlined right v-on="on">変換</v-btn>
          </template>
          <v-card>
            <v-card-title>単位を選択してください</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <UnitList/>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="selectUnitdialog = false" >Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-row>

    <v-row justify="center" style="height:5%;">
      <span class="caption error--text" v-if="errorMessage">{{ errorMessage }}</span>
      <span class="caption" v-else>計算式は正常です</span>
    </v-row>

    <v-row align="end" justify="center" style="height:950%;">
      <table>
        <tr>
          <td>
            <div>
              <v-btn color="error" x-large fab dark @click="clear()">
                <span class="font-weight-bold display-1">CA</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn color="pink" x-large fab dark @click="updateFomula('(')">
                <span class="font-weight-bold display-1">(</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn color="pink" x-large fab dark @click="updateFomula(')')">
                <span class="font-weight-bold display-1">)</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn x-large fab dark @click="updateFomula('÷')">
                <span class="font-weight-bold display-1">÷</span>
              </v-btn>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <v-btn color="warning" x-large fab dark @click="updateFomula('7')">
                <span class="font-weight-bold display-1">7</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn color="warning" x-large fab dark @click="updateFomula('8')">
                <span class="font-weight-bold display-1">8</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn color="warning" x-large fab dark @click="updateFomula('9')">
                <span class="font-weight-bold display-1">9</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn x-large fab dark @click="updateFomula('×')">
                <span class="font-weight-bold display-1">×</span>
              </v-btn>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <v-btn color="warning" x-large fab dark @click="updateFomula('4')">
                <span class="font-weight-bold display-1">4</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn color="warning" x-large fab dark @click="updateFomula('5')">
                <span class="font-weight-bold display-1">5</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn color="warning" x-large fab dark @click="updateFomula('6')">
                <span class="font-weight-bold display-1">6</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn x-large fab dark @click="updateFomula('-')">
                <span class="font-weight-bold display-1">−</span>
              </v-btn>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <v-btn color="warning" x-large fab dark @click="updateFomula('1')">
                <span class="font-weight-bold display-1">1</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn color="warning" x-large fab dark @click="updateFomula('2')">
                <span class="font-weight-bold display-1">2</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn color="warning" x-large fab dark @click="updateFomula('3')">
                <span class="font-weight-bold display-1">3</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn x-large fab dark @click="updateFomula('+')">
                <span class="font-weight-bold display-1">+</span>
              </v-btn>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <v-btn color="warning" x-large fab dark @click="updateFomula('0')">
                <span class="font-weight-bold display-1">0</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn color="warning" x-large fab dark @click="updateFomula('00')">
                <span class="font-weight-bold display-1">00</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn color="warning" x-large fab dark @click="updateFomula('.')">
                <span class="font-weight-bold display-1">.</span>
              </v-btn>
            </div>
          </td>
          <td>
            <div>
              <v-btn color="teal" x-large fab dark @click="calculate()">
                <span class="font-weight-bold display-1">=</span>
              </v-btn>
            </div>
          </td>
        </tr>
      </table>
    </v-row>
  </v-container>
</template>

<script>
import UnitList from "~/components/UnitList.vue";
export default {
  data() {
    return {
      selectUnitdialog: false,
      fomula: '',
      errorMessage: null,
    };
  },
  methods: {
    updateFomula: function(expression) {
      if (this.fomula==='エラー') {
        this.clear();
      }
      this.fomula+=expression;
      console.log(this.fomula);
      console.log()
    },
    parseFomula: function(expression) {
      let fomula = this.fomula.replace(/÷/g,'/');
      const parsedFomula = fomula.replace(/×/g,'*');
      return parsedFomula;
    },
    calculate: function() {
      try {
        const parsedFomula = this.parseFomula(this.fomula);
        console.log(parsedFomula);
        const result = eval(parsedFomula);
        this.fomula = result + '';
      }
      catch (e) {
        console.error(e);
        this.fomula='エラー';
      }
    },
    backSpace: function() {
      this.fomula = this.fomula.slice(0,-1);
    },
    clear: function() {
      this.fomula='';
    }
  },
  watch: {
    fomula: function(value) {
      try {
        const parsedFomula = this.parseFomula(this.fomula);
        const result = eval(parsedFomula);
        this.errorMessage = ''
      }
      catch (e) {
        console.error(e);
        this.errorMessage = '計算式が正しくありません。'
      }
    }
  },
  components: {
    UnitList
  }
};
</script>

<style>
table {
  border-collapse: separate;
  border-spacing: 10px 10px;
}
</style>
