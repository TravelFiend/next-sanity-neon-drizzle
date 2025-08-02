import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CTAButton from '../../CTAButton';
import { externalLinkMock, internalLinkMock } from '../__mocks__/linkMock';

const meta = {
  title: 'Components/CTAButton',
  component: CTAButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    linkData: {
      _type: 'ctaButton',
      isDark: false,
      link: {
        externalLink: null,
        internalLink: internalLinkMock
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
      _type: 'ctaButton',
      isDark: false,
      link: {
        externalLink: externalLinkMock,
        internalLink: null
      }
    }
  }
};

export const IsDarkButton: Story = {
  args: {
    linkData: {
      _type: 'ctaButton',
      isDark: true,
      link: {
        externalLink: externalLinkMock,
        internalLink: null
      }
    }
  }
};
