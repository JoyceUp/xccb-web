<template>
<div>
    <header id="topnav">
        <div class="navbar-custom">
            <div class="container-fluid navbar navbar-expand-lg navbar-dark">
              <div class="b_flex b_topcenter">
                <a class="logo" href="https://www.fxtradelink.com" target="_blank">
                  <img src="/assets/images/logo.png" alt="logo" class="logo-large">
                </a>
                <button class="navbar-toggler" type="button" @click="hidden">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="has-submenu nav-item ml-auto login-stateb">
                  <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="javascript:">
                    <img :src="$store.state.user.avatarsrc" class="rounded-circle" height="32" width="32">
                    <span class="ml-1 pro-user-name">{{$store.state.user.user_login}}</span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                    <div class="dropdown-item noti-title">
                      <h6 class="text-overflow m-0">欢迎！</h6>
                    </div>
                    <router-link to="/profile" class="dropdown-item notify-item">
                      <i class="fi-cog"></i><span>设置</span>
                    </router-link>
                    <a href="javascript:" class="dropdown-item notify-item" @click="logout()">
                      <i class="fi-power"></i><span>退出</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="mobile_nav" v-show="menuShow">
                  <ul class="navigation-menu d-flex  navbar-nav" v-if="$store.state.user">
                    <li class="has-submenu nav-item" @click="allHid">
                      <router-link to="/account"><i class="fi-briefcase"></i>账户概况</router-link>
                    </li>
                    <li class="has-submenu nav-item" v-if="$store.state.user.user_type === '3'"  @click="allHid">
                      <router-link to="/follower"><i class="fi-stack-2"></i>跟随用户</router-link>
                    </li>
                    <li class="has-submenu nav-item"  @click="allHid">
                      <a href="javascript:"><i class="fi-box"></i>外汇跟单</a>
                      <ul class="submenu  b_flex">
                        <li>
                          <router-link to="/follow-me/top">牛人榜</router-link>
                        </li>
                        <li>
                          <router-link to="/follow-me/my">我的跟单</router-link>
                        </li>
                      </ul>
                    </li>
                    <li v-if="$store.state.user.user_type !== '1'" class="has-submenu nav-item"  @click="allHid">
                      <router-link to="/withdraw"><i class="fi-paper-stack"></i>提取资金</router-link>
                    </li>
                    <li v-if="$store.state.user.user_type === '1'" class="has-submenu nav-item"  @click="allHid">
                      <router-link to="/broker"><i class="fi-paper-stack"></i>代理申请</router-link>
                    </li>
                    <li class="has-submenu nav-item"  @click="allHid">
                      <a href="javascript:"><i class="fi-paper"></i>报表</a>
                      <ul class="submenu  b_flex">
                        <li>
                          <router-link to="/report/order">订单报表</router-link>
                        </li>
                        <li>
                          <router-link to="/report/commission">返佣报表</router-link>
                        </li>
                        <li>
                          <router-link to="/report/fee-splitting">分润报表</router-link>
                        </li>
                        <li v-if="$store.state.user.user_type === '3'">
                          <router-link to="/report/rebate">跟单分成报表</router-link>
                        </li>
                      </ul>
                    </li>
                    <li class="has-submenu nav-item" v-if="$store.state.user.user_type !== '3'"  @click="allHid">
                      <router-link to="/subordinate"><i class="fi-share"></i>我的关系</router-link>
                    </li>
                    <li class="has-submenu nav-item"  @click="allHid">
                      <router-link to="/profile/promoter"><i class="fa fa-qrcode"></i>推广链接</router-link>
                    </li>
                    <li class="has-submenu nav-item dropdown ml-auto login-state">
                      <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="javascript:">
                        <img :src="$store.state.user.avatarsrc" class="rounded-circle" height="32" width="32">
                        <span class="ml-1 pro-user-name">{{$store.state.user.user_login}}</span>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                        <div class="dropdown-item noti-title">
                          <h6 class="text-overflow m-0">欢迎！</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item notify-item">
                          <i class="fi-cog"></i><span>设置</span>
                        </router-link>
                        <a href="javascript:" class="dropdown-item notify-item" @click="logout()">
                          <i class="fi-power"></i><span>退出</span>
                        </a>
                      </div>
                    </li>
                  </ul>
              </div>
                <div id="content" class="collapse navbar-collapse">
                    <ul class="navigation-menu  navbar-nav" v-if="$store.state.user">
                        <li class="has-submenu nav-item">
                            <router-link to="/account"><i class="fi-briefcase"></i>账户概况</router-link>
                        </li>
                        <li class="has-submenu nav-item" v-if="$store.state.user.user_type === '3'">
                            <router-link to="/follower"><i class="fi-stack-2"></i>跟随用户</router-link>
                        </li>
                        <li class="has-submenu nav-item">
                            <a href="javascript:"><i class="fi-box"></i>外汇跟单</a>
                            <ul class="submenu ">
                                <li>
                                    <router-link to="/follow-me/top">牛人榜</router-link>
                                </li>
                                <li>
                                    <router-link to="/follow-me/my">我的跟单</router-link>
                                </li>
                            </ul>
                        </li>
                        <li v-if="$store.state.user.user_type !== '1'" class="has-submenu nav-item">
                            <router-link to="/withdraw"><i class="fi-paper-stack"></i>提取资金</router-link>
                        </li>
                        <li v-if="$store.state.user.user_type === '1'" class="has-submenu nav-item">
                            <router-link to="/broker"><i class="fi-paper-stack"></i>代理申请</router-link>
                        </li>
                        <li class="has-submenu nav-item">
                            <a href="javascript:"><i class="fi-paper"></i>报表</a>
                            <ul class="submenu ">
                                <li>
                                    <router-link to="/report/order">订单报表</router-link>
                                </li>
                                <li>
                                    <router-link to="/report/commission">返佣报表</router-link>
                                </li>
                                <li>
                                    <router-link to="/report/fee-splitting">分润报表</router-link>
                                </li>
                                <li v-if="$store.state.user.user_type === '3'">
                                    <router-link to="/report/rebate">跟单分成报表</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="has-submenu nav-item" v-if="$store.state.user.user_type !== '3'">
                            <router-link to="/subordinate"><i class="fi-share"></i>我的关系</router-link>
                        </li>
                        <li class="has-submenu nav-item">
                            <router-link to="/profile/promoter"><i class="fa fa-qrcode"></i>推广链接</router-link>
                        </li>
                        <li class="has-submenu nav-item dropdown ml-auto login-state">
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="javascript:">
                                <img :src="$store.state.user.avatarsrc" class="rounded-circle" height="32" width="32">
                                <span class="ml-1 pro-user-name">{{$store.state.user.user_login}}</span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                                <div class="dropdown-item noti-title">
                                    <h6 class="text-overflow m-0">欢迎！</h6>
                                </div>
                                <router-link to="/profile" class="dropdown-item notify-item">
                                    <i class="fi-cog"></i><span>设置</span>
                                </router-link>
                                <a href="javascript:" class="dropdown-item notify-item" @click="logout()">
                                    <i class="fi-power"></i><span>退出</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
    <router-view />
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center"> 2019 © TradeLink</div>
            </div>
        </div>
    </footer>
</div>
</template>
<script>
export default {
    name: "default",
    data() {
        return {
            menuShow:false
        }
    },
    mounted(){
        // this.hidden();
    },
    methods:{
      allHid(){
          this.menuShow=!this.menuShow
      },
       hidden(){
           let _this = this;
           _this.menuShow = !_this.menuShow
       }
    }
}
</script>
<style scoped>
  .navbar-toggler {
    padding: .15rem .55rem;
    font-size: 1rem;
  }
  #topnav .navbar{padding: 0}
  #topnav .login-stateb{display: none}
  #topnav .navbar-collapse{width: 85%}
  #topnav .navbar-nav{width: 100%}
  #topnav .logo{width: 15%}
  #topnav .logo img{    width: 135px;
    margin-right: 20px;}
</style>
