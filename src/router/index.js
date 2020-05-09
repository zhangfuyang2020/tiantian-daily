import Vue from 'vue'
import VueRouter from 'vue-router'
import TtrbDaily from '../views/TtrbDaily'
import TtrbSpecial from '../views/TtrbSpecial'
import AdilyArticleDetails from '../components/DailyArticle/DailyArticleDetails'
import SpecialArticleDetails from '../components/SpecialArticle/SpecialArticleDetails'
import SpecialArticleContent from '../components/SpecialArticle/SpecialArticleContent'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'TtrbDaily',
    component: TtrbDaily
  },
  {
    path: '/special',
    name: 'TtrbSpecial',
    component:TtrbSpecial
  },
  {
    path: '/about',
    name: 'TtrbAbout',
    component: () => import('../views/TtrbAbout.vue')
  },
  {
    path: '/article',
    name: 'AdilyArticleDetails',
    component: AdilyArticleDetails
  },
  {
    path: '/special/article',
    name: 'SpecialArticleDetails',
    component: SpecialArticleDetails
  },
  {
    path: '/special/article/content',
    name: 'SpecialArticleContent',
    component: SpecialArticleContent
  },
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: "history",
  base: process.env.BASE_URL
})

export default router
