import { NextResponse } from 'next/server';

const middleware = request => {
  const path = request.nextUrl.pathname;
  if (path.startsWith('/admin') || path.startsWith('/dev-admin')) {
    //TODO: Write auth code and check for admin status
    return request.locals.isAdmin
      ? NextResponse.next()
      : NextResponse.redirect('/login');
  }
};

// matcher is an alternative to conditional path logic
// export const config = {
//   matcher: ['/admin/:path*', '/admin', '/dev-admin/:path*/', '/dev-admin']
// };

export default middleware;
