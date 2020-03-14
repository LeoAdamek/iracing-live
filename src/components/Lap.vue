<template>
    <h2>Lap: {{number}} ({{lapDist | round}}m)</h2>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Lap extends Vue {
  get number (): number {
    return this.$store.state.telemetry.Lap.INT
  }

  get lapDist (): number {
    return this.$store.state.telemetry.LapDist.FLOAT
  }

  get lapDistPercent (): number {
    return this.$store.state.telemetry.LapDistPct.FLOAT
  }
}
</script>

<style>

</style>
