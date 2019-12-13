<template>
<div class="wrapper">
    <div class="container-fluid myTables">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-phone p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item">外汇跟单</li>
                    <li class="breadcrumb-item active">牛人榜</li>
                </ol>
            </div>
        </div>
        <div id="main" class="card-box myhidden">
            <div class="card-title d-flex">
                <span class="m-t-0 header-title">牛人榜</span>
            </div>
            <table class="table table-striped table-hover table-sm nrb">
                <thead class="thead-light">
                <tr>
                    <th>排行</th>
                    <th>牛人姓名</th>
                    <th>经纪商</th>
                    <th>MT4账号</th>
                    <th>赢利率</th>
                    <th>交易胜率</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr class="hidden" aria-hidden="true" tabindex="-1"></tr>
                <tr v-for="(top,index) in tops" :key="top.id">
                    <th scope="row">{{index+1}}</th>
                    <td>
                        <router-link :to="{path:'/follow-me/top/info',
                                query:{ mt_account:top.mt_account, broker_id:top.broker_id} }">
                            {{top.username}}
                        </router-link>
                    </td>
                    <td>{{top.broker}}</td>
                    <td>{{top.mt_account}}</td>
                    <td>{{top.profit_rates}}%</td>
                    <td>{{top.trading_rates}}%</td>
                    <th>
                        <button class="btn btn-link p-0" @click="followMeModal(top)">复制跟单</button>
                    </th>
                </tr>
                </tbody>
            </table>
        </div>
      <div class="comTable fol-top">
        <ul class="b_flex b_column">
          <li class="b_flex b_wrap" v-for="(top,index) in tops" :key="top.id">
            <div class="w-10 b_flex b_topcenter fir_box">
              <div class="b_flex w-8">
                <span class="nr">牛人姓名</span>
                <p><router-link :to="{path:'/follow-me/top/info',
                                query:{ mt_account:top.mt_account, broker_id:top.broker_id} }">
                  {{top.username+'1'}}
                </router-link></p>
              </div>
              <div  class="b_flex w-2">
                <button class="comBtn"  @click="followMeModal(top)">跟随</button>
              </div>
            </div>
            <div class="w-5">
              <div  class="b_flex">
                <span>MT4账号</span>
                <p>{{top.mt_account}}</p>
              </div>
              <div  class="b_flex">
                <span>交易胜率</span>
                <p>{{top.trading_rates}}%</p>
              </div>
            </div>
            <div class="w-5">
              <div  class="b_flex">
                <span class="w-7">赢利率</span>
                <p class="w-3">{{top.profit_rates}}%</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div id="follow-me-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="follow-me-modal"
         data-backdrop="static">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <h2 class="text-uppercase text-center m-b-30">请选择MT4账户</h2>
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <div class="col-6 offset-3 custom-control custom-radio pl-0">
                                <select class="custom-select" data-parsley-required="true" v-model="form.account">
                                    <option value="" selected>请选择MT4账户</option>
                                    <option v-for="account in accounts" :key="account.id"
                                            :value="account">
                                        {{account.mt_account}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-6 offset-3 custom-control custom-radio">
                                <input id="type" class="custom-control-input" type="radio" checked="checked"
                                       data-parsley-required="true">
                                <label class="custom-control-label" for="type">按比例跟单</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-6 offset-3 custom-control custom-checkbox pt-3">
                                <input id="pact2" class="custom-control-input" type="checkbox"
                                       data-parsley-required="true"
                                       data-parsley-errors-container="#parsley-errors-pact2">
                                <label class="custom-control-label" for="pact2">我同意以下
                                    <a href="/assets/docs/pact2.pdf" target="_blank">风险提示</a>
                                </label>
                            </div>
                            <div id="parsley-errors-pact2" class="col-6 offset-3 pl-0"></div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-gradient ml-3" @click="follow($event)">确定</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import qs from 'querystring';

export default {
    name: "followMeTop",
    data() {
        return {
            tops: [],
            accounts: [],
            form: {
                account: "",
                top: null
            }
        }
    },
    created() {
        const vm = this;
        const api = vm.api;
        const http = vm.$http;
        http.get(api + 'CattleUser/getlist')
            .then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.tops = data.data;
                }
            })
            .catch(function (error) {
                console.log(error)
            });

        http.get(api + 'MtLogin/getmtlist')
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
    methods: {
        followMeModal(top) {
            this.form.top = top;
            $('#follow-me-modal').modal('toggle');
        },
        follow(event) {
            const vm = this;
            let $form = $(event.target).closest('form');
            if ($form.parsley().validate() && vm.form.account) {
                const api = vm.api;
                const http = vm.$http;

                let params = {
                    "mt_account": vm.form.account.mt_account,
                    "broker_id": vm.form.account.broker_id,
                    "cattleuser_mt_account": vm.form.top.mt_account,
                    "cattleuser_broker_id": vm.form.top.broker_id,
                };

                http.post(api + 'FixApply/saveapply', qs.stringify(params))
                    .then(function (response) {
                        const data = response.data;
                        if ('0' === data.code) {
                            swal({
                                title: '跟单成功！',
                                icon: 'success',
                                button: {
                                    text: '确定',
                                    className: 'btn btn-gradient',
                                }
                            }).then(() => {
                                event.target.previousElementSibling.click()
                                vm.$router.push('/follow-me/my')
                            })
                        } else {
                            swal({
                                title: '跟单失败！',
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
<style scoped>
</style>
