import type { Meta, StoryObj } from '@storybook/react';
import { AppViewer } from './PlayGround';
import { fn } from '@storybook/test';

const meta = {
  title: 'common/AppViewer',
  component: AppViewer,
  parameters: {
    layout: 'left',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: <></>,
    x: 50,
    y: 50,
    appName: 'test',
    visible: true,
    setX: fn(),
    setY: fn(),
    setWidth: fn(),
    setHeight: fn(),
    redButtonEvent: fn(),
    yellowButtonEvent: fn(),
    greenButtonEvent: fn(),
  },
} satisfies Meta<typeof AppViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    width: 300,
    height: 300,
    minWidth: 400,
    minHeight: 400,
    maxWidth: 500,
    maxHeight: 500,
  },
};
