<template>
<div class="wrapper">
    <div class="container-fluid myTables">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-phone p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item">报表</li>
                    <li class="breadcrumb-item active">返佣报表</li>
                </ol>
            </div>
        </div>
        <div id="main" class="card-box ddbb">
            <div class="card-title d-flex">
                <div class="form-inline">
                    <input type="text" class="form-control mr-3" v-model="form.ticket" placeholder="订单号">
                    <input type="text" class="form-control mr-3" v-model="form.login" placeholder="MT4账户">
                    <select class="custom-select mr-3" v-model="form.broker">
                        <option value="" disabled selected>经纪商</option>
                        <option v-for="broker in brokers" :key="broker.id" :value="broker.id">
                            {{broker.broker}}
                        </option>
                    </select>
                    <select class="custom-select mr-3" v-model="form.scope">
                        <option value="" selected>查询范围</option>
                        <option value="self">本人</option>
                        <option value="lower">下级</option>
                        <option value="total">本人+下级</option>
                    </select>
                    <span class="input-group mr-3">
                        <input type="text" class="form-control date-picker"
                               name="close_start_time" v-model="form.close_start_time"
                               placeholder="平仓时间（MT）" readonly>
                        <span class="input-group-addon">-</span>
                        <input type="text" class="form-control date-picker"
                               name="close_end_time" v-model="form.close_end_time"
                               placeholder="平仓时间（MT）" readonly>
                    </span>
                    <button type="button" class="btn btn-primary" @click="search()">搜索</button>
                </div>
            </div>
            <p class="pull-right">
                <span>总手数：{{allvolume}}</span>
                <span class="ml-3">总返佣：{{allamount/100.0}}</span>
            </p>
            <table class="table table-striped table-hover table-sm fybbtab myhidden">
                <thead class="thead-light">
                <tr>
                    <th>接收用户</th>
                    <th>贡献用户</th>
                    <th>账号</th>
                    <th>经纪商</th>
                    <th>商品</th>
                    <th>订单号</th>
                    <th>开仓时间</th>
                    <th>平仓时间</th>
                    <th>手数</th>
                    <th>返佣(USD)</th>
                </tr>
                </thead>
                <tbody>
                <tr class="hidden" aria-hidden="true" tabindex="-1"></tr>
                <tr v-for="record in records" :key="record.id">
                    <td>{{record.commission_user_name}}</td>
                    <td>{{record.username}}</td>
                    <td>{{record.login}}</td>
                    <td>{{record.broker}}</td>
                    <td>{{record.symbol}}</td>
                    <td>{{record.ticket}}</td>
                    <td>{{record.open_time}}</td>
                    <td>{{record.close_time}}</td>
                    <td>{{record.volume/100.0}}</td>
                    <td>{{record.amount/100.0}}</td>
                </tr>
                </tbody>
            </table>
            <div class="comTable myhBox">
                <div class="b_flex b_between w-10 th-head">
                    <div class="b_flex  w-5 myshou">
                        <p class="w-3">账号</p>
                        <p class="w-5">品种</p>
                        <p class="w-2">手数</p>
                    </div>
                    <p class="text-right">返佣</p>
                </div>
                <ul class="b_flex b_column">
                    <li class="b_flex b_wrap box-s"
                        v-for="(record,index) in records"
                        :key="record.id"
                        @click="handleHidden(index)">
                        <div class="w-10 b_flex b_topcenter fir_box">
                            <div class="b_flex b_between w-10">
                                <div class="b_flex w-7 myshou">
                                    <p class="w-3">{{record.login}}</p>
                                    <p class="w-5">{{record.symbol}}</p>
                                    <p class="w-2">{{record.volume/100.0}}</p>
                                </div>
                                <p class="text-right">${{record.amount/100.0}}</p>
                            </div>
                        </div>
                        <div class="hiddenBox b_flex b_between" v-show="index == activeDetail">
                            <div class="w-36">
                                <div class="b_flex">
                                    <span class="w-7">接收用户</span>
                                    <p>{{record.commission_user_name}}</p>
                                </div>
                                <div class="b_flex">
                                    <span class="w-7">贡献用户</span>
                                    <p>{{record.username}}</p>
                                </div>
                                <div class="b_flex">
                                    <span class="w-7">订单号</span>
                                    <p>{{record.ticket}}</p>
                                </div>
                            </div>
                            <div class="w-64">
                                <div class="b_flex">
                                    <span>开仓时间</span>
                                    <p>{{record.open_time}}</p>
                                </div>
                                <div class="b_flex">
                                    <span>平仓时间</span>
                                    <p>{{record.close_time}}</p>
                                </div>
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
    name: "reportCommission",
    components: {
        Pagination
    },
    data() {
        return {
            brokers: [],
            activeDetail: '',
            records: [],
            page: {
                current: 1,
                totalPages: 1,
                totalElements: 0,
                size: 10
            },
            allamount: 0,
            allvolume: 0,
            queryParams: {},
            form: {
                ticket: '',
                login: '',
                scope: '',
                open_start_time: '',
                open_end_time: '',
                close_start_time: '',
                close_end_time: '',
                broker:''
            }
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
        handleHidden(index) {
            this.activeDetail = index;
        },
        load(page) {
            const vm = this;
            const api = vm.api;
            const http = vm.$http;
            let params = {};
            if (page) {
                params.page = page;
            }
            if (this.queryParams.ticket) {
                params.ticket = this.queryParams.ticket;
            }
            if (this.queryParams.scope) {
                params.scope = this.queryParams.scope;
            }
            if (this.queryParams.login) {
                params.login = this.queryParams.login;
            }
            if (this.queryParams.open_start_time) {
                params.open_start_time = this.queryParams.open_start_time;
            }
            if (this.queryParams.open_end_time) {
                params.open_end_time = this.queryParams.open_end_time;
            }
            if (this.queryParams.close_start_time) {
                params.close_start_time = this.queryParams.close_start_time;
            }
            if (this.queryParams.close_end_time) {
                params.close_end_time = this.queryParams.close_end_time;
            }
            if (this.queryParams.broker) {
                params.broker = this.queryParams.broker;
            }

            http.get(api + 'Commission/getlist', {params})
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
                        vm.allamount = data.data.allamount;
                        vm.allvolume = data.data.allvolume;
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
