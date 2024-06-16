import type { Meta, StoryObj } from '@storybook/react';
import { AppContainer } from '../../commons/PlayGround';
import { APPS } from '../apps';
import { MemoryRouter } from 'react-router-dom';

const memoApp = APPS.find((app) => app.name === 'memo')!;

const meta = {
  title: 'app/memo',
  component: AppContainer,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'left',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    app: memoApp,
    AppContent: memoApp.content,
    appStatus: 'show',
  },
} satisfies Meta<typeof AppContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
