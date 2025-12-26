import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PriceCard from './PriceCard.vue'

describe('PriceCard.vue', () => {
  it('باید title را نمایش دهد', () => {
    const wrapper = mount(PriceCard, {
      props: {
        title: 'طلا'
      }
    })
    expect(wrapper.text()).toContain('طلا')
  })

  it('باید قیمت عددی را با فرمت locale نمایش دهد', () => {
    const wrapper = mount(PriceCard, {
      props: {
        title: 'طلا',
        price: 1234567
      }
    })
    expect(wrapper.find('.value').text()).toContain('1,234,567')
  })

  it('باید قیمت رشته‌ای را همان‌طور نمایش دهد', () => {
    const wrapper = mount(PriceCard, {
      props: {
        title: 'دلار',
        price: '42000 تومان'
      }
    })
    expect(wrapper.find('.value').text()).toBe('42000 تومان')
  })

  it('باید "—" برای null نمایش دهد', () => {
    const wrapper = mount(PriceCard, {
      props: {
        title: 'طلا',
        price: null
      }
    })
    expect(wrapper.find('.value').text()).toBe('—')
  })

  it('باید "—" برای undefined نمایش دهد', () => {
    const wrapper = mount(PriceCard, {
      props: {
        title: 'طلا'
      }
    })
    expect(wrapper.find('.value').text()).toBe('—')
  })

  it('باید unit را نمایش دهد', () => {
    const wrapper = mount(PriceCard, {
      props: {
        title: 'طلا',
        price: 500000,
        unit: 'تومان'
      }
    })
    expect(wrapper.find('.unit').text()).toBe('تومان')
  })

  it('نباید unit را نمایش دهد اگر تعریف نشود', () => {
    const wrapper = mount(PriceCard, {
      props: {
        title: 'طلا',
        price: 500000
      }
    })
    expect(wrapper.find('.unit').exists()).toBe(false)
  })

  it('باید icon slot را رندر کند', () => {
    const wrapper = mount(PriceCard, {
      props: {
        title: 'طلا',
        price: 500000
      },
      slots: {
        icon: '<svg class="test-icon"></svg>'
      }
    })
    expect(wrapper.find('.test-icon').exists()).toBe(true)
  })

  it('باید title و price و unit را با هم نمایش دهد', () => {
    const wrapper = mount(PriceCard, {
      props: {
        title: 'قیمت طلا',
        price: 600000,
        unit: 'تومان'
      }
    })
    expect(wrapper.find('h3').text()).toBe('قیمت طلا')
    expect(wrapper.find('.value').text()).toBe('600,000')
    expect(wrapper.find('.unit').text()).toBe('تومان')
  })
