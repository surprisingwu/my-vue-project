import * as types from './mutation-type'
export const pullUpLoadMore = function({commit, state}, {item}) {
  const list = state.unapprovalList.push(item)
  commit(types.SET_UNAPPROVAL_LIST, list)
}
