<template>
<div class="wrapper">
    <div class="container-fluid">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-phone p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/account">账户概况</router-link>
                    </li>
                    <li class="breadcrumb-item active">绑定账号</li>
                </ol>
            </div>
        </div>
        <div class="row justify-content-center">
            <div id="main" class="card-box col-10">
                <div class="row justify-content-md-center">
                    <div class="col-5 align-self-center">
                       <div class="form-group float-right b_flex b_between b_topcenter">
                            <span>没有账号？</span>
                           <button class="btn btn-link text-danger" @click="register()">立即开户>></button>
                        </div>
                    </div>
                </div>
                <form>
                    <div class="row justify-content-md-center">
                        <div class="col-5">
                            <div class="form-group">
                                <label for="broker" class="col-form-label">经纪商</label>
                                <select class="custom-select" id="broker" name="brokerid"
                                        data-parsley-required="true">
                                    <option value="" disabled selected>请选择</option>
                                    <option v-for="broker in brokers" :key="broker.id" :value="broker.id">
                                        {{broker.broker}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="account" class="col-form-label">MT4账号</label>
                                <input type="text" class="form-control" id="account" name="mtaccount"
                                       data-parsley-required="true">
                            </div>
                            <div class="form-group">
                                <label for="password" class="col-form-label">交易密码</label>
                                <input type="password" class="form-control" id="password" name="mtpassword"
                                       data-parsley-required="true">
                            </div>
                            <div class="form-group">
                                <label for="cpassword" class="col-form-label">确认密码</label>
                                <input type="password" class="form-control" id="cpassword"
                                       data-parsley-required="true"
                                       data-parsley-equalto="#password" data-parsley-equalto-message="密码不一致">
                            </div>
                            <div class="pull-right mt-1">
                                <router-link to="/account" class="btn btn-link text-secondary">返回</router-link>
                                <button type="button" class="btn btn-gradient" @click="binging($event)">确定</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div id="follow-me-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="follow-me-modal"
         data-backdrop="static">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <h2 class="text-uppercase text-center m-b-30">请选择经纪商</h2>
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <div class="col-12">
                            <div class="custom-control custom-radio custom-control-inline" v-for="broker in brokers" :key="broker.id">
                                <input :id="'type'+broker.id" class="custom-control-input" type="radio"
                                       v-model="form.broker" :value="broker">
                                <label class="custom-control-label" :for="'type'+broker.id">{{broker.broker}}</label>
                            </div>
                            </div>
                            <div class="col-12">
                                <input type="hidden" :value="form.broker" data-parsley-required="true"
                                       data-parsley-required-message="请选择经纪商">
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-gradient ml-3" @click="goRegister($event)"
                                    v-if="!form.broker.register_url">去开户</button>
                            <a v-if="form.broker.register_url" target="_blank"
                               :href="form.broker.register_url" class="btn btn-gradient ml-3">去开户</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "accountBinging",
    data() {
        return {
            brokers: [],
            form:{broker:''}
        }
    },
    created() {
        const vm = this;
        const api = vm.api;
        const http = vm.$http;
        http.get(api + 'MtLogin/getbroker')
            .then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.brokers = data.data;
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    methods: {
        goRegister(event){
            let $form = $(event.target).closest('form');
            if ($form.parsley().validate()) {
                $form.submit()
            }
        },
        register() {
            $('#follow-me-modal').modal('toggle');
        },
        binging: function (event) {
            const vm = this;
            let $form = $(event.target).closest('form');
            if ($form.parsley().validate()) {
                const api = vm.api;
                const http = vm.$http;

                http.post(api + 'MtLogin/savemtaccount', $form.serialize())
                    .then(function (response) {
                        const data = response.data;
                        if ('0' === data.code) {
                            swal({
                                title: '绑定成功！',
                                icon: 'success',
                                buttons: {
                                    ok: {
                                        text: '挑选策略师',
                                        className: 'btn btn-gradient',
                                    },
                                    rt: {
                                        text: '返回账户概况',
                                        className: 'btn btn-link text-secondary',
                                    }
                                }
                            }).then((value) => {
                                if (value === 'ok') {
                                    vm.$router.push('/follow-me/top')
                                } else {
                                    vm.$router.push('/account')
                                }
                            })
                        } else {
                            swal({
                                title: '绑定失败！',
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