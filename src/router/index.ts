import { createRouter, createWebHistory } from 'vue-router'
import { User } from '@/helpers/auth'
import { useAuth } from '@/composables/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',

      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false }
    },
    {
    path: '/register',
    name: 'register',

      component: () => import('../components/Register.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'BookList',

      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',

      component: () => import('../components/PageNotFound.vue')
    },
    {
      path: '/create-page',
      name: 'CreatePage',

      component: () => import('../components/Page/CreatePage.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from) => {

  const { isAuthenticated, initializeAuth } = useAuth()

  initializeAuth()


  if (to.meta.requiresAuth && !isAuthenticated.value) {
      console.log('User is not authenticated')
      return { name: 'login' }
  }
  else if (!to.meta.requiresAuth && isAuthenticated.value) {
      console.log('User is authenticated')
      return
  }

  }
)

export default router
