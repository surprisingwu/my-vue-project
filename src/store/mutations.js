import * as types from './mutation-type'

const mutations = {
  [types.SET_SELECT_ALL] (state, flag) {
    state.isSelectAll = flag
  }
}

export default mutations
