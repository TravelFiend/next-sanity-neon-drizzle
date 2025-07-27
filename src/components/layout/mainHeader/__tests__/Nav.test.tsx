import { describe, it, expect } from 'bun:test';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Nav from '../Nav';
import { mainHeaderMock } from '../mocks/mainHeaderMock';

describe('Nav component', () => {
  it('Has no accessibility violations', async () => {
    const { container } = render(<Nav linkData={mainHeaderMock!['navTabs']} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // it('')
});
