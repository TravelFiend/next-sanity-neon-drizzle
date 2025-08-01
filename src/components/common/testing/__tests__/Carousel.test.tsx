import { describe, it, expect, mock, beforeEach } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Carousel from '../../Carousel';
import { cardsMock } from '../__mocks__/carouselMock';
import user from '@testing-library/user-event';

const mockEmblaApi = {
  scrollPrev: () => {},
  scrollNext: () => {},
  reInit: () => {}
};

// Mock useEmblaCarousel hook
const mockUseEmblaCarousel = mock(() => [null, mockEmblaApi]);

mock.module('embla-carousel-react', () => ({
  default: mockUseEmblaCarousel
}));

beforeEach(() => {
  mockEmblaApi.scrollPrev = mock(() => {});
  mockEmblaApi.scrollNext = mock(() => {});
});

describe('Carousel component', () => {
  it('Has no accessibility violations', async () => {
    const { container } = render(<Carousel cards={cardsMock} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Calls scrollPrev when the previous button is clicked', async () => {
    render(<Carousel cards={cardsMock} />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    await user.click(prevButton);
    expect(mockEmblaApi.scrollPrev).toHaveBeenCalledTimes(1);
  });

  it('calls scrollNext when the next button is clicked', async () => {
    render(<Carousel cards={cardsMock} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    expect(mockEmblaApi.scrollNext).toHaveBeenCalledTimes(1);
  });

  it("Doesn't render slider buttons with < 5 cards", () => {
    render(<Carousel cards={cardsMock.slice(0, 4)} />);

    const prevButton = screen.queryByRole('button', { name: 'Previous slide' });
    const nextButton = screen.queryByRole('button', { name: 'Next slide' });

    expect(prevButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });
});
