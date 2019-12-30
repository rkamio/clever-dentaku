
export const state = () => ({
  selectedUnit: null,
  result:'',
  dialog: false /* for Component Management */
})


export const mutations = {
  setUnit: function(state,unitObj) {
    state.selectedUnit = unitObj;
  },
  convertUnit: function(state,target) {
    try {
      const perUnit = state.selectedUnit.perUnit;
      const convertPrerequisite = perUnit !== null || perUnit !== undefined || target !== '' ;

      if ( !convertPrerequisite ) {
        state.result = '';
        return ;
      } 

      let result = null;
      if (state.selectedUnit.unit === '連続試行') {
        /* Calculate x of 'unit^x = target'  */
        result = Math.round(Math.log(target)/Math.log(perUnit)*100) /100;
      } else {
        result = Math.round(target/perUnit*100) / 100;
      }

      if (!isFinite(result)) {
        throw 'InfinityError in convert';
      } 
      if (isNaN(result)) {
        throw 'NaNError in convert';
      }

      state.result = result;
      // state.result ='約 ' +  + '回';
    }
    catch (e) {
      console.error(e);
      state.result = '';
    }
  },
  /* for Component Management */
  closeDialog: function(state) {
    state.dialog = false;
  },
  openDialog: function(state) {
    state.dialog = true;
  }
}
