import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuthStore'
import { User } from '@/helpers/auth'

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
    {
      path: '/dashboard',
      name: 'Dashboard',

      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard/users',
      name: 'UsersOverview',

      component: () => import('@/views/UsersView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {

  const { isAuthenticated, setIsAuthenticated } = useAuth()


  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'login' })
  } else next()

}
)

export default router
