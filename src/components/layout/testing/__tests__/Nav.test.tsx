import { describe, it, expect } from 'bun:test';
import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import user from '@testing-library/user-event';
import Nav from '../../mainHeader/Nav';
import { mainHeaderMock } from '@mocks/layout/mainHeaderMock';
import { resizeWindow } from '@/lib/utils/testingUtils';
import { setupPathnameMock } from '@mocks/next/mockNextNav';

const navTabs = mainHeaderMock!['navTabs'];

describe('Nav component', () => {
  it('Has no accessibility violations', async () => {
    const { container } = render(<Nav linkData={navTabs} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('closes open menus when pathname changes', async () => {
    const { setPathname } = await setupPathnameMock();

    const { rerender } = render(<Nav linkData={navTabs} />);

    const burger = screen.getByLabelText('Open navigation menu');
    await user.click(burger);

    const navList = screen.getAllByRole('list');
    expect(navList[0]).toHaveClass('-translate-x-0');

    setPathname('/art');
    rerender(<Nav linkData={navTabs} />);

    await waitFor(() => {
      expect(navList[0]).toHaveClass('translate-x-full');
    });
  });

  it('Toggle main links on burger click', async () => {
    render(<Nav linkData={navTabs} />);

    const burger = screen.getByLabelText('Open navigation menu');
    const navList = screen.getAllByRole('list');

    expect(navList[0]).toHaveClass('translate-x-full');
    expect(navList[1]).toHaveClass('translate-x-full');

    await user.click(burger);

    expect(navList[0]).toHaveClass('-translate-x-0');
    expect(navList[1]).toHaveClass('translate-x-full');

    const mainLinkButton = screen.getByRole('button', { name: /music/i });
    await user.click(mainLinkButton);

    expect(
      screen.queryAllByRole('link', {
        name: 'Electronic'
      })
    ).toHaveLength(2);

    await user.click(burger);

    expect(navList[0]).toHaveClass('translate-x-full');
    expect(navList[1]).toHaveClass('translate-x-full');
  });

  it('triggers handleMainLinkClick correctly on button click', async () => {
    resizeWindow(375);
    render(<Nav linkData={navTabs} />);

    expect(
      screen.queryAllByRole('link', {
        name: 'Electronic'
      })
    ).toHaveLength(0);

    let mainLinkButton = screen.getByRole('button', { name: /music/i });
    await user.click(mainLinkButton);

    // 1 for mobile and 1 for desktop
    expect(
      screen.queryAllByRole('link', {
        name: 'Electronic'
      })
    ).toHaveLength(2);

    mainLinkButton = screen.getByRole('button', { name: /art/i });
    await user.click(mainLinkButton);

    expect(
      screen.queryAllByRole('link', {
        name: 'Electronic'
      })
    ).toHaveLength(0);
  });

  it("Doesn't render if no linkData passed", () => {
    render(<Nav linkData={null} />);
    expect(screen.queryByRole('navigation')).toBeNull();
  });
});
