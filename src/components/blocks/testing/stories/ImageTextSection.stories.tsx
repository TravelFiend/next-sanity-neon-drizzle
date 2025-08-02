import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ImageTextSection from '../../ImageTextSection';
import { imageTextMock } from '../__mocks__/imageTextMock';

const meta = {
  title: 'Components/ImageTextSection',
  component: ImageTextSection,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  args: {
    imageTextData: imageTextMock
  },
  decorators: [
    Story => (
      <div className="flex h-96 w-full justify-center">
        <div className="w-5/6">
          <Story />
        </div>
      </div>
    )
  ]
} satisfies Meta<typeof ImageTextSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageToTheLeft: Story = {};

export const ImageToTheRight: Story = {
  args: {
    imageTextData: {
      ...imageTextMock,
      imageAlignment: 'right'
    }
  }
};

export const CenteredText: Story = {
  args: {
    imageTextData: {
      ...imageTextMock,
      text: {
        ...imageTextMock['text'],
        alignment: 'center'
      }
    }
  }
};

export const RightAlignedText: Story = {
  args: {
    imageTextData: {
      ...imageTextMock,
      text: {
        ...imageTextMock['text'],
        alignment: 'right'
      }
    }
  }
};
