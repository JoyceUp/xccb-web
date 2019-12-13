<template>
<div class="wrapper">
    <div class="container-fluid">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-phone p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item active">账户概况</li>
                </ol>
            </div>
        </div>

        <div id="main" class="card-box">
            <div class="card-title d-flex b_topcenter">
                <span class="m-t-0 header-title">账户概况</span>
                <div class="toolbar ml-auto">
                    <router-link to="/account/binding" class="btn btn-gradient">绑定账号</router-link>
                </div>
            </div>
            <table class="table table-striped table-hover table-sm">
                <thead class="thead-light">
                <tr>
                    <th>#</th>
                    <th>MT4账号</th>
                    <th>平台名称</th>
                    <th>余额（USD）</th>
                </tr>
                </thead>
                <tbody>
                <tr class="hidden" aria-hidden="true" tabindex="-1"></tr>
                <tr v-for="(account,index) in accounts" :key="account.id">
                    <td scope="row">{{index+1}}</td>
                    <td>{{account.mt_account}}</td>
                    <td>{{account.broker_name}}</td>
                    <td>{{account.balance}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
import qs from 'querystring';

export default {
    name: "account",
    data() {
        return {
            accounts: []
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            const vm = this;
            const api = vm.api;
            const http = vm.$http;
            http.get(api + 'MtLogin/accountinfo')
                .then(function (response) {
                    const data = response.data;
                    if ('0' === data.code) {
                        vm.accounts = data.data;
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        stop(id, account) {
            swal({
                title: '确认要停止跟单吗？',
                icon: 'info',
                buttons: {
                    ok: {
                        text: '确认',
                        className: 'btn btn-gradient',
                    },
                    rt: {
                        text: '取消',
                        className: 'btn btn-link text-secondary',
                    }
                }
            }).then((value) => {
                if (value === 'ok') {
                    const vm = this;
                    const api = vm.api;
                    const http = vm.$http;

                    let params = {
                        "id": id,
                        "mt_account": account
                    };

                    http.post(api + 'MtLogin/mtcloseapply', qs.stringify(params))
                        .then(function (response) {
                            const data = response.data;
                            if ('0' === data.code) {
                                swal({
                                    title: '操作成功！',
                                    icon: 'success',
                                    button: {
                                        text: '确定',
                                        className: 'btn btn-gradient',
                                    }
                                }).then(() => {
                                    vm.init();
                                })
                            } else {
                                swal({
                                    title: '操作失败！',
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
            })
        }
    }
}
</script>
