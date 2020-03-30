<template>
  <div>
    <status-indicator />
    <div v-if="telemetryLoaded">
      <profile />
      <div class="row title-row">
        <div class="col">#</div>
        <div class="col">Pos</div>
        <div class="col"><abbr title="Position in Class">PIC</abbr></div>
        <div class="col-2">Team</div>
        <div class="col-3">Driver</div>
        <div class="col-2">Car</div>
        <div class="col">Lap</div>
        <div class="col">Last Lap</div>
        <div class="col">Best Lap</div>
        <div class="col"></div>
      </div>
      <transition-group name="driver-list" tag="div">
        <driver v-for="driver in driversByPosition" v-bind:key="driver.CarIdx" v-bind:driver="driver" />
      </transition-group>
    </div>
    <div v-else>
      <h1>Telemetry Loading...</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from '@/components/Profile.vue'
import Driver from '@/components/Driver.vue'
import StatusIndicator from '@/components/StatusIndicator.vue'

export default {
  name: 'Home',
  components: {
    StatusIndicator,
    Profile,
    Driver
  },

  computed: {
    telemetryLoaded () {
      return this.$store.state.session !== null && this.$store.state.session !== undefined
    },

    driversByPosition () {
      let drivers = this.$store.state.session.DriverInfo.Drivers
      const session = this.currentSession

      // Add the current driver's session result to their data
      drivers = drivers.map((driver) => {
        driver.result = session.ResultsPositions.filter((p) => p.CarIdx === driver.CarIdx)[0]
        return driver
      })

      return drivers.filter((driver) => {
        return driver.UserName !== 'Pace Car' && // Pace car shouldn't be listed
               driver.AbbrevName !== '~' // Spectators should not be included
      }).sort((a, b) => {
        const posList = this.$store.state.telemetry.car_positions
        const aPos = posList[a.CarIdx]
        const bPos = posList[b.CarIdx]

        const aLap = this.$store.state.telemetry.car_laps[a.CarIdx]

        if (aPos === bPos) {
          const bLap = this.$store.state.telemetry.car_laps[b.CarIdx]

          if (aLap === bLap) {
            const aLP = this.$store.state.telemetry.car_laps_perc[a.CarIdx]
            const bLP = this.$store.state.telemetry.car_laps_perc[b.CarIdx]

            return aLP > bLP
          }

          return aLap > bLap
        }

        // Drivers with an invalid lap/position number are pubhsed to the bottom
        if (aLap <= 0) return true
        if (aPos <= 0) return true

        return aPos > posList[b.CarIdx]
      })
    },

    currentSession () {
      return this.$store.getters.currentSession
    }
  }

}
</script>

<style lang="scss">
  .player-stats {
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 0 1em 0 1em;
    background: linear-gradient(0deg, darken(blue, 40%) 0%, lighten(royalblue, 10%) 100%);
  }

  .title-row {
    padding-left: 1em;
    font-size: 14pt;
  }

  .driver-list-move {
    transition: transform 1s;
  }
</style>
