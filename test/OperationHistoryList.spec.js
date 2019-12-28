import OperationHistoryList from '@/components/OperationHistoryList.vue'
import {mount} from '@vue/test-utils'

describe('OperationHistoryList',()=>{
  test('is a Vue instance',() => {
    const wrapper = mount(OperationHistoryList);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})