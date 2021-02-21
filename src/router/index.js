import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DetailPage from "@/components/DetailPage";
import Login from "@/components/Login";

Vue.use(VueRouter)

const routes = [
    {
        path: '/game/:id', component: DetailPage
    },
    {
        path: "/login",
        component: Login
    },

]

const router = new VueRouter({
    routes
})

export default router
