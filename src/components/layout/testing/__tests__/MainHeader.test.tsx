// import { describe, it, expect } from 'bun:test';
// import { render } from '@testing-library/react';
// import { axe } from 'jest-axe';
// import MainHeader from '../../mainHeader/MainHeader';
// import { mainHeaderMock } from '@/components/layout/testing/__mocks__/mainHeaderMock';

// /* TODO: write tests for this component in cypress/playwright.  Jest (and therefore Bun) do not yet
//   support testing of async Server Components, which this is because of the user server action call*/

// describe('MainHeader component', () => {
//   it('Has no accessibility violations', async () => {
//     const { container } = render(<MainHeader navData={mainHeaderMock} />);
//     const results = await axe(container);
//     expect(results).toHaveNoViolations();
//   });

//   it('Renders the logo if provided', () => {
//     const { container } = render(<MainHeader navData={mainHeaderMock} />);
//     const logo = container.querySelector('a[href="/"] div');
//     expect(logo).toBeInTheDocument();
//     expect(logo?.innerHTML).toContain('<svg');
//   });

//     it('Handles missing logo gracefully', () => {
//       const { container } = render(
//         <MainHeader navData={{ ...mainHeaderMock, companyLogo: null }} />
//       );
//       const logo = container.querySelector('a[href="/"] div');
//       expect(logo).toBeNull();
//     });
// });
