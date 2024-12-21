import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/product/:id',
      component: () => import('../views/ProductDetail.vue')
    },
    {
      path: '/cart',
      component: () => import('../views/Cart.vue')
    },
    {
      path: '/order',
      component: () => import('../views/Order.vue')
    },
    {
      path: '/user',
      component: () => import('../views/User.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token')
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
