<template>
<div class="account-pages">
    <div class="account-box">
        <div class="account-logo-box pt-3">
            <h2 class="text-center text-dark">TradeLink</h2>
            <h6 class="text-center font-bold mt-3">登录</h6>
        </div>
        <div class="account-content pt-3">
            <form class="form-horizontal">
                <div class="form-group row">
                    <div class="col-12">
                        <label for="phone">手机号</label>
                        <vue-country-intl type="phone"
                                       v-model="countryCode"
                                       :onlyCountry="onlyCountry"
                                       selectedText=""></vue-country-intl>
                        <input id="phone" class="form-control mt-3" type="text" name="mobile"
                               data-parsley-required="true" placeholder="您的手机号"
                               @keyup.enter="login($event)">
                        <input type="hidden" name="phonecode" :value="countryCode">
                    </div>
                </div>
                <div class="form-group row mb-3">
                    <div class="col-12">
                        <router-link to="/recover-password" class="text-muted pull-right">
                            <small>忘记密码？</small>
                        </router-link>
                        <label for="password">密码</label>
                        <input id="password" class="form-control" type="password" name="user_pass" placeholder="您的密码"
                               data-parsley-required="true"
                               @keyup.enter="login($event)">
                    </div>
                </div>
                <div class="form-group row text-center m-t-10 zmtop">
                    <div class="col-12">
                        <button class="btn btn-block btn-gradient" type="button"
                                @click="login($event)">登录
                        </button>
                    </div>
                </div>
            </form>
            <div class="row m-t-20">
                <div class="col-sm-12 text-center">
                    <div class="text-muted">
                        还没有账户？
                        <router-link to="/register" class="text-dark m-l-5">
                            <b>注册</b>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    layout: 'login',
    data() {
        return {
            countryCode: '86',
            onlyCountry: this.onlyCountry
        }
    },
    methods: {
        login: function (event) {
            const vm = this;
            let $form = $(event.target).closest('form');
            if ($form.parsley().validate()) {
                const api = vm.api;
                const http = vm.$http;

                http.post(api + 'UserLogin/checklogin', $form.serialize())
                    .then(function (response) {
                        const data = response.data;
                        if ('0' === data.code) {
                            vm.$store.commit('login', data.data);
                            vm.$router.push('/account')
                        } else {
                            swal({
                                title: '登录失败！',
                                text: data.msg,
                                icon: 'info',
                                button: {
                                    text: '确定',
                                    className: 'btn btn-gradient',
                                }
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        }
    }
}
</script>

<route-meta>
    {
    "anon": true
    }
</route-meta>
