<template>
    <div class="row driver" v-bind:class="driverClass">
        <div class="col">#{{driver.CarNumberRaw}}</div>
        <div class="col">{{pos}}</div>
        <div class="col">{{pic}}</div>
        <div class="col-2">{{driver.TeamName}}</div>
        <div class="col-2">
            <span>
                {{driver.UserName}}
            </span>
        </div>
        <div class="col">
            <span v-bind:class="licenseClass" class="license">{{driver.LicString}}</span>
            <span class="irating">{{driver.IRating}}</span>
        </div>
        <div class="col-2">{{driver.CarScreenName}} <span class="irating">{{carClass}}</span></div>
        <div class="col">{{lap}}</div>
        <div class="col" v-bind:class="{'pb-lap': pbLap}">{{lastLap | time}}</div>
        <div class="col" v-bind:class="{'purple-lap': purpleLap}">{{fastestLap | time}}</div>
        <div class="col">{{flags}}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Driver extends Vue {
    @Prop(Object) driver!: Record<string, any>

    get lap () {
      const lap = this.$store.state.telemetry.car_laps[this.driver.CarIdx]

      if (lap < 0) {
        return '--'
      }

      return lap
    }

    get pos () {
      const pos = this.$store.state.telemetry.car_positions[this.driver.CarIdx]

      if (pos <= 0) return '---'

      return pos
    }

    get pic () {
      const pos = this.$store.state.telemetry.car_class_positions[this.driver.CarIdx]

      if (pos <= 0) return '---'

      return pos
    }

    get carClass () {
      return this.driver.CarClassShortName.replace(/\s*class/ig, '')
    }

    get licenseClass () {
      return 'license-' + this.driver.LicString[0].toLowerCase()
    }

    get lastLap () {
      if (this.driver.result === undefined) return -1

      return this.driver.result.LastTime
    }

    get fastestLap () {
      if (this.driver.result === undefined) return -1

      return this.driver.result.FastestTime
    }

    get pbLap (): boolean {
      if (this.driver.result === undefined) return false

      return this.driver.result.FastestTime === this.driver.result.LastTime
    }

    get purpleLap (): boolean {
      return false
    }

    get driverClass (): string {
      if (this.driver.result === undefined) return 'dnf'
      if (this.flags) return 'pit'

      return ''
    }

    get flags (): string {
      const inPits = this.$store.state.telemetry.car_pits[this.driver.CarIdx]
      const flags = []

      if (inPits > 0) flags.push('PIT')

      return flags.join(' ')
    }
}
</script>

<style lang="scss" scoped>
    .driver {
        padding-left: 1em;
        background: linear-gradient(0deg, #111 0%, #444 100%);
        font-size: 12pt;
    }

    .dnf {
      color: grey;
    }

    .pit {
      color: lightskyblue;
    }

    span.license {
        font-size: 10pt;
        padding: 0 0.2em 0 0.2em;
        font-weight: bold;
        border-radius: 4pt;
        color: white;
    }

    span.irating {
        font-size: 10pt;
        padding: 0 0.2em 0 0.2em;
        font-weight: bold;
        border-radius: 4pt;
        background: white;
        color: black;
    }

    span.license.license-a {
        background-color: lighten(blue, 10%);
    }

    span.license.license-b {
        background-color: greenyellow;
        color: black;
    }

    span.license.license-c {
        background-color: orange;
    }

    span.license.license-d {
        background-color: orangered;
    }

    span.license.license-r {
        background-color: red;
    }

    .purple-lap {
        color: magenta;
    }

    .pb-lap {
        color: lightgreen;
    }
</style>
