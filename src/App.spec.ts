import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import App from './App.vue'

const fetchPrices = vi.fn()
const startPolling = vi.fn()
const stopPolling = vi.fn()
const mockStore = {
  gold: { title: 'Gold', price: 123 },
  usd: { title: 'USD', price: 456 },
  loading: false,
  error: null,
  fetchPrices,
  startPolling,
  stopPolling
}

vi.mock('./stores/currency', () => ({
  useCurrencyStore: () => mockStore
}))

describe('App.vue (simple beginner tests)', () => {
  it('renders header text', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('قیمت زنده طلا و دلار')
  })

  it('renders two buttons', () => {
    const wrapper = mount(App)
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('manual refresh button has correct label', () => {
    const wrapper = mount(App)
    const buttons = wrapper.findAll('button')
    expect(buttons[0].text()).toContain('به‌روز')
  })

  it('toggle button calls stopPolling when clicked', async () => {
    const wrapper = mount(App)
    const buttons = wrapper.findAll('button')
    const toggle = buttons[1]
    await toggle.trigger('click')
    expect(stopPolling).toHaveBeenCalled()
  })
})
