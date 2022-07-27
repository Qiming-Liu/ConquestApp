// component
import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'index1',
    path: '/index1',
    icon: getIcon('ant-design:home-twotone'),
  },
  {
    title: 'index2',
    path: '/index2',
    icon: getIcon('bxs:home'),
  },
  {
    title: 'index3',
    path: '/index3',
    icon: getIcon('clarity:home-solid'),
  },
];

export default navConfig;
