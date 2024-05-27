import { APP } from '../types/os';
import MemoIcon from './memo/Icon';
import MemoContent from './memo/Content';
import ProfileIcon from './profile/Icon';
import ProfileContent from './profile/Content';

export const APPS: APP[] = [
  {
    name: 'memo',
    icon: <MemoIcon />,
    content: <MemoContent />,
    minWidth: 300,
    minHeight: 300,
    maxWidth: 500,
    maxHeight: 500,
  },
  {
    name: 'profile',
    icon: <ProfileIcon />,
    content: <ProfileContent />,
    minWidth: 300,
    minHeight: 550,
    maxWidth: 300,
    maxHeight: 550,
  },
];
