<template>
  <div>
    <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.75rem;">
      <button @click="prevPage" :disabled="page===0">&lt; Prev</button>
      <button @click="nextPage" :disabled="page===maxPage">Next &gt;</button>
      <span style="margin-left:1rem">Page {{ page+1 }} / {{ maxPage+1 }}</span>
    </div>
    <table style="width:100%;background:#101522;border-radius:8px;overflow:hidden;">
      <thead>
        <tr>
          <th>#</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in pageData" :key="i">
          <td>{{ i + 1 + page * pageSize }}</td>
          <td>{{ row.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
const props = defineProps<{ data: { value: number }[] }>()
const page = ref(0)
const pageSize = 30
const maxPage = computed(() => Math.max(0, Math.ceil(props.data.length / pageSize) - 1))
const pageData = computed(() => props.data.slice(page.value * pageSize, (page.value+1) * pageSize))
function prevPage() { page.value = Math.max(0, page.value - 1) }
function nextPage() { page.value = Math.min(maxPage.value, page.value + 1) }
watch(() => props.data.length, () => { if(page.value > maxPage.value) page.value = maxPage.value })
</script>
