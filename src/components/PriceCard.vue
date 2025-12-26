<template>
  <div class="price-card">
    <div class="header">
      <slot name="icon"></slot>
      <h3>{{ title }}</h3>
    </div>
    <div class="value">{{ display }}</div>
    <div v-if="unit" class="unit">{{ unit }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    price: { type: [Number, String], required: false },
    unit: { type: String, required: false }
  },
  computed: {
    display() {
      const val = this.price
      if (val === null || val === undefined) return '—'
      if (typeof val === 'number') return val.toLocaleString()
      return val
    }
  }
}
</script>

<style scoped>
.price-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius: var(--radius);
  padding: 18px;
  box-shadow: 0 10px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid rgba(255,255,255,0.03);
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header slot {
  display: block;
}

.header h3 {
  font-size: 0.98rem;
  color: var(--text);
  margin: 0;
  font-weight: 600;
}

.value {
  font-weight: 800;
  font-size: 1.6rem;
  color: var(--text);
}

.unit {
  color: var(--muted);
  font-size: 0.85rem;
}

.header ::v-deep svg {
  width: 34px;
  height: 34px;
}

.header slot::slotted(svg) {
  width: 34px;
  height: 34px;
}
</style>
