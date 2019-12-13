"use strict";

import Vue from 'vue';
import store from '../store';
import router from '../router';

import axios from 'axios';
import qs from 'querystring';
import loading from './loading';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};
const _axios = axios.create(config);

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

_axios.interceptors.request.use(
    function (config) {
        if (!config.async) loading.open();
        const user = store.state.user
        if (user) {
            if (config.method === 'get') {
                if (!config.params) {
                    config.params = {}
                }
                config.params.token = user.token
            } else {
                config.transformRequest = function (data) {
                    if (data instanceof FormData) {
                        data.append('token', user.token);
                        return data;
                    } else {
                        let params = qs.parse(data);
                        params.token = user.token;
                        return qs.stringify(params)
                    }
                }
            }
        }
        return config;
    },
    function (error) {
        loading.close();
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        loading.close();
        if (250 === response.data.code) {
            swal({
                title: '操作超时，请重新登录！',
                icon: 'info',
                button: {
                    text: '确认',
                    className: 'btn btn-gradient',
                }
            }).then(() => {
                store.commit('logout');
                router.push('login')
            })
        }
        return response;
    },
    function (error) {
        loading.close();
        // Do something with response error
        return Promise.reject(error);
    }
);

let Plugin = {}
Plugin.install = function (Vue) {
    Vue.$http = _axios;
    window.$http = _axios;
    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return _axios;
            }
        }
    });
};

Vue.use(Plugin)

export default Plugin;
