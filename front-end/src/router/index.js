import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Join from '../views/Join.vue'
import User from '../views/User.vue'
/*import Users from '../views/Users.vue'*/
import Edit from '../views/Edit.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/post',
    name: 'post',
    component: Post
  },
  {
    path: '/join',
    name: 'join',
    component: Join
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User
  },
  /*{
    path: '/user',
    name: 'users',
    component: Users
  },*/
  {
    path: '/user/:id/edit',
    name: 'edit',
    component: Edit
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
