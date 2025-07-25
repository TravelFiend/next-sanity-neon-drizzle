import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import MobileSecondLinks from '../MobileSecondLinks';
import { secondLevelLinksMock } from '../mocks/mainHeaderMock';
// import { resizeWindow } from '@/lib/utils/testingUtils';

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

  it('Calls setAreChildrenOpen(false) one time', async () => {
    render(<MobileSecondLinks {...getProps()} />);
    const backButton = screen.getByRole('button', { name: /← back/i });

    await user.click(backButton);
    expect(setAreChildrenOpenMock).toHaveBeenCalledTimes(1);
    expect(setAreChildrenOpenMock).toHaveBeenCalledWith(false);
  });

  it('Renders down arrow when there are 3rd level links and toggles when clicked', async () => {
    render(<MobileSecondLinks {...getProps()} />);
    const expandableButton = screen.getByRole('button', {
      name: /printmaking/i
    });
    expect(expandableButton).toHaveTextContent(/↓|&darr;/i);

    const thirdLevelLink = screen.queryByText('Lithography');
    const thirdLevelList = thirdLevelLink?.closest('ul');

    expect(thirdLevelList).not.toHaveClass('flex');
    expect(thirdLevelList).toHaveClass('hidden');

    await user.click(expandableButton);

    expect(thirdLevelList).not.toHaveClass('hidden');
    expect(thirdLevelList).toHaveClass('flex');

    await user.click(expandableButton);

    expect(thirdLevelList).not.toHaveClass('flex');
    expect(thirdLevelList).toHaveClass('hidden');
  });
  // it('Renders on smaller screens, hidden on larger screens', async () => {
  //   render(<MobileSecondLinks {...getProps()} />);
  //   const navList = screen.getByRole('list');
  //   await resizeWindow(1024);
  //   expect(navList).toHaveClass('hidden');
  //   await resizeWindow(375);
  //   expect(navList).toHaveClass('flex');
  // });

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

    const linkEl = screen.getByRole('link', {
      name: /printmaking/i
    });
    expect(linkEl).not.toHaveTextContent(/↓|&darr;/i);
  });

  it('Does not render links if no currentChildren', () => {
    render(<MobileSecondLinks {...getProps({ currentChildren: null })} />);
    const browseAll = screen.queryByRole('link', {
      name: /browse all/i
    });

    expect(browseAll).toBeNull();
  });

  it('Calls setIsOpen(false) when currentChildren becomes null', () => {
    const { rerender } = render(<MobileSecondLinks {...getProps()} />);
    expect(setIsOpenMock).toHaveBeenCalledWith(true);
    rerender(<MobileSecondLinks {...getProps({ currentChildren: null })} />);
    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });
});
