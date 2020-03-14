<template>
    <h2>Gear: {{gear}}</h2>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Gear extends Vue {
  get gear (): number {
    return this.$store.state.telemetry.Gear.INT
  }
}
</script>

<style>

</style>
