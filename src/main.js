import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/loading'
import vcharts from 'v-charts'
import animated from 'animate.css'
import VuCountryIntl from 'vue-country-intl';
import 'vue-country-intl/lib/vue-country-intl.css';
import '@/styles/vue-country-intl.css'

Vue.config.productionTip = false;
// Vue.prototype.api = 'http://192.168.0.103:8081/index.php/home/';
Vue.prototype.api = 'https://api.fxtradelink.com/index.php/home/';
Vue.use(vcharts);
Vue.use(animated);

Vue.component(VuCountryIntl.name, VuCountryIntl);
Vue.prototype.onlyCountry = [
    'bn',
    'cn',
    'hk',
    'id',
    'kh',
    'la',
    'mm',
    'mo',
    'my',
    'ph',
    'sg',
    'th',
    'tl',
    'tw',
    'vn',
]

Vue.prototype.logout = function () {
    swal({
        title: '确认要退出系统吗？',
        icon: 'info',
        buttons: {
            ok: {
                text: '确认',
                className: 'btn btn-light waves-effect',
            },
            rt: {
                text: '否',
                className: 'btn btn-gradient',
            }
        }
    }).then((value) => {
        if (value === 'ok') {
            this.$store.commit('logout');
            this.$router.push('login')
        }
    })
};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')