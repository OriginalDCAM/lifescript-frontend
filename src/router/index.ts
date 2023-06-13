import { createRouter, createWebHistory } from 'vue-router'
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
    {
      path: '/dashboard',
      children: [
        {
          path: '/users',
          name: 'users-view',
          component: () => import('@/views/UsersView.vue'),
          children: [
            {
              path: 'create',
              name: 'create-user',
              component: () => import('@/components/User/CreateUser.vue'),
            },
            {
              path: 'edit/:id',
              name: 'edit-user',
              component: () => import('@/components/User/EditUser.vue'),
            },
            {
              path: 'view/:id',
              name: 'view-user',
              component: () => import('@/components/User/ViewUser.vue'),
            }
          ]
        },
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/components/Dashboard/Index.vue'),
        },
      ],

      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true }
    }
  ]
})


/*  The reason I chose to initialize the auth session in this middleware is,
    because I want everything that deals with authentication
    checked everytime the user refreshes the page or visits a new page.  */
router.beforeEach(async (to, from, next) => {

  const { isAuthenticated, setIsAuthenticated, initializeAuth } = useAuth()

  await initializeAuth()

  if (to.fullPath === '/logout') {
    setIsAuthenticated(false)
    return next({ name: 'login' })
  }

  if (to.fullPath === '/login' && isAuthenticated.value) {
    return next({ name: 'Dashboard' })
  }

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return next({ name: 'login' })
  } else return next()

}
)

export default router
