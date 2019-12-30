import Vuex from 'vuex'
import OperationHistoryList from '@/components/OperationHistoryList.vue'
import {mount,shallowMount,createLocalVue} from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('OperationHistoryList',()=>{
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        history:{
          operationHistory:[]
        }
      }
    })
  })

  test('is a Vue instance',() => {
    const wrapper = shallowMount(OperationHistoryList,{store,localVue});
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})