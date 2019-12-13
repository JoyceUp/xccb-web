<template>
<div class="wrapper">
    <div class="container-fluid">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-phone p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/withdraw">提取资金</router-link>
                    </li>
                    <li class="breadcrumb-item active">申请</li>
                </ol>
            </div>
        </div>
        <div class="row justify-content-center no-mar">
            <div id="main" class="card-box col-10 wid95">
                <div class="row justify-content-md-center">
                    <div class="col-7">
                        <p class="h3">提现申请</p>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-5">
                        <form>
                            <div class="form-group">
                                <label for="amount" class="col-form-label">提取金额（USD）</label>
                                <input type="text" class="form-control" id="amount" name="usdnum"
                                       placeholder="0.00" v-model="form.amount"
                                       data-parsley-required="true"
                                       data-parsley-min="100" data-parsley-min-message="提取金额大于100"
                                       :data-parsley-max="balance" data-parsley-max-message="账户余额不足"
                                       data-parsley-type="number" data-parsley-type-message="请输入数字">
                                <p class="form-text">
                                    可用余额：$ {{balance}}
                                </p>
                            </div>
                            <div class="pull-right mt-1">
                                <router-link to="/withdraw" class="btn btn-link text-secondary">返回</router-link>
                                <button type="button" class="btn btn-gradient" @click="apply($event)">确定</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row justify-content-md-center zysx">
                    <div class="col-7">
                        <h4 class="mt-5 header-title">注意事项</h4>
                        <ul>
                            <li>如因您的收款信息填写有误导致的任何损失，TradeLink 对此概不负责；</li>
                            <li>提现奖金金额必须大于 $100.00，才能激活提现功能；</li>
                            <li>汇款过程中产生的费用（如银行手续费等）均由收款人承担。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "withdrawApply",
    data() {
        return {
            balance: 0,
            form: {
                amount: ''
            }
        }
    },
    created() {
        const vm = this;
        const api = vm.api;
        const http = vm.$http;
        http.get(api + 'OutMoney/getbalance')
            .then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.balance = data.data;
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    methods: {
        apply: function (event) {
            const vm = this;
            let $form = $(event.target).closest('form');
            if ($form.parsley().validate()) {
                const api = vm.api;
                const http = vm.$http;

                http.post(api + 'OutMoney/doout', $form.serialize())
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
                            }).then(() => {
                                vm.$router.push('/withdraw')
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
