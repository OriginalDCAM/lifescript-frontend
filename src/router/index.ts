import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',

      component: () => import('../views/LoginView.vue')
    },
    {
    path: '/register',
    name: 'register',

      component: () => import('../components/Register.vue')
    },
    {
      path: '/',
      name: 'BookList',

      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',

      component: () => import('../components/PageNotFound.vue')
    },
    {
      path: '/create-page',
      name: 'CreatePage',

      component: () => import('../components/Page/CreatePage.vue')
    },
  ]
})

export default router
