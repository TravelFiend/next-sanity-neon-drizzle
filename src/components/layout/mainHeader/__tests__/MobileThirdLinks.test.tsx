import { describe, it, expect, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import MobileThirdLinks from '../MobileThirdLinks';
import { thirdLevelLinksMock } from '../mocks/mainHeaderMock';

const defaultProps = {
  thirdLevelLinks: thirdLevelLinksMock,
  parentLink: 'art',
  childSlug: 'printmaking',
  childText: 'Printmaking',
  isOpen: true
};

afterEach(() => {
  cleanup();
});

describe('ThirdLevelLinks component', () => {
  it('Has no accessibility violations', async () => {
    const { container } = render(<MobileThirdLinks {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Should render a list item for each third level link + a browse all link', () => {
    render(<MobileThirdLinks {...defaultProps} />);
    const links = screen.getAllByRole('listitem');
    expect(links[0]).toHaveTextContent('BROWSE ALL');
    expect(links).toHaveLength(3);

    const lastLink = screen.getByText('Lithography');
    expect(lastLink).toBeInTheDocument();
  });

  it('Should be hidden if isOpen is set to false', () => {
    const { rerender } = render(<MobileThirdLinks {...defaultProps} />);
    let thirdLevelLinks = screen.getByTestId('thirdLinks');

    expect(thirdLevelLinks).toHaveAttribute('aria-hidden', 'false');
    expect(thirdLevelLinks).not.toHaveClass('hidden');
    expect(thirdLevelLinks).toHaveClass('flex');

    rerender(<MobileThirdLinks {...defaultProps} isOpen={false} />);

    thirdLevelLinks = screen.getByTestId('thirdLinks');
    expect(thirdLevelLinks).toHaveAttribute('aria-hidden', 'true');
    expect(thirdLevelLinks).not.toHaveClass('flex');
    expect(thirdLevelLinks).toHaveClass('hidden');
  });
});
