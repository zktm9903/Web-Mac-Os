import type { Meta, StoryObj } from '@storybook/react';
import TopBar from './TopBar';

const meta = {
  title: 'common/TopBar',
  component: TopBar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: 'gray' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
