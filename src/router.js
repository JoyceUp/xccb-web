import Vue from 'vue'
import Router from 'vue-router'
import {createRouterLayout} from 'vue-router-layout'
import store from './store'
import loading from "./plugins/loading";
import routes from './routes'

Vue.use(Router)

const RouterLayout = createRouterLayout(layout => {
    return import('@/layouts/' + layout + '.vue')
})

const router = new Router({
    routes: [
        {
            path: '/',
            component: RouterLayout,
            children: routes
        }
    ]
})

router.beforeEach((to, from, next) => {
    loading && loading.close();
    const vstore = localStorage.getItem("VueStore");
    if (vstore) {
        store.replaceState(Object.assign(store.state, JSON.parse(vstore)));
        localStorage.removeItem("VueStore");
    }
    if (to.meta.anon || store.state.user && store.state.user.token) {
        next();
    } else {
        next('/login')
    }
})

export default router;
