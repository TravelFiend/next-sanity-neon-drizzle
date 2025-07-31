import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MainHeader from '../MainHeader';
import mainHeaderMock from '../mocks/mainHeaderMock';

const meta = {
  title: 'UI/MainHeader',
  component: MainHeader,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  args: {
    navData: mainHeaderMock
  }
} satisfies Meta<typeof MainHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoLogo: Story = {
  args: {
    navData: {
      ...mainHeaderMock!,
      companyLogo: null
    }
  }
};

export const NoLinks: Story = {
  args: {
    navData: {
      ...mainHeaderMock!,
      navTabs: []
    }
  }
};
