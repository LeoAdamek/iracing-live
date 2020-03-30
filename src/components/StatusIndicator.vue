<template>
  <div class="status-indicator" v-bind:class="{connected: isConnected, disconnected: !isConnected}" />
</template>

<script class="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class StatusIndicator extends Vue {
  get status () {
    return this.$store.state.isConnected ? 'connected' : 'disconnected'
  }

  get isConnected () {
    return this.$store.state.isConnected
  }
}
</script>

<style lang="scss" scoped>
    .status-indicator {
        position: fixed;
        top: 7pt;
        right: 12pt;
        height: 20pt;
        width: 20pt;
        background: white;
        border-radius: 50%;
    }

    .status-indicator.connected {
        background: greenyellow;
        box-shadow: darken(greenyellow, 10%) 0 0 0.5em;
    }

    .status-indicator.disconnected {
        background: mediumvioletred;
        box-shadow: darken(mediumvioletred, 10%) 0 0 0.5em;
    }
</style>
