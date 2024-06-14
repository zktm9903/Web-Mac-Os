import { lazy } from 'react';
import { APP } from '../types/os';
import MemoIcon from './memo/Icon';
import ProfileIcon from './profile/Icon';

export const APPS: APP[] = [
  {
    name: 'memo',
    icon: <MemoIcon />,
    content: lazy(() => import('./memo/Memo')),
    minWidth: 500,
    minHeight: 500,
    maxWidth: 98765321,
    maxHeight: 98765321,
    resizable: true,
  },
  {
    name: 'profile',
    icon: <ProfileIcon />,
    content: lazy(() => import('./profile/Profile')),
    minWidth: 300,
    minHeight: 550,
    maxWidth: 300,
    maxHeight: 550,
    resizable: false,
  },
];
