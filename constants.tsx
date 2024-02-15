
import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Campamentos',
    path: '/campamentos',
  },
  {
    title: 'Sector',
    path: '/sectores',
  },
  {
    title: 'Wing / Pabellones',
    path: '/wings',
    submenu: false,
    subMenuItems: [
      { title: 'Todos', path: '/mis-medicamentos' },
      { title: 'Importantes', path: '/mis-medicamentos/importantes' },
    ],
  },
  {
    title: 'Espacios',
    path: '/espacios',
  },
  {
    title: 'Habitaciones',
    path: '/habitaciones',
    submenu: false,
    subMenuItems: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Privacy', path: '/settings/privacy' },
    ],
  },
  {
    title: 'Motivos',
    path: '/motivos',
  },
  {
    title: 'Usuarios',
    path: '/usuarios',
  },
  {
    title: 'Responsables',
    path: '/responsables',
  },
];
