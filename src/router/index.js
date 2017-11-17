import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Unapproval = (resolve) => {
  import('components/unapproval/unapproval')
    .then((module) => {
      resolve(module)
    })
}
const Approval = (resolve) => {
  import('components/approval/approval')
    .then((module) => {
      resolve(module)
    })
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/unapproval'
    },
    {
      path: '/unapproval',
      component: Unapproval
    },
    {
      path: '/approval',
      component: Approval
    }
  ]
})
