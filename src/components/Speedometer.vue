<template>
    <h2>Speed {{speed | round}} {{unit}}</h2>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { Units } from '@/store'

@Component
export default class Speedometer extends Vue {
  get speed (): number {
    const vel = this.$store.state.telemetry.Speed.FLOAT

    switch (this.$store.state.settings.units) {
      case Units.METRIC:
        return vel * 3.6
      case Units.IMPERIAL:
        return vel * 2.237
      default:
        return vel
    }
  }

  get unit (): string {
    switch (this.$store.state.settings.units) {
      case Units.METRIC:
        return 'km/h'
      case Units.IMPERIAL:
        return 'mph'
      default:
        return 'ms<sup>-1</sup>'
    }
  }
}
</script>

<style>

</style>
