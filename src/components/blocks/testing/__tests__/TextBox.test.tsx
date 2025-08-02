import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import TextBox from '../../TextBox';

describe('TextBox component', () => {
  it('Has no accessibility violations', async () => {
    const { container } = render(<TextBox />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Renders title, subtitle, and body when all are provided', () => {
    render(<TextBox title="Title" subtitle="Subtitle" body="Body" />);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('paragraph')).toBeInTheDocument();
  });

  it("Doesn't render title if not provided", () => {
    render(<TextBox subtitle="Subtitle" body="Body" />);

    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('paragraph')).toBeInTheDocument();
  });

  it("Doesn't render subtitle if not provided", () => {
    render(<TextBox title="Subtitle" body="Body" />);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3 })).toBeNull();
    expect(screen.getByRole('paragraph')).toBeInTheDocument();
  });

  it("Doesn't render body if not provided", () => {
    render(<TextBox title="title" subtitle="Subtitle" />);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.queryByRole('paragraph')).toBeNull();
  });

  it('Sets the correct text-align based on Sanity selection', () => {
    const { rerender } = render(<TextBox alignment="left" title="Title" />);

    screen.logTestingPlaygroundURL();

    let textBoxDiv = screen.getByRole('heading', { level: 2 }).closest('div');
    expect(textBoxDiv).toHaveClass('text-left');
    expect(textBoxDiv).not.toHaveClass('text-center');
    expect(textBoxDiv).not.toHaveClass('text-right');

    rerender(<TextBox alignment="center" title="Title" />);
    textBoxDiv = screen.getByRole('heading', { level: 2 }).closest('div');
    expect(textBoxDiv).not.toHaveClass('text-left');
    expect(textBoxDiv).toHaveClass('text-center');
    expect(textBoxDiv).not.toHaveClass('text-right');

    rerender(<TextBox alignment="right" title="Title" />);
    textBoxDiv = screen.getByRole('heading', { level: 2 }).closest('div');
    expect(textBoxDiv).not.toHaveClass('text-left');
    expect(textBoxDiv).not.toHaveClass('text-center');
    expect(textBoxDiv).toHaveClass('text-right');
  });
});
