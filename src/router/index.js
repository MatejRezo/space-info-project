import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WeatherView from '../views/WeatherView.vue'
import NewsView from '../views/NewsView.vue'
import GalleryView from '../views/GalleryView.vue'

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/weather',
    name: 'weather',
    component: WeatherView
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: GalleryView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
