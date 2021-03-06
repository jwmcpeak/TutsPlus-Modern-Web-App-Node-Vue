import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('./views/Portfolio.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/currencies',
      name: 'currencies',
      component: () => import('./views/admin/Currencies.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {

      if (localStorage.getItem('token') == null) {
        next({
          path: '/login',
          params: {nextUrl: to.fullPath}
        });
      } else {
        let user = JSON.parse(localStorage.getItem('user'));

        if (to.matched.some(route => route.meta.requiresAdmin)) {
          if (user.isAdmin) next();
          else {
            next({
              path: '/login',
              params: {nextUrl: to.fullPath}
            });
          }
        } else {
          next();
        }
      }
  } else {
    next();
  }
});


export default router;
