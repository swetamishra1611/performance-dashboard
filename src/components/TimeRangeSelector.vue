<template>
  <div style="text-align:center;margin:15px 0;">
    <label for="range">Time Range: </label>
    <select id="range" v-model="selected" @change="emitRange">
      <option value="short">Last Minute</option>
      <option value="medium">Last 5 Minutes</option>
      <option value="long">Last Hour</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "TimeRangeSelector",
  data() {
    return { selected: "short" }
  },
  methods: {
    emitRange() {
      this.$emit('rangeSelected', this.selected)
    }
  }
}
</script>
