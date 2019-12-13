<template>
<div class="wrapper">
    <div class="container-fluid">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-phone p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <router-link to="/subordinate" class="breadcrumb-item">我的关系</router-link>
                    <li class="breadcrumb-item active">余额详情</li>
                </ol>
            </div>
        </div>

        <div id="main">
            <div class="card-box rjxqt">
                <div class="card-title d-flex">
                    <div class="toolbar ml-auto">余额（USD）：{{totalProfit|thousandSeparator}}</div>
                </div>
                <table class="table table-striped table-hover table-sm">
                    <thead class="thead-light">
                    <tr>
                        <th>MT4账号</th>
                        <th>经纪商</th>
                        <th>姓名</th>
                        <th>余额（USD）</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="hidden" aria-hidden="true" tabindex="-1"></tr>
                    <tr v-for="close in closes.list" :key="close.id">
                        <td>{{close.login}}</td>
                        <td>{{close.broker}}</td>
                        <td>{{close.user_nickname}}</td>
                        <td>{{close.profit}}</td>
                    </tr>
                    </tbody>
                </table>
                <button class="btn btn-gradient btn-block"
                        :disabled="closes.loading || closes.pagenum===closes.totalpage"
                        @click="loadCloses(closes.pagenum+1)">
                    <span v-show="closes.loading" class="spinner-border spinner-border-sm"></span>加载{{closes.loading?'中':'更多'}}
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "subordinateInfo",
    data() {
        return {
            totalProfit: 0,
            closes: {
                list: [],
                loading: false,
                pagenum: 0,
                totalpage: 0
            }
        }
    },
    created() {
        // 当前持仓
        this.loadCloses();
    },
    filters: {
        thousandSeparator(num) {
            return num && (num.toString().indexOf('.') !== -1
                    ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, ($1, $2) => $2 + ",")
                    : num.toString().replace(/(\d)(?=(\d{3})+\b)/g, ($1, $2) => $2 + ",")
            )
        },
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

            http.get(api + 'UserInfo/superiorinfo', {params: params, async: true})
                .then(function (response) {
                    const data = response.data;
                    if ('0' === data.code) {
                        vm.closes.list = vm.closes.list.concat(data.data.list);
                        vm.closes.pagenum = +data.data.pagenum;
                        vm.closes.totalpage = +data.data.totalpage;
                        vm.totalProfit = +data.data.profit
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
