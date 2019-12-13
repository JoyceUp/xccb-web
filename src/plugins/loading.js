import Vue from 'vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import store from '../store';

Vue.use(Loading, {
    color: '#3c86d8'
});

export default {
    open() {
        if (!store.state.loading) {
            let _loading = Vue.$loading.show();
            store.commit('loading', _loading);
        }
    },
    close() {
        if (store.state.loading) {
            store.state.loading.hide();
            store.commit('loading', null);
        }
    }
};