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
                    <router-link to="/follow-me/top" class="breadcrumb-item">牛人榜</router-link>
                    <li class="breadcrumb-item active">牛人详情</li>
                </ol>
            </div>
        </div>

        <div id="main">
            <div class="card-box">
                <div class="row d-flex">
                    <div class="col">
                        <div class="media mt-0">
                            <img src="/assets/images/avatar.png" class="rounded-circle my-auto" width="85px"
                                 height="85px">
                            <div class="card-body">
                                <h5 class="card-title">{{info.username}}</h5>
                                <span>注册时间：{{info.regdate}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col d-flex justify-content-around">
                        <div class="p-4 text-center">
                            <p>盈利率</p>
                            <h5 class="card-title">{{info.profit_rates}}%</h5>
                        </div>
                        <span class="divider"></span>
                        <div class="p-4 text-center">
                            <p>准确率</p>
                            <h5 class="card-title">{{info.trading_rates}}%</h5>
                        </div>
                        <span class="divider"></span>
                        <div class="p-4 text-center">
                            <p>总盈亏</p>
                            <h5 class="card-title">$ {{info.total_profit}}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row tdjy">
                <div class="col-9">
                    <div class="card-box">
                        <ul class="nav nav-tabs tabs-bordered">
                            <li class="nav-item">
                                <a href="#home-a1" data-toggle="tab" aria-expanded="false"
                                   class="nav-link text-success active">
                                    TA的交易
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="home-1">
                                <table class="table table-striped m-0">
                                    <tbody>
                                    <tr class="border-bottom">
                                        <td class="border-right" style="width: 50%">
                                            <div class="d-flex justify-content-between px-3">
                                                <b>账户余额：</b> $ {{info.balance}}
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr class="border-bottom">
                                        <td class="border-right">
                                            <div class="d-flex justify-content-between px-3">
                                                <b>盈利交易：</b> {{info.win_profit}} 笔
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex justify-content-between px-3">
                                                <b>亏损交易：</b> {{info.loss_profit}} 笔
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-bottom">
                                        <td class="border-right">
                                            <div class="d-flex justify-content-between px-3">
                                                <b>成功做多的交易：</b> {{info.win_buy}} 笔
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex justify-content-between px-3">
                                                <b>成功做空的交易：</b> {{info.win_sell}} 笔
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-bottom">
                                        <td class="border-right">
                                            <div class="d-flex justify-content-between px-3">
                                                <b>最佳交易：</b> $ {{info.best_deal}}
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex justify-content-between px-3">
                                                <b>最差交易：</b> $ {{info.worst_deal}}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-bottom">
                                        <td class="border-right">
                                            <div class="d-flex justify-content-between px-3">
                                                <b>交易周期：</b> {{info.deal_cycle}} 天
                                            </div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card-box">
                        <ul class="nav nav-tabs tabs-bordered">
                            <li class="nav-item">
                                <a href="#home-a1" data-toggle="tab" aria-expanded="false"
                                   class="nav-link text-success active">
                                    交易信息
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="home-a1">
                                <ul class="plan-stats list-unstyled">
                                    <li class="d-flex justify-content-between border-bottom my-3">
                                        <b>开始交易：</b> {{info.open_trading_time}}
                                    </li>
                                    <li class="d-flex justify-content-between border-bottom my-3">
                                        <b>最近交易：</b> {{info.last_trading_time}}
                                    </li>
                                    <li class="d-flex justify-content-between border-bottom my-3">
                                        <b>杠杆比例：</b> {{info.leverage}}
                                    </li>
                                    <li class="d-flex justify-content-between border-bottom my-3">
                                        <b>总交易量：</b> {{info.volume/100}} 手
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-box jyjk">
                <ul class="nav nav-tabs tabs-bordered">
                    <li class="nav-item">
                        <a href="#home-b1" data-toggle="tab" aria-expanded="false"
                           class="nav-link text-success active">
                            交易概况
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#messages-b1" data-toggle="tab" aria-expanded="false" class="nav-link text-success">
                            历史交易
                        </a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="home-b1">
                        <div class="row">
                            <div class="col-6">
                                <ve-line :data="chartData1" :settings="settings1"></ve-line>
                            </div>
                            <div class="col-6">
                                <ve-bar :data="chartData2" :settings="settings2"></ve-bar>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <ve-histogram :data="chartData3" :settings="settings3"></ve-histogram>
                            </div>
                            <div class="col-6">
                                <ve-pie :data="chartData4" :extend="extend4" :legend-visible="false"></ve-pie>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="messages-b1">
                        <table class="table table-striped table-hover table-sm">
                            <thead class="thead-light">
                            <tr>
                                <th>订单号</th>
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
                            <tr v-for="close in closes.list" :key="close.id">
                                <td>{{close.deal}}</td>
                                <td>{{close.symbol}}</td>
                                <td>{{close.type}}</td>
                                <td>{{close.volume}}</td>
                                <td>{{close.opentime}}</td>
                                <td>{{close.openprice}}</td>
                                <td>{{close.closetime}}</td>
                                <td>{{close.closeprice}}</td>
                                <td>{{close.profit}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <button class="btn btn-gradient btn-block"
                                :disabled="closes.loading || closes.pagenum===closes.totalpage"
                                @click="loadCloses(closes.pagenum+1)">
                            <span v-show="closes.loading" class="spinner-border spinner-border-sm" role="status"
                                  aria-hidden="true"></span>
                            加载{{closes.loading?'中':'更多'}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "followMeTopInfo",
    data() {
        return {
            info: {},
            chartData1: {
                columns: ['time', 'data'],
                rows: []
            },
            settings1: {
                labelMap: {
                    time: '日期',
                    data: '盈利'
                }
            },
            dataZoom1: [
                {
                    type: 'slider',
                    start: 80,
                    end: 100
                }
            ],
            chartData2: {
                columns: ['time', 'data'],
                rows: []
            },
            settings2: {
                labelMap: {
                    time: '日期',
                    data: '日收益'
                }
            },
            chartData3: {
                columns: ['time', 'data'],
                rows: []
            },
            settings3: {
                labelMap: {
                    time: '日期',
                    data: '交易笔数'
                }
            },
            chartData4: {
                columns: ['name', 'value'],
                rows: []
            },
            extend4: {
                title: {
                    text: '交易种类',
                    textStyle: {
                        color: '#3ec396'
                    }
                },
                tooltip: {
                    formatter: '{b} <br/> 交易次数：{c} ({d}%)'
                }
            },
            closes: {
                list: [],
                loading: false,
                pagenum: 0,
                totalpage: 0
            }
        }
    },
    created() {
        const vm = this;
        const api = vm.api;
        const http = vm.$http;

        // 详情
        http.get(api + 'CattleUser/getuserinfo', {params: vm.$route.query})
            .then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.info = data.data;
                }
            })
            .catch(function (error) {
                console.log(error)
            });

        // 盈利
        http.get(api + 'CattleUser/allequity', {params: vm.$route.query})
            .then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.chartData1.rows = data.data;
                }
            })
            .catch(function (error) {
                console.log(error)
            });

        // 日收益
        http.get(api + 'CattleUser/dayprofit', {params: vm.$route.query})
            .then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.chartData2.rows = data.data;
                }
            })
            .catch(function (error) {
                console.log(error)
            });

        // 交易种类
        http.get(api + 'CattleUser/transactiontype', {params: vm.$route.query})
            .then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.chartData4.rows = data.data;
                }
            })
            .catch(function (error) {
                console.log(error)
            });

        // 交易笔数
        http.get(api + 'CattleUser/transactionnums', {params: vm.$route.query})
            .then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.chartData3.rows = data.data;
                }
            })
            .catch(function (error) {
                console.log(error)
            });

        this.loadCloses();
    },
    methods: {
        loadCloses(page) {
            const vm = this;
            const api = vm.api;
            const http = vm.$http;
            let params = vm.$route.query;
            if (page) {
                params.page = page;
                vm.closes.loading = true;
            }

            http.get(api + 'CattleUser/historytrade', {params: params, async: true})
                .then(function (response) {
                    const data = response.data;
                    if ('0' === data.code) {
                        vm.closes.list = vm.closes.list.concat(data.data.list);
                        vm.closes.pagenum = +data.data.pagenum;
                        vm.closes.totalpage = +data.data.totalpage;
                    }
                    vm.closes.loading = false;
                })
                .catch(function (error) {
                    vm.closes.loading = false;
                    console.log(error)
                });
        }
    }
}
</script>