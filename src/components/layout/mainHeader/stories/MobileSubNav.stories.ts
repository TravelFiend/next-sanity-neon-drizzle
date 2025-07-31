import { fn } from 'storybook/test';
import MobileSubNav from '../MobileSubNav';
import { secondLevelLinksMock } from '../mocks/mainHeaderMock';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Layout/MainHeader/MobileSubNav',
  component: MobileSubNav,
  globals: {
    viewport: { value: 'iphonese2', isRotated: false }
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    isOpen: true,
    setIsOpen: fn(),
    setAreChildrenOpen: fn(),
    parentLink: 'Giblets',
    currentChildren: secondLevelLinksMock
  },
  argTypes: {
    setIsOpen: { action: 'setIsOpen clicked' },
    setAreChildrenOpen: { action: 'setAreChildrenOpen clicked' }
  }
} satisfies Meta<typeof MobileSubNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Closed = {
  args: {
    isOpen: false
  }
};

export const NoThirdLevelLinks = {
  args: {
    currentChildren: [
      {
        ...secondLevelLinksMock![0],
        thirdLevelLinks: null
      }
    ]
  }
};
