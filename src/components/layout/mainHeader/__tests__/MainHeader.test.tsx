import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import MainHeader from '../MainHeader';
import { mainHeaderMock } from '../mocks/mainHeaderMock';
import { resizeWindow } from '@/lib/utils/testingUtils';

describe('MainHeader component', () => {
  it('Has no accessibility violations', async () => {
    const { container } = render(<MainHeader navData={mainHeaderMock} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Renders the logo if provided', () => {
    const { container } = render(<MainHeader navData={mainHeaderMock} />);
    const logo = container.querySelector('a[href="/"] div');
    expect(logo).toBeInTheDocument();
    expect(logo?.innerHTML).toContain('<svg');
  });

  it('Handles missing logo gracefully', () => {
    const { container } = render(
      <MainHeader navData={{ ...mainHeaderMock!, companyLogo: null }} />
    );
    const logo = container.querySelector('a[href="/"] div');
    expect(logo).toBeNull();
  });

  it('Renders desktop version on larger screens, and mobile version on smaller screens', () => {
    const { container } = render(<MainHeader navData={mainHeaderMock} />);

    const burger = container.querySelector(
      '[aria-label="Open navigation menu"]'
    );
    expect(burger?.className).toContain('hidden');

    const navList = container.querySelector('nav ul');
    expect(navList?.className).toContain('flex-row');

    resizeWindow(375);

    expect(burger).toBeVisible();
    expect(navList?.className).toContain('flex-col');
  });
});
