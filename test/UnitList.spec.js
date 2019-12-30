import UnitList from '@/components/UnitList.vue'
import {mount} from '@vue/test-utils'

describe('UnitList',()=>{
  test('is a Vue instance',() => {
    const wrapper = mount(UnitList);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
