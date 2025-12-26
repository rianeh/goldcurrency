import { defineStore } from 'pinia'
import api from '../api/axios'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    gold18k: null as number | null,
    usd: null as number | null,
    loading: false,
    error: null as string | null,
    timer: null as ReturnType<typeof setInterval> | null
  }),

  actions: {
    async fetchPrices(section: 'gold' | 'currency' = 'gold') {
      this.loading = true
      this.error = null

      try {
        const { data } = await api.get('Gold_Currency_Pro.php', {
          params: { section }
        })

        if (section === 'gold') {
          this.gold18k =
            data.gold?.find((g: any) => g.symbol === 'IR_GOLD_18K')?.price ?? null
        }

        if (section === 'currency') {
          this.usd =
            data.currency?.find((c: any) => c.symbol === 'USD')?.price ?? null
        }

      } catch (e: any) {
        this.error = 'خطا در دریافت قیمت‌ها'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    startPolling(interval = 120000) {
      this.stopPolling()
      this.fetchPrices('gold')
      this.fetchPrices('currency')

      this.timer = setInterval(() => {
        this.fetchPrices('gold')
        this.fetchPrices('currency')
      }, interval)
    },

    stopPolling() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  }
})
