/* eslint @typescript-eslint/camelcase: "warn" */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export enum Units {
  METRIC,
  SI,
  IMPERIAL
}

export class Telemetry {
  public session_number: number
  public state: number
  public air_temperature: number
  public track_temperature: number
  public time_remaining: number
  public car_positions: Array<number>
  public car_class_positions: Array<number>
  public car_gears: Array<number>
  public car_rpms: Array<number>
  public car_steers: Array<number>
  public car_pits: Array<boolean>
  public car_laps: Array<number>
  public car_laps_perc: Array<number>

  constructor () {
    this.session_number = -1
    this.state = -1
    this.air_temperature = -273.0
    this.car_positions = []
    this.car_class_positions = []
    this.track_temperature = -273.0
    this.car_gears = []
    this.car_laps = []
    this.car_rpms = []
    this.car_laps_perc = []
    this.car_pits = []
    this.car_steers = []
    this.time_remaining = 0.0
  }
}

export default new Vuex.Store({
  state: {
    telemetry: new Telemetry(),
    session: null,
    isConnected: false,
    settings: {
      units: Units.METRIC
    }
  },
  mutations: {
    SOCKET_ONMESSAGE (state, message) {
      switch (message[0]) {
        case 'T':
          state.telemetry = message[1]
          break
        case 'S':
          state.session = message[1]
          break
      }
    },

    SOCKET_ONOPEN (state, _) {
      state.isConnected = true
    },

    SOCKET_ONCLOSE (state) {
      state.isConnected = false
    },

    loadSession (state, session) {
      state.session = session
    },

    changeUnits (state, units: Units) {
      state.settings.units = units
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    player (state) {
      if (state.session === null) {
        return null
      } else {
        const drivers = state.session.DriverInfo
        const playerIdx = drivers.DriverCarIdx

        return drivers.Drivers[playerIdx]
      }
    },

    currentSession (state) {
      if (state.session == null) {
        return null
      } else {
        const sessions = state.session.SessionInfo.Sessions

        return sessions.filter((s) => s.SessionNum === state.telemetry.session_number)[0]
      }
    }
  }
})
