import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MainHeader from '../MainHeader';
import mainNavMock from '../__tests__/mocks/mainHeaderMock';

const meta = {
  title: 'UI/MainHeader',
  component: MainHeader,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    navData: mainNavMock
  }
} satisfies Meta<typeof MainHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
