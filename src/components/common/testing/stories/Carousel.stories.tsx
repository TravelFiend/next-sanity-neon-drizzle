import Carousel from '../../Carousel';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { cardsMock } from '../__mocks__/carouselMock';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  args: {
    cards: cardsMock
  },
  decorators: [
    Story => (
      <div className="flex h-80 w-screen">
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
