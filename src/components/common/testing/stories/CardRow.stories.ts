import CardRow from '../../CardRow';
// import { footerMock } from '@/components/layout/testing/__mocks__/footerMock';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Components/CardRow',
  component: CardRow,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  args: {
    cards: [
      {
        _key: '123',
        _type: 'richImage',
        imageAsset: {
          _type: 'cloudinary.asset',
          _key: null,
          _version: null,
          public_id: 'dz03hfmuq',
          resource_type: 'img',
          secure_url: null,
          width: 50,
          height: 50,
          duration: null,
          tags: []
        },
        altText: 'Alt text'
      }
    ]
  }
} satisfies Meta<typeof CardRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
