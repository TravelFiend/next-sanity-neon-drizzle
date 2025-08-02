import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import CTAButton from '../../CTAButton';
import { externalLinkMock, internalLinkMock } from '../__mocks__/linkMock';
import { CTAButtonRes } from '@/sanity/types/derivedTypes';

describe('CTAButton component', () => {
  it('Has no accessibility violations', async () => {
    const linkDataMock: CTAButtonRes = {
      _type: 'ctaButton',
      isDark: false,
      link: {
        internalLink: internalLinkMock,
        externalLink: null
      }
    };

    const { container } = render(<CTAButton linkData={linkDataMock} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Links to relative path if internal link', () => {
    const linkDataMock: CTAButtonRes = {
      _type: 'ctaButton',
      isDark: false,
      link: {
        internalLink: internalLinkMock,
        externalLink: null
      }
    };

    render(<CTAButton linkData={linkDataMock} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/music');
  });

  it('Links to complete URL if external URL', () => {
    const linkDataMock: CTAButtonRes = {
      _type: 'ctaButton',
      isDark: false,
      link: {
        internalLink: null,
        externalLink: externalLinkMock
      }
    };

    render(<CTAButton linkData={linkDataMock} />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://www.memedroid.com/'
    );
  });

  it('Renders correct styling based on isDark field', () => {
    const lightLinkMock: CTAButtonRes = {
      _type: 'ctaButton',
      isDark: false,
      link: {
        internalLink: null,
        externalLink: externalLinkMock
      }
    };

    const { rerender } = render(<CTAButton linkData={lightLinkMock} />);
    let theButton = screen.getByRole('link');
    expect(theButton).toHaveClass('border-primary bg-white text-primary');
    expect(theButton).not.toHaveClass('border-white bg-primary text-white');

    const darkLinkMock: CTAButtonRes = {
      ...lightLinkMock,
      isDark: true
    };

    rerender(<CTAButton linkData={darkLinkMock} />);
    theButton = screen.getByRole('link');
    expect(theButton).toHaveClass('border-white bg-primary text-white');
    expect(theButton).not.toHaveClass('border-primary bg-white text-primary');
  });
});
