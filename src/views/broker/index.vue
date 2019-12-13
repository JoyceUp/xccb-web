<template>
<div class="wrapper">
    <div class="container-fluid">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-phone p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item active">代理申请</li>
                </ol>
            </div>
        </div>
        <div class="row justify-content-center">
            <div id="main" class="card-box col-10">
                <div class="row justify-content-md-center">
                    <div class="col-7">
                        <p class="h3">代理申请</p>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-5">
                        <form>
                            <div class="form-group">
                                <label for="level" class="col-form-label">代理级别</label>
                                <select id="level" class="custom-select" v-model="form.level">
                                    <option value="" selected>请选择</option>
                                    <option v-for="level in levels" :key="level.id" :value="level">
                                        {{level.levelname}}
                                    </option>
                                </select>
                                <input type="text" name="level" :value="form.level.level"
                                       style="display: none"
                                       data-parsley-required="true">
                            </div>
                            <div class="form-group">
                                <label class="col-form-label">直推客户</label>
                                <input type="text" class="form-control" name="direct_nums_to"
                                       data-parsley-type="integer" data-parsley-type-message="请输入整数"
                                       data-parsley-min="1" data-parsley-min-message="数值大于0"
                                       data-parsley-required="true" data-parsley-required-message="必填">
                            </div>
                            <div class="form-group">
                                <label class="col-form-label">入金量（USD）</label>
                                <input type="text" class="form-control" name="deposit_nums_to"
                                       data-parsley-type="integer" data-parsley-type-message="请输入整数"
                                       data-parsley-min="1" data-parsley-min-message="数值大于0"
                                       data-parsley-required="true" data-parsley-required-message="必填">
                            </div>
                            <div class="pull-right mt-1">
                                <router-link to="/withdraw" class="btn btn-link text-secondary">返回</router-link>
                                <button type="button" class="btn btn-gradient" @click="apply($event)">确定</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "broker",
    data() {
        return {
            levels: {},
            form: {
                level: ''
            }
        }
    },
    created() {
        const vm = this;
        const api = vm.api;
        const http = vm.$http;
        http.get(api + 'UserInfo/getagantlevel')
            .then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.levels = data.data;
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    computed: {
        direct() {
            if (!this.form.level) return '';
            if (!this.form.level.direct_nums_to) return '大于 ' + this.form.level.direct_nums_from;
            return this.form.level.direct_nums_from + ' - ' + this.form.level.direct_nums_to;
        },
        deposit() {
            if (!this.form.level) return '';
            if (!this.form.level.deposit_nums_to) return '大于 ' + this.form.level.deposit_nums_from;
            return this.form.level.deposit_nums_from + ' - ' + this.form.level.deposit_nums_to;
        }
    },
    methods: {
        apply: function (event) {
            const vm = this;
            let $form = $(event.target).closest('form');
            if ($form.parsley().validate()) {
                const api = vm.api;
                const http = vm.$http;

                http.post(api + 'UserInfo/agentapply', $form.serialize())
                    .then(function (response) {
                        const data = response.data;
                        if ('0' === data.code) {
                            swal({
                                title: '申请成功！',
                                icon: 'success',
                                button: {
                                    text: '确定',
                                    className: 'btn btn-gradient',
                                }
                            })
                        } else {
                            swal({
                                title: '申请失败！',
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