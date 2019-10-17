import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store';
import NSCallObject from "@/models/NSCallObject";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
];

const router = new VueRouter({
  routes
});

export default router
