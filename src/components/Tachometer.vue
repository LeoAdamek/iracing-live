<template>
    <h2>RPM: {{rpm}}</h2>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Tachometer extends Vue {
  get rpm (): number {
    return this.$store.state.telemetry.RPM.FLOAT
  }
}
</script>

<style>

</style>
