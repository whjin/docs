import { createRouter, createWebHistory } from 'vue-router';
import BusinessPage from '@/views/BusinessPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BusinessPage,
    },
  ],
});

export default router;
