import { render, fireEvent, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { mock } from 'bun:test';
import MobileSecondLinks from '../MobileSecondLinks';
import { secondLevelLinksMock } from '../mocks/mainHeaderMock';
import { resizeWindow } from '@/lib/utils/testingUtils';

let setIsOpenMock: ReturnType<typeof mock>;
let setAreChildrenOpenMock: ReturnType<typeof mock>;

// Reusable helper to generate props with optional overrides
const getProps = (
  overrides: Partial<Parameters<typeof MobileSecondLinks>[0]> = {}
): Parameters<typeof MobileSecondLinks>[0] => ({
  isOpen: true,
  setIsOpen: setIsOpenMock,
  setAreChildrenOpen: setAreChildrenOpenMock,
  parentLink: 'Art',
  currentChildren: secondLevelLinksMock,
  ...overrides
});

beforeEach(() => {
  setIsOpenMock = mock(() => {});
  setAreChildrenOpenMock = mock(() => {});
});

afterEach(() => {
  setIsOpenMock.mockReset();
  setAreChildrenOpenMock.mockReset();
});

describe('MobileSecondLinks component', () => {
  it('Has no accessibility violations', async () => {
    const { container } = render(<MobileSecondLinks {...getProps()} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Calls setAreChildrenOpen(false) and hides on Back click', () => {
    render(<MobileSecondLinks {...getProps()} />);

    const backButton = screen.getByRole('button', { name: /← back/i });
    fireEvent.click(backButton);

    expect(setAreChildrenOpenMock).toHaveBeenCalledTimes(1);
    expect(setAreChildrenOpenMock).toHaveBeenCalledWith(false);

    const expandableButton = screen.getByRole('button', {
      name: /Printmaking/i
    });
    fireEvent.click(expandableButton);

    const expandedList = screen
      .getByText(/BROWSE ALL PRINTMAKING/i)
      .closest('ul');
    expect(expandedList).toHaveClass('flex');

    fireEvent.click(backButton);

    expect(expandedList).toHaveClass('hidden');
  });

  it('Renders on smaller screens, hidden on larger screens', () => {
    const { container } = render(<MobileSecondLinks {...getProps()} />);
    const navList = container.querySelector('ul');
    expect(navList?.className).toContain('hidden');
    resizeWindow(375);
    expect(navList?.className).toContain('flex');
  });

  it('Renders down arrow when there are 3rd level links and expands when clicked', () => {
    render(<MobileSecondLinks {...getProps()} />);
    const expandableButton = screen.getByRole('button', {
      name: /Printmaking/i
    });
    expect(expandableButton).toHaveTextContent(/↓|&darr;/i);

    const thirdLevelLink = screen.queryByText('Lithography');

    expect(thirdLevelLink?.closest('ul')).not.toHaveClass('flex');
    expect(thirdLevelLink?.closest('ul')).toHaveClass('hidden');

    fireEvent.click(expandableButton);

    expect(thirdLevelLink?.closest('ul')).not.toHaveClass('hidden');
    expect(thirdLevelLink?.closest('ul')).toHaveClass('flex');
  });

  it('Does not render down arrow when there are no 3rd level links', () => {
    render(
      <MobileSecondLinks
        {...getProps({
          currentChildren: [
            {
              ...secondLevelLinksMock![0],
              thirdLevelLinks: null
            }
          ]
        })}
      />
    );

    const linkEl = screen.getByText('Printmaking');
    expect(linkEl).not.toHaveTextContent(/↓|&darr;/i);
  });

  it('Does not render links if no currentChildren', () => {
    render(<MobileSecondLinks {...getProps({ currentChildren: null })} />);
    const browseAll = screen.queryByText(/browse all/i);
    expect(browseAll).toBeNull();
  });

  it('Calls setIsOpen(false) when currentChildren becomes null', () => {
    const { rerender } = render(<MobileSecondLinks {...getProps()} />);

    rerender(<MobileSecondLinks {...getProps({ currentChildren: null })} />);

    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });
});
