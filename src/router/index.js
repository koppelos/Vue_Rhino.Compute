import { createRouter, createWebHistory } from 'vue-router';
import MultiGeometry from '../components/MultiGeometry.vue';

const routes = [
  {
    path: '/threejs-scene',
    name: 'MultiGeometry',
    component: MultiGeometry
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
