import { render } from '@testing-library/react';
import SubmitButton from '../SubmitButton';

describe('SubmitButton', () => {
  it('should render a clickable button', async () => {
    const { queryByText } = render(<SubmitButton label="Click Me" />);
    expect(queryByText('Click Me')).toBeTruthy();
  });
});
