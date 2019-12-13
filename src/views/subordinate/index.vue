<template>
<div class="wrapper">
    <div class="container-fluid">
        <div class="page-title-box">
            <div class="btn-group ">
                <ol class="breadcrumb hide-mobile p-0 m-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li class="breadcrumb-item active">我的关系</li>
                </ol>
            </div>
        </div>
        <div class="row justify-content-center">
            <div id="main" class="card-box col-12">
                <table id="tree" class="table table-borderless table-hover table-sm">
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import 'jquery.fancytree/dist/skin-lion/ui.fancytree.min.css'
import fancytree from 'jquery.fancytree';
import table from 'jquery.fancytree/dist/modules/jquery.fancytree.table'

export default {
    name: "subordinate",
    data() {
        return {
            tree: null
        }
    },
    created() {
        this.$nextTick(() => this.initTree());
    },
    methods: {
        initTree() {
            let api = this.api,
                types = {
                    '1': '直客',
                    '2': '代理'
                },
                levels = {
                    '': '',
                    '1': '初级',
                    '2': '中级',
                    '3': '高级',
                    '4': '总监'
                },
                user = this.$store.state.user,
                token = user.token,
                myLevel = levels[user.level] || '',
                myType = types[user.user_type] || '';
                if(user.user_type === '1') myLevel = '';

            this.tree = fancytree.createTree('#tree', {
                extensions: ["table"],
                clickFolderMode: 3,
                source: [{
                    key: '',
                    title: '我(' + myLevel + myType + ')',
                    folder: true,
                    lazy: true,
                    icon: 'mdi mdi-account'
                }],
                renderColumns: function (event, data) {
                    let node = data.node,
                        $td = $(node.tr).find(">td"),
                        userId = node.key ? '?user_id=' + node.key : '';
                    let html = '<a href="#/subordinate/info' + userId + '" class="router-link-active btn btn-gradient btn-sm">余额详情</a>';
                    $td.eq(1).html(html)
                },
                lazyLoad: function (event, data) {
                    data.result = {
                        url: api + 'UserInfo/superior',
                        data: {
                            user_id: data.node.key,
                            token: token
                        },
                        cache: true
                    }
                },
                postProcess: function (event, data) {
                    let response = data.response;
                    if ('0' === response.code) {
                        let rs = [];
                        for (let i = 0; i < response.data.length; i++) {
                            let type = types[response.data[i].user_type],
                                level = levels[response.data[i].level],
                                title = response.data[i].user_login + '(' + level + type + ')',
                                folder = +response.data[i].soncount,
                                key = response.data[i].id,
                                icon = folder ? 'mdi mdi-account' : 'mdi mdi-account-outline';
                            rs.push({key, title, folder, lazy: folder, icon})
                        }
                        data.result = rs;
                    } else {
                        data.result = {
                            error: '加载下级异常！'
                        }
                    }
                }
            })
        },
        info(id) {
        }
    }
}
</script>