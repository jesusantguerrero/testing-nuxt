import { shallowMount } from '@vue/test-utils'
import Home from '@/pages/index.vue'

describe('Home', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.vm).toBeTruthy()
  });
})
