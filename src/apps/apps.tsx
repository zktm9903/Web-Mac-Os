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
    maxWidth: 900,
    maxHeight: 900,
  },
  {
    name: 'profile',
    icon: <ProfileIcon />,
    content: lazy(() => import('./profile/Profile')),
    minWidth: 300,
    minHeight: 550,
    maxWidth: 300,
    maxHeight: 550,
  },
];
