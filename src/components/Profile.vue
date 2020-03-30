<template>
    <div class="row player-info" v-bind:class="sessionClass">
        <div class="col-4">
          <h2>{{session.WeekendInfo.TrackDisplayName}}</h2>
        </div>
        <div class="col-4">
          <h2>RACE FOR BREAD</h2>
        </div>
        <div class="col">
          <h2>{{trackTemp}}&deg;C</h2>
        </div>
        <div class="col">
          <h2>{{timeRemaining | time(0) }}</h2>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Profile extends Vue {
  get player () {
    return this.$store.getters.player
  }

  get session () {
    return this.$store.state.session
  }

  get sessionCondition (): string {
    const session = this.$store.getters.currentSession

    if (session.SessionLaps === 'unlimited') return 'time'
    return 'laps'
  }

  get trackTemp (): number {
    return this.$store.state.telemetry.track_temperature.toFixed(1)
  }

  get timeRemaining (): number {
    return this.$store.state.telemetry.time_remaining
  }

  get sessionTime (): number {
    const session = this.$store.getters.currentSession
    const time = parseFloat(session.SessionTime)

    return time
  }

  get sessionClass (): string {
    const state = this.$store.state.telemetry.state

    if (state === 0x01) return 'check'
    if (state === 0x08) return 'yellow'
    if (state === 0x10) return 'red'
    if (state === 0x20) return 'blue'
    if (state === 0x40) return 'debris'

    return 'green'
  }
}
</script>

<style lang="scss" scoped>
  .row.player-info {
    padding: 0 1em 0 1em;
  }

  .row.player-info.yellow {
    background: linear-gradient(0deg, darken(goldenrod, 20%) 0%, goldenrod 100%);
  }

  .row.player-info.green {
    background: linear-gradient(0deg, darken(green, 10%) 0%, lighten(green, 10%) 100%);
  }

  .row.player-info.blue {
    background: linear-gradient(0deg, darkblue 0%, lighten(blue, 10%) 100%);
  }

  .row.player-info.red {
    background: linear-gradient(0deg, darkred 0%, red 100%);
  }

  .row.player-info.debris {
    background: linear-gradient(-4deg, darkred 0%, darkred 49%, goldenrod 51%);
  }

  .row.player-info.check {
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%),
      url('~@/assets/checkered.jpg') repeat-x;
    background-size: 100%;
  }

  .row.player-info.white {
    background: linear-gradient(0deg, #bbb 0%, white 100%);
    color: black;
  }

</style>
