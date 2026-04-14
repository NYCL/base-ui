import { createRouter, createWebHashHistory } from 'vue-router';
import QuickStartPage from './pages/QuickStart.md';

const routes = [
  { path: '/', redirect: '/overview/quick-start' },
  { path: '/overview/quick-start', component: QuickStartPage, meta: { title: 'Quick Start' } },
  {
    path: '/overview/accessibility',
    component: import('./pages/Accessibility.md'),
    meta: { title: 'Accessibility' },
  },
  { path: '/components/field', component: import('./pages/Field.md'), meta: { title: 'Field' } },
  { path: '/components/input', component: import('./pages/Input.md'), meta: { title: 'Input' } },
  {
    path: '/components/checkbox',
    component: import('./pages/Checkbox.md'),
    meta: { title: 'Checkbox' },
  },
  {
    path: '/components/checkbox-group',
    component: import('./pages/CheckboxGroup.md'),
    meta: { title: 'Checkbox Group' },
  },
  { path: '/components/switch', component: import('./pages/Switch.md'), meta: { title: 'Switch' } },
  { path: '/components/radio', component: import('./pages/Radio.md'), meta: { title: 'Radio' } },
  {
    path: '/components/radio-group',
    component: import('./pages/RadioGroup.md'),
    meta: { title: 'Radio Group' },
  },
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
