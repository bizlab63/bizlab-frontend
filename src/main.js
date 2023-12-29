import { createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";
import VAnimateCss from "v-animate-css";
import './style.css'
import App from './App.vue'

import Login from "./components/login/Login.vue";
import Account from "./components/account/Account.vue";
import Project from "./components/project/Project.vue";

const routes = [
    { path: "/", component: Account },
    { path: "/login", component: Login },
    { path: "/:domain", component: Project, props: true },
    { path: "/:domain/:section", component: Project, props: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)

app.use(router)
app.use(VAnimateCss.default)

app.mount('#app')
