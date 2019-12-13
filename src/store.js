import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 1 用户
        // 2 代理
        // 3 信号源
        user: {
            avatarsrc: '',
            user_type: '',
            user_login: '',
            token: ''
        },
        loading: null
    },
    mutations: {
        login(state, user) {
            state.user = user || {};
            if (!state.user.avatarsrc) {
                state.user.avatarsrc = 'assets/images/avatar.png'
            }
        },
        loading(state, loading) {
            state.loading = loading;
        },
        logout(state) {
            state.user = {
                avatarsrc: '',
                user_type: '',
                user_login: '',
                token: ''
            };
        }
    },
    actions: {}
})