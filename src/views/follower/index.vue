<template>
<div class="wrapper">
    <div class="container-fluid">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-phone p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item active">跟随用户</li>
                </ol>
            </div>
        </div>

        <div id="main" class="card-box">
            <div class="card-title d-flex">
                <div class="form-inline">
                    <input type="text" class="form-control mr-3" v-model="form.mt_account" placeholder="MT4账户">
                    <input type="text" class="form-control mr-3" v-model="form.user_login" placeholder="昵称">
                    <button type="button" class="btn btn-primary" @click="search()">搜索</button>
                </div>
            </div>
            <table class="table table-striped table-hover table-sm">
                <thead class="thead-light">
                <tr>
                    <th>序号</th>
                    <th>昵称</th>
                    <th>跟随时间</th>
                    <th>mt4账号</th>
                    <th>余额</th>
                    <th>杠杆</th>
                </tr>
                </thead>
                <tbody>
                <tr class="hidden" aria-hidden="true" tabindex="-1"></tr>
                <tr v-for="(record,index) in records" :key="record.id">
                    <td>{{record.id}}</td>
                    <td>{{record.user_login}}</td>
                    <td>{{record.create_time}}</td>
                    <td>{{record.mt_account}}</td>
                    <td>{{record.balance}}</td>
                    <td>{{record.leverage}}</td>
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
    name: "follower",
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
                mt_account: '',
                user_login: '',
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
            if (this.queryParams.mt_account) {
                params.mt_account = this.queryParams.mt_account;
            }
            if (this.queryParams.user_login) {
                params.user_login = this.queryParams.user_login;
            }

            http.get(api + 'FollowUser/getlist', {params})
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