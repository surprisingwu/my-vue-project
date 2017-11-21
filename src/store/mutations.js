import * as types from './mutation-type'

const mutations = {
    [types.SET_UNAPPROVAL_LIST] (state, list) {
        state.unapprovalList = list
    }
}

export default mutations
