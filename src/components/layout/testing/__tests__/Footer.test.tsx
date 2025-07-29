import { describe, it, expect } from 'bun:test';
import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import Footer from '../../Footer';
import { footerMock } from '@/components/layout/testing/__mocks__/footerMock';

describe('Footer component', () => {
  it('Has no accessibility violations', async () => {
    const { container } = render(<Footer footerData={footerMock} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Handles no siteLinks gracefully', () => {
    const noSiteLinks = {
      ...footerMock,
      siteLinks: null
    };

    render(<Footer footerData={noSiteLinks} />);

    const siteLink = screen.queryByRole('link', { name: /about us/i });
    const legalLink = screen.getByRole('link', { name: /privacy policy/i });

    expect(siteLink).toBeNull();
    expect(legalLink).toBeInTheDocument();
  });

  it('Handles no legalLinks gracefully', () => {
    const noLegalLinks = {
      ...footerMock,
      legalLinks: null
    };

    render(<Footer footerData={noLegalLinks} />);

    const legalLink = screen.queryByRole('link', { name: /privacy policy/i });
    const siteLink = screen.getByRole('link', { name: /about us/i });

    expect(legalLink).toBeNull();
    expect(siteLink).toBeInTheDocument();
  });

  it('Shows socialLinks is present', async () => {
    const { rerender } = render(<Footer footerData={footerMock} />);

    let socialLink: HTMLElement | null = screen.getByLabelText(/instagram/i);
    expect(socialLink).toBeInTheDocument();
    expect(socialLink.innerHTML).toContain('<svg');

    const noSocialLinks = {
      ...footerMock,
      socialLinks: null
    };

    rerender(<Footer footerData={noSocialLinks} />);

    await waitFor(() => {
      socialLink = screen.queryByLabelText(/instagram/i);
      expect(socialLink).toBeNull();
    });
  });
});
