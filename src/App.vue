<template>
  <div class="app-root">
    <header class="hero">
      <h1>قیمت زنده طلا و دلار</h1>
    </header>

    <main class="grid">
      <PriceCard :title="store?.gold?.title ?? 'طلا'" :price="formattedGold" unit="تومان">
        <template #icon>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
              fill="#F5B041"
            />
          </svg>
        </template>
      </PriceCard>

      <PriceCard :title="store?.usd?.title ?? 'دلار'" :price="formattedUSD" unit="تومان">
        <template #icon>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 1v22" stroke="#2ECC71" stroke-width="2" stroke-linecap="round" />
            <path
              d="M17 5H9a4 4 0 100 8h6a4 4 0 110 8H7"
              stroke="#2ECC71"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </template>
      </PriceCard>
    </main>

    <footer class="controls">
      <button @click="manualRefresh">به‌روز کردن</button>
      <button @click="toggleAuto">{{ autoRefresh ? 'وقفه' : 'شروع خودکار' }}</button>
      <div class="meta">آخرین بروز رسانی: {{ lastUpdated ?? '—' }}</div>
      <div v-if="store?.loading" class="loading">در حال بارگذاری...</div>
      <div v-if="store?.error" class="error">خطا: {{ store?.error }}</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import PriceCard from './components/PriceCard.vue'
import { useCurrencyStore } from './stores/currency'

const store = useCurrencyStore()

const autoRefresh = ref(false)
const lastUpdated = ref<string | null>(null)

const formattedGold = computed(() =>
  store.gold?.price ?? '—'
)

const formattedUSD = computed(() =>
  store.usd?.price ?? '—'
)

const toggleAuto = () => {
  autoRefresh.value = !autoRefresh.value
  autoRefresh.value ? store.startPolling() : store.stopPolling()
}

const manualRefresh = async () => {
  await store.fetchPrices()
  lastUpdated.value = new Date().toLocaleTimeString()
}

onMounted(() => {
  store.fetchPrices()
})

onBeforeUnmount(() => {
  store.stopPolling()
})
</script>

<style scoped>
.app-root {
  max-width: 1100px;
  margin: 24px auto;
  padding: 28px;
  font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  background: transparent;
}

.hero {
  text-align: left;
  background: linear-gradient(90deg, rgba(99,102,241,0.06), rgba(6,182,212,0.03));
  padding: 22px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero h1 {
  margin: 0;
  font-size: 1.35rem;
  color: var(--text);
  font-weight: 700;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.controls {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.controls button {
  background: linear-gradient(90deg, var(--primary), #7c83ff);
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  color: white;
}

.meta {
  color: var(--muted);
  margin-left: auto;
}

.loading {
  color: var(--accent);
}

.error {
  color: #fb7185;
}
</style>
