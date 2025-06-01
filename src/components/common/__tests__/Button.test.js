import { render } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('should render a clickable button', async () => {
    const { queryByText } = render(<Button label="Click Me" />);
    expect(queryByText('Click Me')).toBeTruthy();
  });
});
