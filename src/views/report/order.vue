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
                    <li class="breadcrumb-item active">订单报表</li>
                </ol>
            </div>
        </div>

        <div id="main" class="card-box ddbb">
            <div class="card-title d-flex">
                <div class="form-inline">
                    <input type="text" class="form-control mr-3" v-model="form.deal" placeholder="订单编号">
                    <select class="custom-select mr-3" v-model="form.type">
                        <option value="" selected>交易种类</option>
                        <option value="Sell">Sell</option>
                        <option value="Buy">Buy</option>
                    </select>
                    <select class="custom-select mr-3" v-model="form.broker">
                        <option value="" disabled selected>经纪商</option>
                        <option v-for="broker in brokers" :key="broker.id" :value="broker.id">
                            {{broker.broker}}
                        </option>
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
                <span class="ml-3">总盈亏：{{allprofit}}</span>
            </p>
            <table class="table table-striped table-hover table-sm ddbbtab myhidden">
                <thead class="thead-light">
                <tr>
                    <th>订单号</th>
                    <th>MT账号</th>
                    <th>经纪商</th>
                    <th>品种</th>
                    <th>方向</th>
                    <th>手数</th>
                    <th>开仓时间</th>
                    <th>开仓价</th>
                    <th>平仓时间</th>
                    <th>平仓价</th>
                    <th>盈亏</th>
                </tr>
                </thead>
                <tbody>
                <tr class="hidden" aria-hidden="true" tabindex="-1"></tr>
                <tr v-for="record in records" :key="record.id">
                    <td>{{record.deal}}</td>
                    <td>{{record.login}}</td>
                    <td>{{record.broker}}</td>
                    <td>{{record.symbol}}</td>
                    <td>{{record.type}}</td>
                    <td>{{record.volume}}</td>
                    <td>{{record.opentime}}</td>
                    <td>{{record.openprice}}</td>
                    <td>{{record.closetime}}</td>
                    <td>{{record.closeprice}}</td>
                    <td>{{record.profit}}</td>
                </tr>
                </tbody>
            </table>
          <div class="comTable myhBox">
            <div class="b_flex b_between w-10 th-head">
              <div class="b_flex  w-5 myshou">
                <p class="w-2">方向</p>
                <p class="w-5">品种</p>
                <p class="w-2">手数</p>
              </div>
              <p class="text-right">盈亏</p>
            </div>
            <ul class="b_flex b_column">
              <li class="b_flex b_wrap box-s" v-for="(record,index) in records" :key="record.id" @click="handleHidden(index)">
                <div class="w-10 b_flex b_topcenter fir_box">
                  <div class="b_flex b_between w-10">
                    <div class="b_flex w-7 myshou">
                      <p class="w-2 yell">{{record.type}}</p>
                      <p class="w-5">{{record.symbol}}</p>
                      <p class="w-2">{{record.volume}}</p>
                    </div>
                    <p class="text-right">${{record.profit}}</p>
                  </div>
                </div>
                <div class="hiddenBox b_flex b_between" v-show="index == activeDetail">
                  <div class="w-36">
                    <div  class="b_flex">
                      <span class="w-7">开仓价</span>
                      <p>{{record.openprice}}</p>
                    </div>
                    <div  class="b_flex">
                      <span class="w-7">平仓价</span>
                      <p>{{record.closeprice}}</p>
                    </div>
                    <div  class="b_flex">
                      <span class="w-7">订单号</span>
                      <p>{{record.deal}}</p>
                    </div>
                  </div>
                  <div class="w-64">
                    <div  class="b_flex">
                      <span>开仓时间</span>
                      <p>{{record.opentime}}</p>
                    </div>
                    <div  class="b_flex">
                      <span>平仓时间</span>
                      <p>{{record.closetime}}</p>
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
    name: "reportOrder",
    components: {
        Pagination
    },
    data() {
        return {
            brokers: [],
            activeDetail:'',
            records: [],
            page: {
                current: 1,
                totalPages: 1,
                totalElements: 0,
                size: 10
            },
            allvolume: 0,
            allprofit: 0,
            queryParams: {},
            form: {
                deal: '',
                type: '',
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
        handleHidden(index){
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
            if (this.queryParams.deal) {
                params.deal = this.queryParams.deal;
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
            if (this.queryParams.broker) {
                params.broker = this.queryParams.broker;
            }

            http.get(api + 'UserOrder/getlist', {params})
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
                        vm.allvolume = data.data.allvolume;
                        vm.allprofit = data.data.allprofit;
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
