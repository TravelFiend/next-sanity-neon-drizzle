import { describe, it, expect } from 'bun:test';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import ImageTextSection from '../../ImageTextSection';
import { imageTextMock } from '../__mocks__/imageTextMock';
import { ImageTextBlockRes } from '@/sanity/types/derivedTypes';

describe('ImageTextSection component', () => {
  it('Has no accessibility violations', async () => {
    const { container } = render(
      <ImageTextSection imageTextData={imageTextMock} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Sets correct flex direction based on imageAlignment property', () => {
    const { container, rerender } = render(
      <ImageTextSection imageTextData={imageTextMock} />
    );

    let entireSection = container.querySelector('section');
    expect(entireSection).toHaveClass('flex-row');
    expect(entireSection).not.toHaveClass('flex-row-reverse');

    const imageOnRightMock: ImageTextBlockRes = {
      ...imageTextMock,
      imageAlignment: 'right'
    };

    rerender(<ImageTextSection imageTextData={imageOnRightMock} />);
    entireSection = container.querySelector('section');
    expect(entireSection).toHaveClass('flex-row-reverse');
    expect(entireSection).not.toHaveClass('flex-row');
  });
});
