<template>
    <h2>Speed {{speed}} ms<sup>-1</sup></h2>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Speedometer extends Vue {
  get speed (): number {
    return this.$store.state.telemetry.Speed.FLOAT
  }
}
</script>

<style>

</style>
