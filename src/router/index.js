import Vue from 'vue'
import Router from 'vue-router'
import goodsOrder from '@/views/goodsOrder';
import goods from '@/views/goods';

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/goodsOrder',
        name: 'goodsOrder',
        component: goodsOrder
    },
    {
        path: '/goods',
        name: 'goods',
        component: goods
    }
  ]
})
