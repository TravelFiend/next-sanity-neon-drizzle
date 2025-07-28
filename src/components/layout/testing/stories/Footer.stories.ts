import Footer from '../../Footer';
import { footerMock } from '@mocks/layout/footerMock';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  args: {
    footerData: footerMock
  }
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
