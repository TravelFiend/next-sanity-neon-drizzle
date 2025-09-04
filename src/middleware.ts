// import { type NextRequest, NextResponse } from 'next/server';
// import { getCurrentUser } from './auth/session';

// const loggedInUserRoute = ['/account'];

// const middlewareAuth = async (request: NextRequest) => {
//   if (loggedInUserRoute.includes(request.nextUrl.pathname)) {
//     const user = await getCurrentUser({ withFullUser: true, redirectIfNotFound: true })
//   }
// };

// // matcher is an alternative to conditional path logic
// // export const config = {
// //   matcher: ['/admin/:path*', '/admin', '/dev-admin/:path*/', '/dev-admin']
// // };

// export default middleware;
