<template>
<div class="account-pages">
    <div class="account-box">
        <div class="account-logo-box pt-3">
            <h2 class="text-center text-dark">TradeLink</h2>
            <h6 class="text-center font-bold mt-3">注册</h6>
        </div>
        <div class="account-content pt-3">
            <form class="form-horizontal">
                <div class="form-group row">
                    <div class="col-12">
                        <label for="username">姓名</label>
                        <input id="username" class="form-control" type="text" name="user_login"
                               data-parsley-required="true"
                               data-parsley-length="[1, 8]" data-parsley-pattern-message="最多8个字符">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <label for="phone">手机号</label>
                        <vue-country-intl type="phone"
                                       v-model="countryCode"
                                       :onlyCountry="onlyCountry"
                                       selectedText=""></vue-country-intl>
                        <input id="phone" class="form-control mt-3" type="text" name="mobile" v-model="mobile"
                               data-parsley-required="true"
                               data-parsley-group="captcha"
                               :placeholder="'+'+countryCode">
                        <input type="hidden" name="phonecode" :value="countryCode">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-7">
                        <label for="captcha">验证码</label>
                        <input id="captcha" class="form-control col-8" type="text" name="mobile_code"
                               data-parsley-required="true"
                               data-parsley-pattern="^[0-9]{6}$" data-parsley-pattern-message="无效的验证码"
                               placeholder="手机验证码">
                    </div>
                    <div class="col-5">
                        <label for="captcha">&nbsp;</label>
                        <CountDownBtn class="btn-block"
                                      :seconds="seconds"
                                      :text="'重新发送'"
                                      @click.native="captcha">
                            获取验证码
                        </CountDownBtn>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <label for="password">密码</label>
                        <input id="password" class="form-control" type="password" name="user_pass"
                               data-parsley-required="true"
                               data-parsley-pattern="/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,18}$/"
                               data-parsley-pattern-message="密码同时包含数字和大小写字母，长度8-16">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <label for="cpassword">确认密码</label>
                        <input id="cpassword" class="form-control" type="password"
                               data-parsley-required="true"
                               data-parsley-equalto="#password" data-parsley-equalto-message="密码不一致">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <label for="inventCode">邀请码</label>
                        <input id="inventCode" class="form-control" type="text" name="invent_code"
                               :value="inventCode"
                               data-parsley-pattern="^[a-zA-Z0-9]{8}$" data-parsley-pattern-message="无效的邀请码"
                               placeholder="">
                    </div>
                </div>
                <div class="form-group row text-center m-t-10">
                    <div class="col-12">
                        <button class="btn btn-block btn-gradient" type="button"
                                @click="register($event)">注册
                        </button>
                    </div>
                </div>
            </form>
            <div class="row m-t-20">
                <div class="col-sm-12 text-center">
                    <div class="text-muted">
                        已有账户？
                        <router-link to="/login" class="text-dark m-l-5">
                            <b>登录</b>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import CountDownBtn from '@/components/CountDownBtn.vue';

export default {
    name: 'register',
    layout: 'login',
    components: {
        CountDownBtn
    },
    data() {
        return {
            seconds: 0,
            mobile: '',
            inventCode: '',
            countryCode: '86',
            onlyCountry: this.onlyCountry
        }
    },
    created() {
        this.inventCode = this.$route.query.invent_code;
    },
    methods: {
        register: function (event) {
            const vm = this;
            let $form = $(event.target).closest('form');
            if ($form.parsley().validate()) {
                const api = vm.api;
                const http = vm.$http;

                http.post(api + 'UserLogin/register', $form.serialize())
                    .then(function (response) {
                        const data = response.data;
                        if ('0' === data.code) {
                            swal({
                                title: '注册成功！',
                                icon: 'success',
                                button: {
                                    text: '确定',
                                    className: 'btn btn-gradient',
                                }
                            }).then(() => {
                                vm.$router.push('/login')
                            })
                        } else {
                            swal({
                                title: '注册失败！',
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
        },
        captcha: function (event) {
            const vm = this;
            let $form = $(event.target).closest('form');
            if ($form.parsley().validate({group: 'captcha'})) {
                const api = vm.api;
                const http = vm.$http;
                vm.seconds = 90;

                http.get(api + 'GetMessage/register', {
                    params: {
                        mobile: this.mobile,
                        phonecode: this.countryCode
                    }
                }).then(function (response) {
                    const data = response.data;
                    if ('0' !== data.code) {
                        swal({
                            title: '验证码发送失败！',
                            text: data.msg,
                            icon: 'info',
                            button: {
                                text: '确定',
                                className: 'btn btn-gradient',
                            }
                        })
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
    }
}
</script>

<!--不需要权限-->
<route-meta>
    {
    "anon": true
    }
</route-meta>