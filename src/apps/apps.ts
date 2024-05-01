import memoIcon from './memo/icon';
import memoContent from './memo/content';

export const APPS: {
  name: string;
  icon: () => JSX.Element;
  content: () => JSX.Element;
}[] = [
  {
    name: 'memo',
    icon: memoIcon,
    content: memoContent,
  },
];
