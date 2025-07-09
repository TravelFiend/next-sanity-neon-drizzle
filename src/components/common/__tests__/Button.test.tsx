import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from '../Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('should render a clickable button', async () => {
    const { queryByText } = render(
      <Button label="Click Me" onClick={() => {}} ariaLabel="Click Me" />
    );
    expect(queryByText('Click Me')).toBeTruthy();
  });

  it('should have no accessibility vilations', async () => {
    const { container } = render(
      <Button label="Click Me" onClick={() => {}} ariaLabel="Click Me" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
