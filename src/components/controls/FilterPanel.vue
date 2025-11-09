<template>
  <div class="filter-panel">
    <div class="filter-inputs">
      <div class="input-group">
        <label for="min-filter">Min:</label>
        <input 
          id="min-filter"
          type="number" 
          v-model.number="min"
          placeholder="Min value"
        />
      </div>
      <div class="input-group">
        <label for="max-filter">Max:</label>
        <input 
          id="max-filter"
          type="number" 
          v-model.number="max"
          placeholder="Max value"
        />
      </div>
    </div>
    <div class="filter-actions">
      <button class="btn-apply" @click="emitFilter">Apply</button>
      <button class="btn-reset" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const min = ref<number | null>(null)
const max = ref<number | null>(null)
const emit = defineEmits(['update:filter'])

function emitFilter() {
  emit('update:filter', { min: min.value, max: max.value })
}

function reset() {
  min.value = null
  max.value = null
  emit('update:filter', { min: null, max: null })
}
</script>

<style scoped>
.filter-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-inputs {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.input-group {
  flex: 1;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.875rem;
  color: #8b92a8;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: #0a0e1a;
  border: 1px solid #2a2f3e;
  border-radius: 6px;
  color: #fff;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.input-group input:focus {
  outline: none;
  border-color: #4f8ef7;
  box-shadow: 0 0 0 3px rgba(79, 142, 247, 0.1);
}

.input-group input::placeholder {
  color: #4a4f5e;
}

.filter-actions {
  display: flex;
  gap: 0.75rem;
}

button {
  flex: 1;
  padding: 0.65rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-apply {
  background: #4f8ef7;
  color: #fff;
}

.btn-apply:hover {
  background: #3a7de8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 142, 247, 0.3);
}

.btn-reset {
  background: #2a2f3e;
  color: #a8b2d1;
}

.btn-reset:hover {
  background: #3a3f4e;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .filter-inputs {
    flex-direction: column;
  }
  
  .input-group {
    min-width: 100%;
  }
}
</style>
