<template>
<div class="wrapper">
    <div class="container-fluid">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-mobile p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item active">个人设置</li>
                </ol>
            </div>
        </div>
        <div class="row justify-content-center">
            <div id="main" class="card-box col-10 grsztd">
                <div class="row justify-content-md-center my-3">
                    <div class="col-10">
                        <h3>个人设置</h3>
                        <p class="font-weight-bold">我的昵称：{{user.user_login}}</p>
                    </div>
                </div>
                <div class="row justify-content-md-center my-3">
                    <div class="col-10">
                        <span class="font-weight-bold">我的头像</span>
                        <p class="d-flex">
                            <small>完善您的个人信息，使得其他人更容易找到您</small>
                            <button type="button" class="btn btn-link ml-auto" @click="avatarModal()">上传头像</button>
                        </p>
                    </div>
                </div>
                <div class="row justify-content-md-center my-3">
                    <div class="col-10">
                        <span class="font-weight-bold">登录密码</span>
                        <p class="d-flex">
                            <small>用于保护帐号信息和登录安全</small>
                            <button type="button" class="btn btn-link ml-auto" @click="pwdModal()">修改密码</button>
                        </p>
                    </div>
                </div>
                <div class="row justify-content-md-center my-3">
                    <div class="col-10">
                        <span class="font-weight-bold">绑定手机：{{maskMobile}}</span>
                        <p class="d-flex">
                            <small>绑定手机可以当用户名登录，接收系统的短信通知以及一些安全验证</small>
                            <button type="button" class="btn btn-link ml-auto" @click="mobileModal()">修改绑定手机</button>
                        </p>
                    </div>
                </div>
                <div class="row justify-content-md-center my-3">
                    <div class="col-10">
                        <span class="font-weight-bold">身份认证</span>
                        <p class="d-flex">
                            <small>实名认证</small>
                            <button type="button" class="btn btn-link ml-auto" @click="idcardModal()">身份认证</button>
                        </p>
                    </div>
                </div>
                <div v-if="$store.state.user && $store.state.user.user_type !== '1'"
                     class="row justify-content-md-center my-3">
                    <div class="col-10">
                        <span class="font-weight-bold">收款银行：</span>
                        <p class="d-flex">
                            <small>现金奖励的收款银行</small>
                            <button type="button" class="btn btn-link ml-auto" @click="bankModal()">修改银行卡信息</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--modal-->
    <div id="avatar-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="avatar-modal"
         data-backdrop="static" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <h2 class="text-uppercase text-center m-b-30">修改头像</h2>
                    <form class="form-horizontal" data-parsley-excluded="">
                        <input class="form-control" type="hidden" name="avatar" v-model="form.avatar.avatar"
                               data-parsley-required="true" data-parsley-required-message="请选择文件"
                               data-parsley-errors-container="#parsley-container-avatar">

                        <div class="fileupload fileupload-new row" data-provides="fileupload">
                            <div class="col-6">
                                <div class="fileupload-preview thumbnail avatar">
                                    <img :src="user.avatarsrc" alt="头像">
                                </div>
                                <p id="parsley-container-avatar"></p>
                            </div>
                            <div class="col-6 align-self-center">
                                <button type="button" class="btn btn-gradient btn-file">
                                    <span><i class="fa fa-paper-clip"></i> 选择照片</span>
                                    <input data-file="avatar" type="file" accept=".jpg,.png"
                                           @change="triggerFile($event)" />
                                </button>
                                <ul class="mt-3 list-unstyled">
                                    <li>支持 JPG 和 PNG 图片</li>
                                    <li>图片最大1M</li>
                                </ul>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-gradient ml-3" @click="avatar($event)">确认</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div id="pwd-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="pwd-modal"
         data-backdrop="static" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <h2 class="text-uppercase text-center m-b-30">修改密码</h2>
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <div class="col-sm-6 offset-sm-3">
                                <label for="user_pass">原密码</label>
                                <input id="user_pass" class="form-control" type="password" name="user_pass"
                                       data-parsley-required="true">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6 offset-sm-3">
                                <label for="newpassword">新密码</label>
                                <input id="newpassword" class="form-control" type="password" name="newpassword"
                                       data-parsley-required="true"
                                       data-parsley-pattern="/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,18}$/"
                                       data-parsley-pattern-message="密码同时包含数字和大小写字母，长度8-16">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6 offset-sm-3">
                                <label for="cpassword">确认密码</label>
                                <input id="cpassword" class="form-control" type="password"
                                       data-parsley-required="true"
                                       data-parsley-equalto="#newpassword" data-parsley-equalto-message="密码不一致">
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-gradient ml-3" @click="pwd($event)">确认修改</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div id="mobile-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mobile-modal"
         data-backdrop="static" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bdsja">
                <div class="modal-body">
                    <h2 class="text-uppercase text-center m-b-30">绑定手机</h2>
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <div class="col-sm-8 offset-sm-2">
                                <label for="password">密码</label>
                                <input id="password" class="form-control" type="password" name="user_pass"
                                       data-parsley-required="true">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-8 offset-sm-2">
                                <label for="phone">新手机号</label>
                                <vue-country-intl type="phone"
                                                  v-model="countryCode"
                                                  :onlyCountry="onlyCountry"
                                                  selectedText=""></vue-country-intl>
                                <input id="phone" class="form-control" style="margin-top: 1rem" type="text" name="mobile" v-model="form.mobile"
                                       data-parsley-required="true"
                                       data-parsley-group="captcha"
                                       :placeholder="'+'+countryCode">
                                <input type="hidden" name="phonecode" :value="countryCode">
                            </div>
                        </div>
                        <div class="form-group row yzmmobile">
                            <div class="col-7 col-sm-5 offset-sm-2">
                                <label for="captcha">验证码</label>
                                <input id="captcha" class="form-control col-8" type="text" name="mobile_code"
                                       data-parsley-required="true"
                                       data-parsley-pattern="^[0-9]{6}$" data-parsley-pattern-message="无效的验证码"
                                       placeholder="验证码">
                            </div>
                            <div class="col-5 col-sm-3">
                                <label for="captcha">&nbsp;</label>
                                <CountDownBtn class="btn-block"
                                              :seconds="seconds"
                                              :text="'重发'"
                                              @click.native="captcha">
                                    获取验证码
                                </CountDownBtn>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end bdsjbtn">
                            <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-gradient ml-3" @click="mobile($event)">确认修改</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div id="idcard-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="idcard-modal"
         data-backdrop="static" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h2 class="text-uppercase text-center m-b-30">实名认证</h2>
                    <form class="form-horizontal" data-parsley-excluded="">
                        <input class="form-control" type="hidden" name="idcard" v-model="form.idcard.idcard"
                               data-parsley-required="true" data-parsley-required-message="请选择文件"
                               data-parsley-errors-container="#parsley-container-idcard">
                        <input class="form-control" type="hidden" name="idsidecard" v-model="form.idcard.idsidecard"
                               data-parsley-required="true" data-parsley-required-message="请选择文件"
                               data-parsley-errors-container="#parsley-container-idsidecard">

                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="idname" class="w-2">姓名</label>
                                <input id="idname" class="form-control" type="text" name="idname"
                                       v-model="form.idcard.idname"
                                       data-parsley-required="true">
                            </div>
                            <div class="col-sm-6">
                                <label for="idnum" class="w-2">身份证号</label>
                                <input id="idnum" class="form-control" type="text" name="idnum"
                                       v-model="form.idcard.idnum"
                                       data-parsley-required="true">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6" style="margin-bottom: 36px">
                                <label class="w-2">正面照</label>
                                <div class="fileupload fileupload-new b_flex" data-provides="fileupload">
                                    <div class="fileupload-preview thumbnail px-5">
                                        <img class="img-thumbnail"
                                             :src="form.idcard.idcardsrc?form.idcard.idcardsrc:'/assets/images/id-card.png'"
                                             alt="身份证照片">
                                    </div>
                                    <p id="parsley-container-idcard"></p>
                                    <div class="align-self-center" style="position: absolute; bottom: -36px;">
                                        <button type="button" class="btn btn-gradient btn-file">
                                            <span><i class="fa fa-paper-clip"></i> 选择照片</span>
                                            <input data-file="idcard" type="file" accept=".jpg,.png"
                                                   @change="triggerFile($event)" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6" style="margin-bottom: 36px">
                                <label class="w-2">反面照</label>
                                <div class="fileupload fileupload-new b_flex" data-provides="fileupload">
                                    <div class="fileupload-preview thumbnail px-5">
                                        <img class="img-thumbnail" width="100%"
                                             :src="form.idcard.idsidecardsrc?form.idcard.idsidecardsrc:'/assets/images/id-card.png'"
                                             alt="反面照">
                                    </div>
                                    <p id="parsley-container-idsidecard"></p>
                                    <div class="align-self-center" style="position: absolute; bottom: -36px;">
                                        <button type="button" class="btn btn-gradient btn-file">
                                            <span><i class="fa fa-paper-clip"></i> 选择照片</span>
                                            <input data-file="idsidecard" type="file" accept=".jpg,.png"
                                                   @change="triggerFile($event)" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <ul class="mt-3 list-unstyled">
                                    <li>支持JPG和PNG图片; 图片最大1M</li>
                                </ul>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end bdsjbtn">
                            <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-gradient ml-3"
                                    @click="idcard($event)">提交
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div id="bank-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="bank-modal"
         data-backdrop="static" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h2 class="text-uppercase text-center m-b-30">绑定银行卡</h2>
                    <form class="form-horizontal" data-parsley-excluded="">
                        <input class="form-control" type="hidden" name="bankcard" v-model="form.bank.bankcard"
                               data-parsley-required="true" data-parsley-required-message="请选择文件"
                               data-parsley-errors-container="#parsley-container-bankcard">

                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="accountname" class="w-3">姓名</label>
                                <input id="accountname" class="form-control" type="text" name="accountname"
                                       v-model="form.bank.accountname"
                                       data-parsley-required="true">
                            </div>
                            <div class="col-sm-6">
                                <label for="accountnum" class="w-3">银行卡号</label>
                                <input id="accountnum" class="form-control" type="text" name="accountnum"
                                       v-model="form.bank.accountnum"
                                       data-parsley-required="true">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label for="bankname" class="w-3">银行名称</label>
                                <input id="bankname" class="form-control" type="text" name="bankname"
                                       v-model="form.bank.bankname"
                                       data-parsley-required="true">
                            </div>
                            <div class="col-sm-6">
                                <label for="bankbranch" class="w-3">支行名称</label>
                                <input id="bankbranch" class="form-control" type="text" name="bankbranch"
                                       v-model="form.bank.bankbranch"
                                       data-parsley-required="true">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label class="w-3">银行卡照片</label>
                                <div class="fileupload fileupload-new" data-provides="fileupload">
                                    <div class="fileupload-preview thumbnail px-5">
                                        <img class="img-thumbnail" width="100%"
                                             :src="form.bank.bankcardsrc?form.bank.bankcardsrc:'/assets/images/credit-card.png'"
                                             alt="银行卡照片">
                                    </div>
                                    <p id="parsley-container-bankcard"></p>
                                    <div v-if="form.bank.status!=='0'" class="align-self-center">
                                        <button type="button" class="btn btn-gradient btn-file">
                                            <span><i class="fa fa-paper-clip"></i> 选择照片</span>
                                            <input data-file="bankcard" type="file" accept=".jpg,.png"
                                                   @change="triggerFile($event)" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <ul class="mt-3 list-unstyled">
                                    <li>支持JPG和PNG图片; 图片最大1M</li>
                                </ul>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end bdsjbtn ">
                            <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-gradient ml-3"
                                    @click="bank($event)" :disabled="form.bank.status==='0'">提交
                            </button>
                        </div>
                        <div v-if="form.bank.status==='0'"
                             class="d-flex justify-content-center text-danger">
                            待审核时，禁止修改银行卡信息
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import CountDownBtn from '@/components/CountDownBtn.vue'

export default {
    name: "userSettings",
    components: {
        CountDownBtn
    },
    data() {
        return {
            maskMobile: '',
            maskAccount: '',
            user: this.$store.state.user,
            form: {
                avatar: {},
                mobile: '',
                idcard: {},
                bank: {}
            },
            file: {},
            seconds: 0,
            countryCode: '86',
            onlyCountry: this.onlyCountry
        }
    },
    created() {
        const vm = this;
        const api = vm.api;
        const http = vm.$http;
        http.get(api + 'UserInfo/getmobilebank')
            .then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.maskMobile = data.data.mobile;
                    vm.maskAccount = data.data.accountnum;
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    methods: {
        avatarModal() {
            $('#avatar-modal').modal('toggle');
        },
        async avatar(event) {
            let avatar = this.file.avatar;
            if (avatar) {
                let obj = await this.upload(avatar);
                this.$set(this.form.avatar, 'avatar', obj);
            }
            this.$nextTick(() => this.post(event, '上传', 'UserInfo/uploadavatar'))
        },
        pwdModal() {
            $('#pwd-modal').modal('toggle');
        },
        pwd: function (event) {
            this.post(event, '修改', 'UserLogin/changepass');
        },
        mobileModal() {
            $('#mobile-modal').modal('toggle');
        },
        mobile: function (event) {
            this.post(event, '绑定', 'UserLogin/changemobile');
        },
        bankModal() {
            $('#bank-modal').modal('toggle');
            const vm = this;
            const api = vm.api;
            const http = vm.$http;

            http.get(api + 'Bank/editbank').then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.form.bank = data.data;
                }
            }).catch(function (error) {
                console.log(error)
            });
        },
        async bank(event) {
            let bankcard = this.file.bankcard;
            if (bankcard) {
                let obj = await this.upload(bankcard);
                this.$set(this.form.bank, 'bankcard', obj);
            }
            this.$nextTick(() => this.post(event, '绑定', 'Bank/addbank'));
        },
        idcardModal() {
            $('#idcard-modal').modal('toggle');
            const vm = this;
            const api = vm.api;
            const http = vm.$http;

            http.get(api + 'Bank/editidcard').then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.form.idcard = data.data;
                }
            }).catch(function (error) {
                console.log(error)
            });
        },
        async idcard(event) {
            let idcard = this.file.idcard;
            if (idcard) {
                let obj = await this.upload(idcard);
                this.$set(this.form.idcard, 'idcard', obj);
            }
            let idsidecard = this.file.idsidecard;
            if (idsidecard) {
                let obj = await this.upload(idsidecard);
                this.$set(this.form.idcard, 'idsidecard', obj);
            }
            this.$nextTick(() => this.post(event, '绑定', 'Bank/addidcard'));
        },
        triggerFile(event) {
            let el = event.target;
            let max = +el.dataset.max;
            if (max && !isNaN(max)) {
                max = max * 1024;
            } else {
                max = 1048576;
            }
            if (el.files[0].size > max) {
                swal({
                    title: '图片最大1M！',
                    button: {
                        text: '确定',
                        className: 'btn btn-gradient',
                    }
                })
                return
            }
            this.file[el.dataset.file] = el.files[0];
        },
        async upload(file) {
            const vm = this;
            const api = vm.api;
            const http = vm.$http;

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            let params = new FormData();
            params.append('file', file);
            try {
                let response = await http.post(api + 'Upload/upload', params, config);
                const data = response.data;
                if ('0' === data.code) {
                    return data.data.id;
                } else {
                    swal({
                        title: '上传文件失败！',
                        text: data.msg,
                        icon: 'info',
                        button: {
                            text: '确定',
                            className: 'btn btn-gradient',
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
        captcha(event) {
            const vm = this;
            let $form = $(event.target).closest('form');
            if ($form.parsley().validate({group: 'captcha'})) {
                const api = vm.api;
                const http = vm.$http;
                vm.seconds = 90;

                http.get(api + 'GetMessage/register', {
                    params: {
                        mobile: this.form.mobile,
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
        post(event, swalTitle, url) {
            const vm = this;
            const api = vm.api;
            const http = vm.$http;
            const $form = $(event.target).closest('form');
            if (!$form.parsley().validate()) return;

            http.post(api + url, $form.serialize())
                .then(function (response) {
                    const data = response.data;
                    if ('0' === data.code) {
                        swal({
                            title: swalTitle + '成功！',
                            icon: 'success',
                            button: {
                                text: '确定',
                                className: 'btn btn-gradient',
                            }
                        }).then(() => event.target.previousElementSibling.click())
                    } else {
                        swal({
                            title: swalTitle + '失败！',
                            text: data.msg,
                            icon: 'info',
                            button: {
                                text: '确定',
                                className: 'btn btn-gradient',
                            }
                        })
                    }
                }).catch((error) => console.log(error));
        }
    }
}
</script>
