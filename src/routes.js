const Index = () => import(/* webpackChunkName: "index" */ '@/views/index.vue')
const Register = () =>
  import(/* webpackChunkName: "register" */ '@/views/register.vue')
const AccountIndex = () =>
  import(/* webpackChunkName: "account-index" */ '@/views/account/index.vue')
const BrokerIndex = () =>
  import(/* webpackChunkName: "broker-index" */ '@/views/broker/index.vue')
const FollowerIndex = () =>
  import(/* webpackChunkName: "follower-index" */ '@/views/follower/index.vue')
const LoginIndex = () =>
  import(/* webpackChunkName: "login-index" */ '@/views/login/index.vue')
const ProfileIndex = () =>
  import(/* webpackChunkName: "profile-index" */ '@/views/profile/index.vue')
const RecoverPassword = () =>
  import(/* webpackChunkName: "recover-password" */ '@/views/recover-password.vue')
const SubordinateIndex = () =>
  import(/* webpackChunkName: "subordinate-index" */ '@/views/subordinate/index.vue')
const WithdrawIndex = () =>
  import(/* webpackChunkName: "withdraw-index" */ '@/views/withdraw/index.vue')
const ProfilePromoter = () =>
  import(/* webpackChunkName: "profile-promoter" */ '@/views/profile/promoter.vue')
const ReportCommission = () =>
  import(/* webpackChunkName: "report-commission" */ '@/views/report/commission.vue')
const ReportFeeSplitting = () =>
  import(/* webpackChunkName: "report-fee-splitting" */ '@/views/report/fee-splitting.vue')
const ReportOrder = () =>
  import(/* webpackChunkName: "report-order" */ '@/views/report/order.vue')
const ReportRebate = () =>
  import(/* webpackChunkName: "report-rebate" */ '@/views/report/rebate.vue')
const LoginToken = () =>
  import(/* webpackChunkName: "login-token" */ '@/views/login/token.vue')
const SubordinateInfo = () =>
  import(/* webpackChunkName: "subordinate-info" */ '@/views/subordinate/info.vue')
const AccountBinding = () =>
  import(/* webpackChunkName: "account-binding" */ '@/views/account/binding.vue')
const WithdrawApply = () =>
  import(/* webpackChunkName: "withdraw-apply" */ '@/views/withdraw/apply.vue')
const FollowMeMyIndex = () =>
  import(/* webpackChunkName: "follow-me-my-index" */ '@/views/follow-me/my/index.vue')
const FollowMeTopIndex = () =>
  import(/* webpackChunkName: "follow-me-top-index" */ '@/views/follow-me/top/index.vue')
const FollowMeMyHistory = () =>
  import(/* webpackChunkName: "follow-me-my-history" */ '@/views/follow-me/my/history.vue')
const FollowMeTopInfo = () =>
  import(/* webpackChunkName: "follow-me-top-info" */ '@/views/follow-me/top/info.vue')

export default [
  {
    name: 'index',
    path: '/',
    component: Index
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: {
      anon: true
    }
  },
  {
    name: 'account-index',
    path: '/account',
    component: AccountIndex
  },
  {
    name: 'broker-index',
    path: '/broker',
    component: BrokerIndex
  },
  {
    name: 'follower-index',
    path: '/follower',
    component: FollowerIndex
  },
  {
    name: 'login-index',
    path: '/login',
    component: LoginIndex,
    meta: {
      anon: true
    }
  },
  {
    name: 'profile-index',
    path: '/profile',
    component: ProfileIndex
  },
  {
    name: 'recover-password',
    path: '/recover-password',
    component: RecoverPassword,
    meta: {
      anon: true
    }
  },
  {
    name: 'subordinate-index',
    path: '/subordinate',
    component: SubordinateIndex
  },
  {
    name: 'withdraw-index',
    path: '/withdraw',
    component: WithdrawIndex
  },
  {
    name: 'profile-promoter',
    path: '/profile/promoter',
    component: ProfilePromoter
  },
  {
    name: 'report-commission',
    path: '/report/commission',
    component: ReportCommission
  },
  {
    name: 'report-fee-splitting',
    path: '/report/fee-splitting',
    component: ReportFeeSplitting
  },
  {
    name: 'report-order',
    path: '/report/order',
    component: ReportOrder
  },
  {
    name: 'report-rebate',
    path: '/report/rebate',
    component: ReportRebate
  },
  {
    name: 'login-token',
    path: '/login/token',
    component: LoginToken,
    meta: {
      anon: true
    }
  },
  {
    name: 'subordinate-info',
    path: '/subordinate/info',
    component: SubordinateInfo
  },
  {
    name: 'account-binding',
    path: '/account/binding',
    component: AccountBinding
  },
  {
    name: 'withdraw-apply',
    path: '/withdraw/apply',
    component: WithdrawApply
  },
  {
    name: 'follow-me-my-index',
    path: '/follow-me/my',
    component: FollowMeMyIndex
  },
  {
    name: 'follow-me-top-index',
    path: '/follow-me/top',
    component: FollowMeTopIndex
  },
  {
    name: 'follow-me-my-history',
    path: '/follow-me/my/history',
    component: FollowMeMyHistory
  },
  {
    name: 'follow-me-top-info',
    path: '/follow-me/top/info',
    component: FollowMeTopInfo
  }
]
