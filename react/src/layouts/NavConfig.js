// component
import Iconify from '../theme/component/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'home',
    path: '/home',
    icon: getIcon('bxs:home'),
  },
  {
    title: 'document',
    path: '/document',
    icon: getIcon('clarity:document-solid'),
  },
];

export default navConfig;
