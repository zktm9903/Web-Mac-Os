import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DockViewer } from './Dock';
import { APPS } from '../apps/apps';

const meta = {
  title: 'common/Dock',
  component: DockViewer,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: 'black' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    allApps: APPS,
    runningApps: ['memo'],
    appIconOnClick: fn(),
  },
} satisfies Meta<typeof DockViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
