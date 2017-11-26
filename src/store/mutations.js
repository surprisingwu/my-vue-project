import * as types from './mutation-type'

const mutations = {
  [types.SET_SELECT_ALL] (state, flag) {
    state.isSelectAll = flag
  },
  [types.SET_TRIGGER_SELECT_ALL] (state, flag) {
    state.isTriggerSelectAll = flag
  }
}

export default mutations
