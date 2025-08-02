import CardRow from '../../CardRow';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { cardsMock } from '../__mocks__/carouselMock';

const meta = {
  title: 'Components/CardRow',
  component: CardRow,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  args: {
    cards: cardsMock
  },
  decorators: [
    Story => (
      <div style={{ height: '400px', width: '100%' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof CardRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FourImages: Story = {};

export const ThreeImages: Story = {
  args: {
    cards: cardsMock.slice(0, 3)
  }
};
