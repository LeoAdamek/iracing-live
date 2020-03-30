<template>
    <h2>Position: {{pos}}</h2>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PlayerPosition extends Vue {
  get pos (): number | string {
    const pos = this.$store.state.telemetry.PlayerCarPosition.INT

    if (pos === 0) return '--'
    return pos
  }
}
</script>

<style>

</style>
