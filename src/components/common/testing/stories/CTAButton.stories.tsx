import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CTAButton from '../../CTAButton';
import { ctaButtonMock } from '../__mocks__/linkMock';

const meta = {
  title: 'Components/CTAButton',
  component: CTAButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    linkData: {
      ...ctaButtonMock,
      link: {
        externalLink: null,
        internalLink: {
          ...ctaButtonMock.link!.internalLink!
        }
      }
    }
  }
} satisfies Meta<typeof CTAButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InternalLink: Story = {};

export const ExternalLink: Story = {
  args: {
    linkData: {
      ...ctaButtonMock,
      link: {
        externalLink: {
          ...ctaButtonMock.link!.externalLink!
        },
        internalLink: null
      }
    }
  }
};

export const IsDarkButton: Story = {
  args: {
    linkData: {
      ...ctaButtonMock,
      isDark: true
    }
  }
};
