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
                    <li class="breadcrumb-item active">跟单列表</li>
                </ol>
            </div>
        </div>

        <div id="main" class="card-box myhidden">
            <div class="card-title d-flex">
                <span class="m-t-0 header-title">跟单列表</span>
                <div class="toolbar ml-auto">
                    <router-link to="/follow-me/my/history" class="btn btn-gradient">跟单记录</router-link>
                </div>
            </div>
           <table class="table table-striped table-hover table-sm gdlb">
                <thead class="thead-light">
                <tr>
                    <th>序号</th>
                    <th>MT4账号</th>
                    <th>牛人账号</th>
                    <th>跟单类型</th>
                    <th>跟单比例</th>
                    <th>跟单时间</th>
                    <th>状态</th>
                </tr>
                </thead>
                <tbody>
                <tr class="hidden" aria-hidden="true" tabindex="-1"></tr>
                <tr v-for="(record,index) in records" :key="record.id">
                    <th scope="row">{{index+1}}</th>
                    <td>{{record.mt_account}}({{record.broker}})</td>
                    <td>{{record.fix_login}}({{record.fix_broker}})</td>
                    <td>{{record.fix_type}}</td>
                    <td>{{record.direction}}</td>
                    <td>{{record.create_time}}</td>
                    <td>{{record.status}}</td>
                </tr>
                </tbody>
            </table>
        </div>
      <div class="comTable followMe">
        <ul class="b_flex b_column">
          <li class="b_flex b_wrap" v-for="(record,index) in records" :key="record.id">
            <div class="w-10 b_flex b_topcenter fir_box">
              <div class="b_flex w-8">
                <span class="nr">跟单时间</span>
                <p>{{record.create_time}}</p>
              </div>
            </div>
            <div class="w-5">
              <div  class="b_flex">
                <span>MT4账号</span>
                <p>{{record.mt_account}}</p>
              </div>
              <div  class="b_flex">
                <span>跟单类型</span>
                <p>{{record.fix_type}}</p>
              </div>
              <div  class="b_flex">
                <span>状态</span>
                <p>{{record.status}}</p>
              </div>
            </div>
            <div class="w-5">
              <div  class="b_flex">
                <span>牛人账号</span>
                <p>{{record.fix_login}}</p>
              </div>
              <div  class="b_flex">
                <span>跟单比例</span>
                <p v-if="record.direction!==''">{{record.direction}}</p>
                <p v-else>暂无</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</div>
</template>

<script>
import qs from 'querystring';

export default {
    name: "followMeMy",
    data() {
        return {
            records: []
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
            http.get(api + 'FixApply/fixlist')
                .then(function (response) {
                    const data = response.data;
                    if ('0' === data.code) {
                        vm.records = data.data;
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        stop(id) {
            swal({
                title: '确认要关闭跟单吗？',
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
                        "id": id
                    };

                    http.post(api + 'FixApply/closeapply', qs.stringify(params))
                        .then(function (response) {
                            const data = response.data;
                            if ('0' === data.code) {
                                swal({
                                    title: '取消成功！',
                                    icon: 'success',
                                    button: {
                                        text: '确定',
                                        className: 'btn btn-gradient',
                                    }
                                }).then(() => {
                                    this.init();
                                })
                            } else {
                                swal({
                                    title: '取消失败！',
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
