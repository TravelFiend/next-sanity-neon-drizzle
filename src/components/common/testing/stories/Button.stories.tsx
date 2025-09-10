import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from '../../Button';
import { fn } from 'storybook/internal/test';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    children: 'Test Button',
    ariaLabel: 'Test Button'
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithClassnameProp: Story = {
  args: {
    className: 'bg-tertiary-dark text-primary-dark'
  }
};
