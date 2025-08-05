import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TextBox from '../../TextBox';

const meta = {
  title: 'Components/TextBox',
  component: TextBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    body: 'A bunch of words for the body',
    alignment: 'left'
  }
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CenterAlign: Story = {
  args: {
    alignment: 'center'
  }
};

export const RightAlign: Story = {
  args: {
    alignment: 'right'
  }
};

export const NoTitle: Story = {
  args: {
    title: null
  }
};

export const NoSubtitle: Story = {
  args: {
    subtitle: null
  }
};

export const NoBody: Story = {
  args: {
    body: null
  }
};

export const TitleOnly: Story = {
  args: {
    subtitle: null,
    body: null
  }
};

export const SubtitleOnly: Story = {
  args: {
    title: null,
    body: null
  }
};
export const BodyOnly: Story = {
  args: {
    title: null,
    subtitle: null
  }
};
