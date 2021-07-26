import Vue from 'vue';
import VueRouter from 'vue-router';
import Polls from '../views/Polls.vue';
import Poll from '../views/Poll.vue';
import PollAddEdit from '../components/PollAddEdit.vue';
import PollResults from '../components/PollResults.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Polls',
    component: Polls,
  },
  {
    path: '/poll',
    name: 'Poll',
    component: Poll,
    children: [
      {
        path: ':id',
        component: PollAddEdit,
        name: 'PollAddEdit',
      },
      {
        path: ':id/results',
        component: PollResults,
        name: 'PollResults',
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
