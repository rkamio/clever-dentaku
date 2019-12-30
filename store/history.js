
export const state = () => ({
  operationHistory: []
})

export const mutations = {

  insertOperationHistory: function(state,historyObj) {
    const now = new Date();
    const formattedNow = now.getFullYear() + '-' + (now.getMonth()+1)
        + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes();
    
    const condCalcHistory = historyObj.fomula !=='' && historyObj.calculatedResult !=='';
    const condConvHistory = historyObj.calculatedResult !== '' && historyObj.convertedResult !=='';

    if (condCalcHistory || condConvHistory) {
      state.operationHistory.unshift({
        fomula: historyObj.fomula,
        calculatedResult: historyObj.calculatedResult,
        convertedResult: historyObj.convertedResult,
        convertTo: historyObj.convertTo,
        operatedAt: formattedNow
      });
    }
    
  },
  deleteOperationHistory: function(state) {
    state.operationHistory.pop();
  }

}

export const actions = {
  updateOperationHistory: function(context,historyObj) {
    if (context.state.operationHistory.length > 20) {
      context.commit('deleteOperationHistory');
    }
    context.commit('insertOperationHistory',historyObj);
  }
}