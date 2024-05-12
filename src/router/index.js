import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '@/views/MainMenu.vue'
import MembacaView from '@/views/MembacaView.vue'
import MenghitungView from '@/views/MenghitungView.vue'
import MenulisView from '@/views/MenulisView.vue'
import BelajarView from '@/views/BelajarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainMenu
    },
    {
      path: '/belajar/menghitung',
      name: 'Belajar-Menghitung',
      component: MenghitungView
    },
    {
      path: '/belajar/membaca',
      name: 'Belajar-Membaca',
      component: MembacaView
    },
    {
      path: '/belajar/menulis',
      name: 'Belajar-Menulis',
      component: MenulisView
    },
    {
      path: '/belajar',
      name: 'Belajar',
      component: BelajarView
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      redirect: '/'
    },
  ]
})

export default router
