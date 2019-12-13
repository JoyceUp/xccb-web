<template>
<div class="wrapper">
    <div class="container-fluid">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-phone p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item">报表</li>
                    <li class="breadcrumb-item active">跟单分成报表</li>
                </ol>
            </div>
        </div>

        <div id="main" class="card-box">
            <div class="card-title d-flex">
                <div class="form-inline">
                    <input type="text" class="form-control mr-3" v-model="form.login" placeholder="MT4账户">
                    <input type="text" class="form-control mr-3" v-model="form.user_name" placeholder="所属用户">
                    <select class="custom-select mr-3" v-model="form.status">
                        <option value="" selected>状态</option>
                        <option value="0">待处理</option>
                        <option value="1">处理完成</option>
                    </select>
                    <span class="input-group mr-3">
                        <input type="text" class="form-control date-picker"
                               name="start_time" v-model="form.start_time"
                               placeholder="结算时间" readonly>
                        <span class="input-group-addon">-</span>
                        <input type="text" class="form-control date-picker"
                               name="end_time" v-model="form.end_time"
                               placeholder="结算时间" readonly>
                    </span>
                    <button type="button" class="btn btn-primary" @click="search()">搜索</button>
                </div>
            </div>
            <table class="table table-striped table-hover table-sm">
                <thead class="thead-light">
                <tr>
                    <th>信号源</th>
                    <th>信号源昵称</th>
                    <th>MT账号</th>
                    <th>所属用户</th>
                    <th>盈利</th>
                    <th>结算金额</th>
                    <th>状态</th>
                    <th>结算时间</th>
                    <th>更新时间</th>
                </tr>
                </thead>
                <tbody>
                <tr class="hidden" aria-hidden="true" tabindex="-1"></tr>
                <tr v-for="record in records" :key="record.id">
                    <td>{{record.fix_login}}({{record.fix_broker}})</td>
                    <td>{{record.fix_user_name}}</td>
                    <td>{{record.login}}({{record.broker}})</td>
                    <td>{{record.user_name}}</td>
                    <td>{{record.profit/100.0}}</td>
                    <td>{{record.amount/100.0}}</td>
                    <td>{{record.status?'处理完成':'待处理'}}</td>
                    <td>{{record.rebate_time}}</td>
                    <td>{{record.update_time}}</td>
                </tr>
                </tbody>
            </table>

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
    name: "reportRebate",
    components: {
        Pagination
    },
    data() {
        return {
            records: [],
            page: {
                current: 1,
                totalPages: 1,
                totalElements: 0,
                size: 10
            },
            totalAmount: 0,
            queryParams: {},
            form: {
                login: '',
                user_name: '',
                status: '',
                start_time: '',
                end_time: '',
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
        this.search();
        this.$nextTick(() => {
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
            if (this.queryParams.login) {
                params.login = this.queryParams.login;
            }
            if (this.queryParams.user_name) {
                params.user_name = this.queryParams.user_name;
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

            http.get(api + 'Rebate/profitlist', {params})
                .then(function (response) {
                    const data = response.data;
                    if ('0' === data.code) {
                        vm.records = data.data.list;
                        vm.page = {
                            current: +data.data.pagenum,
                            size: +data.data.sizepage,
                            totalElements: +data.data.count,
                            totalPages: +data.data.totalpage
                        }
                        vm.totalAmount = data.data.amount
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