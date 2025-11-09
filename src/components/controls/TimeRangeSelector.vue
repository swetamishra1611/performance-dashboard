<template>
  <div style="display: flex; gap: 1rem; align-items: center;">
    <label for="time-range">Time Range:</label>
    <select id="time-range" v-model="selected" @change="change">
      <option value="1min">1 min</option>
      <option value="5min">5 min</option>
      <option value="1hr">1 hour</option>
    </select>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const selected = ref<'1min'|'5min'|'1hr'>('1min')
const emit = defineEmits(['update:range'])
function change() {
  emit('update:range', selected.value)
}
</script>
