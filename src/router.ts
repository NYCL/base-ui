import { createRouter, createWebHashHistory } from 'vue-router';
import QuickStartPage from './pages/QuickStart.md';
import AccessibilityPage from './pages/Accessibility.md';
import FieldPage from './pages/Field.md';
import InputPage from './pages/Input.md';

const routes = [
  { path: '/', redirect: '/overview/quick-start' },
  { path: '/overview/quick-start', component: QuickStartPage, meta: { title: 'Quick Start' } },
  {
    path: '/overview/accessibility',
    component: AccessibilityPage,
    meta: { title: 'Accessibility' },
  },
  { path: '/components/field', component: FieldPage, meta: { title: 'Field' } },
  { path: '/components/input', component: InputPage, meta: { title: 'Input' } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: 'smooth' };
    }
    return savedPosition || { top: 0 };
  },
});

export default router;
