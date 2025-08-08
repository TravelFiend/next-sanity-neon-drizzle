import { describe, it, expect } from 'bun:test';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import HeroSection from '../../HeroSection';
import { heroDataMock } from '../__mocks__/HeroSectionMock';

describe('HeroSection component', () => {
  it('Has no accessibility violations', async () => {
    const { container } = render(
      <HeroSection heroData={heroDataMock} index={0} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
