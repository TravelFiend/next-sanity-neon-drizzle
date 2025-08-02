import MobileThirdLinks from '../MobileThirdLinks';
import { thirdLevelLinksMock } from '../mocks/mainHeaderMock';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Layout/MainHeader/MobileThirdLinks',
  component: MobileThirdLinks,
  globals: {
    viewport: { value: 'iphonese2', isRotated: false }
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    thirdLevelLinks: thirdLevelLinksMock,
    parentLink: 'Giblets',
    childSlug: 'printmaking',
    childText: 'Printmaking',
    isOpen: true
  }
} satisfies Meta<typeof MobileThirdLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
