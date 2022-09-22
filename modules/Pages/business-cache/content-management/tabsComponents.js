import Analytic from './analytic';
import ContentList from './ContentList';
import ContentManagement from './dashboard';
import Monetize from './monetize';

// register here first
const Tabs = [
  {
    label: 'Dashboard',
    value: 'dashboard',
  },
  {
    label: 'Konten',
    value: 'konten',
  },
  {
    label: 'Analytic',
    value: 'analytic',
  },
  {
    label: 'Monetize',
    value: 'monetize',
  },
];

// add component tab here
// note : match value with the top data (Tabs)
const TabPanelsComponents = [
  {
    value: 'dashboard',
    component: <ContentManagement />,
  },
  {
    value: 'konten',
    component: <ContentList />,
  },
  {
    value: 'analytic',
    component: <Analytic />,
  },
  {
    value: 'monetize',
    component: <Monetize />,
  },
];

export { Tabs, TabPanelsComponents };
