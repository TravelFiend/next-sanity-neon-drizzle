import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import CardRow from '../../CardRow';
import { cardsMock } from '../__mocks__/carouselMock';
import { axe } from 'jest-axe';

describe('CardRow component', () => {
  it('Has no accessiblity violations', async () => {
    const { container } = render(<CardRow cards={cardsMock} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Renders each image with 1/3width when there are 3 images', () => {
    render(<CardRow cards={cardsMock.slice(0, 3)} />);
    const cards = screen.getAllByRole('img');
    expect(cards).toHaveLength(3);

    for (const card of cards) {
      const wrapperDiv = card.closest('div');
      expect(wrapperDiv).toHaveClass('flex-[0_0_32%]');
      expect(wrapperDiv).not.toHaveClass('flex-[0_0_23%]');
    }
  });

  it('Renders each image with 1/4 width when there are 4 images', () => {
    render(<CardRow cards={cardsMock} />);
    const cards = screen.getAllByRole('img');
    expect(cards).toHaveLength(4);

    for (const card of cards) {
      const wrapperDiv = card.closest('div');
      expect(wrapperDiv).toHaveClass('flex-[0_0_23%]');
      expect(wrapperDiv).not.toHaveClass('flex-[0_0_32%]');
    }
    screen.debug();
  });
});
