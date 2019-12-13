<template>
<div class="wrapper">
    <div class="container-fluid myTables">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-phone p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item active">提现记录</li>
                </ol>
            </div>
        </div>
        <div id="main" class="card-box txjl">
            <div class="card-title d-flex">
                <div class="form-inline">
                    <select class="custom-select mr-3" v-model="form.status">
                        <option value="" selected>状态</option>
                        <option value="1">审核中</option>
                        <option value="2">出金成功</option>
                        <option value="3">已拒绝</option>
                    </select>
                    <span class="input-group mr-3">
                        <input type="text" class="form-control date-picker" v-model="form.start_time"
                               placeholder="申请时间" readonly>
                        <span class="input-group-addon">-</span>
                        <input type="text" class="form-control date-picker" v-model="form.end_time"
                               placeholder="申请时间" readonly>
                    </span>
                    <button class="btn btn-primary" @click="search()">搜索</button>
                </div>
                <div class="toolbar ml-auto">
                    <router-link to="/withdraw/apply" class="btn btn-gradient">提现申请</router-link>
                </div>
            </div>
            <table class="table table-striped table-hover table-sm txsqtable myhidden">
                <thead class="thead-light">
                <tr>
                    <th>订单号</th>
                    <th>申请金额（USD）</th>
                    <th>收款人</th>
                    <th>收款银行</th>
                    <th>银行账号</th>
                    <th>状态</th>
                    <th>申请时间</th>
                    <th>处理时间</th>
                </tr>
                </thead>
                <tbody>
                <tr class="hidden" aria-hidden="true" tabindex="-1"></tr>
                <tr v-for="withdraw in withdraws" :key="withdraw.id">
                    <th scope="row">{{withdraw.orderno}}</th>
                    <td>{{withdraw.usdnum}}</td>
                    <td>{{withdraw.accountname}}</td>
                    <td>{{withdraw.bankname}}</td>
                    <td>{{withdraw.accountnum}}</td>
                    <td>{{withdraw.status}}</td>
                    <td>{{withdraw.create_time}}</td>
                    <td>{{withdraw.update_time}}</td>
                </tr>
                </tbody>
            </table>
          <div class="comTable">
            <ul class="b_flex b_column">
              <li class="b_flex b_wrap box-s" v-for="withdraw in withdraws" :key="withdraw.id">
                <div class="w-10 b_flex b_topcenter fir_box">
                  <div class="b_flex w-8">
                    <span class="nr">订单号</span>
                    <p>{{withdraw.orderno}}</p>
                  </div>
                </div>
                <div class="w-36 je-w">
                  <div  class="b_flex">
                    <span class="w-7">金额(USD)</span>
                    <p>{{withdraw.usdnum}}</p>
                  </div>
                </div>
                <div class="w-64">
                  <div  class="b_flex">
                    <span>状态</span>
                    <p>{{withdraw.status}}</p>
                  </div>
                </div>
                <div class="w-10 b_flex b_topcenter sq-time">
                  <div class="b_flex w-10">
                    <span class="nr">申请时间</span>
                    <p>{{withdraw.create_time}}</p>
                  </div>
                </div>
                <div class="w-10 b_flex b_topcenter sq-time">
                  <div class="b_flex w-10">
                    <span class="nr">处理时间</span>
                    <p>{{withdraw.update_time}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
            <Pagination :current="page.current"
                        :total-pages="page.totalPages"
                        :total-elements="page.totalElements"
                        :size="page.size"
                        @on-change="load"></Pagination>
        </div>
    </div>
</div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
    name: "withdraw",
    components: {
        Pagination
    },
    data() {
        return {
            withdraws: [],
            page: {
                current: 1,
                totalPages: 1,
                totalElements: 0,
                size: 10
            },
            queryParams: {},
            form: {
                status: '',
                start_time: '',
                end_time: ''
            }
        }
    },
    created() {
        const vm = this;
        const vdata = localStorage.getItem("VueData");
        if (vdata) {
            let obj = JSON.parse(vdata);
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) vm[key] = obj[key]
            }
            localStorage.removeItem("VueData");
        }
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("VueData", JSON.stringify(vm._data))
        })
        this.search();        this.$nextTick(() => {
            $('.date-picker').datetimepicker()
                .on('dp.change', function (e) {
                    let name = $(this).attr('name');
                    vm.form[name] = e.date.format($.fn.datetimepicker.defaults.format)
                });
        })
    },
    methods: {
        load(page) {
            const vm = this;
            const api = vm.api;
            const http = vm.$http;
            let params = {};
            if (page) {
                params.page = page;
            }
            if (this.queryParams.status) {
                params.status = this.queryParams.status;
            }
            if (this.queryParams.start_time) {
                params.start_time = this.queryParams.start_time;
            }
            if (this.queryParams.end_time) {
                params.end_time = this.queryParams.end_time;
            }

            http.get(api + 'OutMoney/getlist', {params})
                .then(function (response) {
                    const data = response.data;
                    if ('0' === data.code) {
                        vm.withdraws = data.data.list;
                        vm.page = {
                            current: +data.data.pagenum,
                            size: +data.data.sizepage,
                            totalElements: +data.data.count,
                            totalPages: +data.data.totalpage
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        search() {
            this.queryParams = this.form;
            this.load()
        }
    }
}
</script>
