<template>
    <h2>Position: {{pos}}</h2>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PlayerPosition extends Vue {
  get pos (): number {
    return this.$store.state.telemetry.PlayerCarPosition.INT
  }
}
</script>

<style>

</style>
