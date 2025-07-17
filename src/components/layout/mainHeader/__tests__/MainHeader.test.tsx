import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import MainHeader from '../MainHeader';
import mainHeaderMock from '../mocks/mainHeaderMock';

const resizeWindow = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

describe('MainHeader', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<MainHeader navData={mainHeaderMock} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders the logo if provided', () => {
    const { container } = render(<MainHeader navData={mainHeaderMock} />);
    const logo = container.querySelector('a[href="/"] div');
    expect(logo).toBeInTheDocument();
    expect(logo?.innerHTML).toContain('<svg');
  });

  it('handles missing logo gracefully', () => {
    const { container } = render(
      <MainHeader navData={{ ...mainHeaderMock, companyLogo: undefined }} />
    );
    const logo = container.querySelector('a[href="/"] div');
    expect(logo).toBeNull();
  });

  // test('renders main links on larger screens', () => {
  //   render(<MainHeader navData={mainHeaderMock} />);

  //   const mainLinks = screen.getAllByText('Art');
  //   expect(mainLinks).toBeVisible();
  // });

  test('renders mobile version on small screens', () => {
    resizeWindow(375);
    const { container } = render(<MainHeader navData={mainHeaderMock} />);

    const burger = container.querySelector(
      '[aria-label="Company logo: Link to home page"]'
    );
    expect(burger).toBeVisible();
  });
});
