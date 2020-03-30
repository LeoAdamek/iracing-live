<template>
    <h2>Gear: {{gear}}</h2>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Gear extends Vue {
  get gear (): number | string {
    const gear = this.$store.state.telemetry.Gear.INT
    switch (gear) {
      case -1:
        return 'R'
      case 0:
        return 'N'
      default:
        return gear
    }
  }
}
</script>

<style>

</style>
