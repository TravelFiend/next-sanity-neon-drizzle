import Nav from '../Nav';
import { mainHeaderMock } from '../mocks/mainHeaderMock';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Layout/MainHeader/Nav',
  component: Nav,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  args: {
    linkData: mainHeaderMock!['navTabs']
  }
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};

export const Mobile: Story = {
  globals: {
    viewport: { value: 'iphonese2', isRotated: false }
  }
};
