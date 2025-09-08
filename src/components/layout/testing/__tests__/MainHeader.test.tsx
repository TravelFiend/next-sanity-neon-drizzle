import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import MainHeader from '../../mainHeader/MainHeader';
import { mainHeaderMock } from '@/components/layout/testing/__mocks__/mainHeaderMock';
import { mock } from 'bun:test';

mock.module('@/auth/session.server', () => {
  return {
    getCurrentUser: async () => null
  };
});

describe('MainHeader component', () => {
  it('Has no accessibility violations', async () => {
    const { container } = render(<MainHeader navData={mainHeaderMock} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Renders the logo if provided', async () => {
    render(<MainHeader navData={mainHeaderMock} />);
    const logo = await screen.findByRole('link', {
      name: /company logo: link to home page/i
    });

    screen.debug();
    expect(logo).toBeInTheDocument();
    expect(logo?.innerHTML).toContain('<svg');
  });

  it('Handles missing logo gracefully', () => {
    const { container } = render(
      <MainHeader navData={{ ...mainHeaderMock, companyLogo: null }} />
    );
    const logo = container.querySelector('a[href="/"] div');
    expect(logo).toBeNull();
  });
});
