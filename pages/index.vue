<template>
  <v-container fluid v-touch:swipe.left="() => { if($vuetify.breakpoint.xs) $router.push('/operation-history') }">
    <v-row justify="start" style="height:5%;">
      <h3>計算欄</h3>
      <v-spacer></v-spacer>
      <h3 v-if="fomula !== '' ">{{ fomula }}</h3>
      <h3 v-else>{{ calculatedResult }}</h3>
      <v-row class="ma-2" justify="end">
        <v-btn x-small right @click="backSpace()">
          <span class="font-weight-bold">⬅︎</span>
        </v-btn>
      </v-row>
    </v-row>
    <v-row>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center" justify="start" style="height:5%;">
      <h5 v-if="selectedUnit">
        {{ selectedUnit.name}}
        <div class="text-right">{{'(' + selectedUnit.unit + ')'}}</div>
      </h5>
      <h3 v-else>単位未選択</h3>
      <v-spacer></v-spacer>
      <h3>{{ convertedResult }}</h3>
      <v-row class="ma-2" justify="end">
        <v-dialog v-model="selectUnitDialog" scrollable max-width="800px" :fullscreen="$vuetify.breakpoint.xs">
          <template v-slot:activator="{ on }">
            <v-btn small outlined right v-on="on" @click="selectUnitDialog = true;">選ぶ</v-btn>
          </template>
          <v-card>
            <v-card-title>単位を選択してください</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <UnitList v-on:unit="setUnit"/>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="selectUnitDialog = false;" >閉じる</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-row>

    <v-row justify="center" style="height:5%;">
      <span class="caption error--text" v-if="errorMessage">{{ errorMessage }}</span>
      <span class="caption" v-else>計算式は正常です。</span>
    </v-row>

    <!-- 電卓部分 -->
    <v-row align="end" justify="center" style="height:85%">
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
  head: {
    htmlAttrs:{
      class:'lock-scroll lock-doublezoom',
    },
    bodyAttrs:{
      class: 'lock-scroll'
    }
  },
  data() {
    return {
      selectUnitDialog: false,
      fomula: '',
      selectedUnit: null,
      calculatedResult: '',
      convertedResult: '',
      errorMessage: null
    }
  },
  methods: {
    updateFomula: function(expression) {
      if (this.fomula==='エラー' || this.calculatedResult !== '') {
        this.clear();
      }
      this.fomula+=expression;
    },
    parseFomula: function(expression) {
      let fomula = this.fomula.replace(/÷/g,'/');
      const parsedFomula = fomula.replace(/×/g,'*');
      return parsedFomula;
    },
    calculate: function() {
      try {
        if (this.fomula !== '') {
         const parsedFomula = this.parseFomula(this.fomula);
          this.calculatedResult = eval(parsedFomula); 
        }
        if (!isFinite(this.calculatedResult)) {
          throw 'InfinityError';
        }
        if (isNaN(this.calculatedResult)) {
          throw 'NaNError';
        }

        this.convert();
      
        let convertTo = null;
        if (this.selectedUnit !== null) {
          convertTo = this.selectedUnit.name;
        }

        const historyObj = { 
          'fomula': this.fomula,
          'calculatedResult': this.calculatedResult,
          'convertedResult':this.convertedResult ,
          'convertTo': convertTo
          }
        this.$store.dispatch('history/updateOperationHistory',historyObj)
        this.fomula = '';
      }
      catch (e) {
        console.error(e);
        this.fomula='エラー';
      }
    },
    convert: function() {
      try {
        const perUnit = this.selectedUnit.perUnit;
        const convertPrerequisite = perUnit !== null || perUnit !== undefined || this.calculatedResult !== '' ;
        if ( !convertPrerequisite ) {
          this.convertedResult = '';
          return ;
        } 

        let result = null;
        if (this.selectedUnit.unit === '連続試行') {
          /* Calculate x of 'unit^x = target'  */
          result = Math.round(Math.log(this.calculatedResult)/Math.log(perUnit)*100) /100;
        } else {
          result = Math.round(this.calculatedResult/perUnit*100) / 100;
        }

        if (!isFinite(result)) {
          throw 'InfinityError in convert';
        } 
        if (isNaN(result)) {
          throw 'NaNError in convert';
        }

        this.convertedResult = result;
      }
      catch (e) {
        console.error(e);
        this.convertedResult = '';
      }
    },
    backSpace: function() {
      this.fomula = this.fomula.slice(0,-1);
    },
    clear: function() {
      this.fomula='';
      this.calculatedResult = '';
      this.convertedResult = '';
    },
    setUnit: function(item) {
      this.selectedUnit = item;
      this.selectUnitDialog = false;
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
/* scroll抑止 */
.lock-scroll {
  overflow:hidden;
}
/* ダブルタップによるズーム抑止 */
.lock-doublezoom {
  touch-action: manipulation;
}
table {
  border-collapse: separate;
  border-spacing: 10px 10px;
}
</style>
