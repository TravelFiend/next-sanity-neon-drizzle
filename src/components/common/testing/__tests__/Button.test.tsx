import { describe, it, expect, mock } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Button from '../../Button';
import user from '@testing-library/user-event';

describe('Button', () => {
  it('Has no accessibility vilations', async () => {
    const { container } = render(
      <Button onClick={() => {}} ariaLabel="Click Me">
        Click Me
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Should render a clickable button and fire onClick when clicked', async () => {
    const handleClickMock = mock(() => {});
    render(
      <Button onClick={handleClickMock} ariaLabel="Click Me">
        Click Me
      </Button>
    );

    const theButton = screen.getByRole('button');
    expect(theButton).toBeInTheDocument();

    await user.click(theButton);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it('Should render with classname passed as prop', () => {
    render(
      <Button
        onClick={() => {}}
        ariaLabel="Click Me"
        className="text-green-500"
      >
        Click Me
      </Button>
    );

    expect(screen.getByRole('button')).toHaveClass('text-green-500');
  });
});
