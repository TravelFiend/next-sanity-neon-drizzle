import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeroSection from '../../HeroSection';
import { heroDataMock } from '../__mocks__/HeroSectionMock';

const meta = {
  title: 'Blocks/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  args: {
    heroData: heroDataMock,
    index: 0
  }
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
