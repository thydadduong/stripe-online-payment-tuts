import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Succeed from "./views/Succeed.vue";
import Canceled from "./views/Canceled.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/canceled",
            name: "home",
            component: Canceled
        },
        {
            path: "/succeed",
            name: "succeed",
            component: Succeed
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
        }
    ]
});
