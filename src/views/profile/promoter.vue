<template>
<div class="wrapper">
    <div class="container-fluid">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-mobile p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item active">邀请链接</li>
                </ol>
            </div>
        </div>
        <div class="row justify-content-center">
            <div id="main" class="card-box col-10  yqljwx">
                <div class="row justify-content-md-center my-3">
                    <div class="col-10">
                        <h3>邀请链接</h3>
                    </div>
                </div>
                <div class="row justify-content-md-center my-3">
                    <div class="col-10">
                        <div class="text-center">
                            <figure class="figure">
                                <img class="figure-img img-fluid rounded border" :src="qrDataUrl">
                                <figcaption class="figure-caption">邀请码：{{invent_code}}</figcaption>
                            </figure>
                        </div>

                        <p class="d-flex justify-content-center">
                            <span class="align-self-center">邀请链接：</span>
                            <span type="text" class="form-control mr-3 bg-light w-auto">{{url+invent_code}}</span>
                            <button ref="copy" type="button" class="btn btn-gradient btn-sm"
                                    :data-clipboard-text="url+invent_code">复制</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import QRCode from 'qrcode';
import Clipboard from 'clipboard';

export default {
    name: "profilePromoter",
    data() {
        return {
            url: 'https://user.fxtradelink.com/#/register?invent_code=',
            invent_code: '',
            qrDataUrl: '',
            copy:null
        }
    },
    mounted(){
        this.copy = new Clipboard(this.$refs.copy);
        this.copy.on('success', function (e) {
            swal({
                title: '复制成功！',
                button: {
                    text: '确定',
                    className: 'btn btn-gradient',
                }
            })
        }).on('error', function() {
            swal({
                title: '复制失败，请手动选择复制！',
                button: {
                    text: '确定',
                    className: 'btn btn-gradient',
                }
            })
        });
    },
    created() {
        const vm = this;
        const api = vm.api;
        const http = vm.$http;
        vm.qrcode(vm.url + vm.invent_code)

        http.get(api + 'UserInfo/agenturl')
            .then(function (response) {
                const data = response.data;
                if ('0' === data.code) {
                    vm.invent_code = data.data.url;
                    vm.qrcode(vm.url + vm.invent_code)
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    methods: {
        qrcode(text) {
            const vm = this;
            QRCode.toDataURL(text)
                .then(url => {
                    vm.qrDataUrl = url;
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }
}
</script>