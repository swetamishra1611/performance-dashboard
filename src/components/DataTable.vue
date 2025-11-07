<template>
  <div style="max-height:150px;overflow:auto;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <thead>
        <tr>
          <th>#</th><th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in visibleRows" :key="idx">
          <td>{{ idx + startIdx }}</td>
          <td>{{ item }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: ["data"], // Pass an array as prop!
  data() {
    return {
      startIdx: 0
    }
  },
  computed: {
    visibleRows() {
      // Only show 30 rows at a time for performance (simulate virtualization)
      return this.data.slice(this.startIdx, this.startIdx + 30);
    }
  }
}
</script>
