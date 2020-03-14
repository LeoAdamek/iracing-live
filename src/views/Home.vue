<template>
  <div>
    <tachometer />
    <gear />
    <lap />
    <player-position />
    <speedometer />
  </div>
</template>

<script>
// @ is an alias to /src
import Tachometer from '@/components/Tachometer.vue'
import Gear from '@/components/Gear.vue'
import Lap from '@/components/Lap.vue'
import PlayerPosition from '@/components/PlayerPosition.vue'
import Speedometer from '@/components/Speedometer.vue'

export default {
  name: 'Home',
  components: {
    Tachometer,
    Gear,
    Lap,
    PlayerPosition,
    Speedometer
  }
}
</script>
