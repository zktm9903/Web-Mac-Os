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
  },
  {
    name: 'profile',
    icon: <ProfileIcon />,
    content: <ProfileContent />,
  },
];
