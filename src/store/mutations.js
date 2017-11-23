import * as types from './mutation-type'

const mutations = {
    [types.SET_UNAPPROVAL_LIST] (state, list) {
        state.unapprovalList = list
    },
  [types.SET_SELECT_ALL] (state, flag) {
    state.isSelectAll = flag
  }
}

export default mutations
