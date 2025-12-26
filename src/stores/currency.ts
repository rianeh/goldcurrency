import { defineStore } from 'pinia'
import api from '../api/axios'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    gold: null as any,
    usd: null as any,
    loading: false as boolean,
    error: null as string | null,
    timer: undefined as any
  }),
  actions: {
    async fetchPrices() {
      this.loading = true
      this.error = null
      try {
        const data = await api.get('Gold_Currency_Pro.php?key=B9QnSJaGl6ihbW6PEDz2qypIb6V1d7Nu')

        const goldPrice = data?.gold_grams || data?.golds || data?.gold || null
        const usdPrice = data?.usd_price || data?.usd || data?.currency || null

        this.gold = { title: 'طلا (هر گرم)', price: goldPrice ?? '—' }
        this.usd = { title: 'دلار (تومان)', price: usdPrice ?? '—' }
      } catch (e: any) {
        this.error = e?.message || 'خطا در دریافت قیمت‌ها'
        console.error('API Error:', e)
      } finally {
        this.loading = false
      }
    },

    startPolling(interval = 120000) {
      this.stopPolling()
      this.fetchPrices()
      this.timer = setInterval(() => this.fetchPrices(), interval)
    },

    stopPolling() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = undefined
      }
    }
  }
})
