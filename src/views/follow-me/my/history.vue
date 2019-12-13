<template>
<div class="wrapper">
    <div class="container-fluid">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-phone p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item">外汇跟单</li>
                    <li class="breadcrumb-item active">跟单记录</li>
                </ol>
            </div>
        </div>

        <div id="main" class="card-box">
            <div class="card-title d-flex">
                 <div class="form-inline gdjl">
                    <input type="text" class="form-control mr-3" v-model="form.tradeuser" placeholder="跟单账户">
                    <input type="text" class="form-control mr-3" v-model="form.exec_deal" placeholder="订单编号">
                    <select class="custom-select mr-3" v-model="form.type">
                        <option value="" selected>交易种类</option>
                        <option value="Sell">Sell</option>
                        <option value="Buy">Buy</option>
                    </select>
                    <span class="input-group mr-3">
                        <input type="text" class="form-control date-picker" v-model="form.close_start_time"
                               name="close_start_time"
                               placeholder="平仓时间（MT）" readonly>
                        <span class="input-group-addon">-</span>
                        <input type="text" class="form-control date-picker" v-model="form.close_end_time"
                               name="close_end_time"
                               placeholder="平仓时间（MT）" readonly>
                    </span>
                    <button type="button" class="btn btn-primary" @click="search()">搜索</button>
                </div>
            </div>
             <table class="table table-striped table-hover table-sm cxzhgd">
                <thead class="thead-light">
                <tr>
                    <th>订单</th>
                    <th>跟单账号</th>
                    <th>交易品种</th>
                    <th>类型</th>
                    <th>手数</th>
                    <th>开仓时间</th>
                    <th>开仓价格</th>
                    <th>平仓时间</th>
                    <th>平仓价格</th>
                    <th>盈亏（$）</th>
                    <th>信号源</th>
                </tr>
                </thead>
                <tbody>
                <tr class="hidden" aria-hidden="true" tabindex="-1"></tr>
                <tr v-for="(record,index) in records" :key="record.id">
                    <td>{{record.exec_deal}}</td>
                    <td>{{record.tradeuser}}</td>
                    <td>{{record.symbol}}</td>
                    <td>{{record.type}}</td>
                    <td>{{record.volume}}</td>
                    <td>{{record.opentime}}</td>
                    <td>{{record.openprice}}</td>
                    <td>{{record.closetime}}</td>
                    <td>{{record.closeprice}}</td>
                    <td>{{record.profit}} $</td>
                    <td>{{record.login}} $</td>
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
    name: "followMeMyHistory",
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
            queryParams: {},
            form: {
                tradeuser: '',
                exec_deal: '',
                type: '',
                open_start_time: '',
                open_end_time: '',
                close_start_time: '',
                close_end_time: '',
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
            if (this.queryParams.tradeuser) {
                params.tradeuser = this.queryParams.tradeuser;
            }
            if (this.queryParams.exec_deal) {
                params.exec_deal = this.queryParams.exec_deal;
            }
            if (this.queryParams.type) {
                params.type = this.queryParams.type;
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

            http.get(api + 'FixApply/fixnotes', {params})
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