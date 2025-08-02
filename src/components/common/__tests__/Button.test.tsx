import { describe, it, expect, mock } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Button from '../Button';
import user from '@testing-library/user-event';

describe('Button', () => {
  it('Has no accessibility vilations', async () => {
    const { container } = render(
      <Button label="Click Me" onClick={() => {}} ariaLabel="Click Me" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Renders a clickable button and fires onClick when clicked', async () => {
    const handleClickMock = mock(() => {});
    render(
      <Button label="Click Me" onClick={handleClickMock} ariaLabel="Click Me" />
    );

    const theButton = screen.getByRole('button', { name: /click/i });
    expect(theButton).toBeInTheDocument();

    await user.click(theButton);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it('Adds classNames that are passed as prop', () => {
    render(
      <Button
        label="Click Me"
        onClick={() => {}}
        ariaLabel="Click Me"
        className="text-green-600"
      />
    );
    expect(screen.getByRole('button')).toHaveClass('text-green-600');
  });
});
