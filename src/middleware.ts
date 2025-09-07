import { type NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from './auth/session.edge';

const protectedCustomerRoutes = ['/account'];

const middlewareAuth = async (request: NextRequest) => {
  const pathArray = request.nextUrl.pathname.split('/');

  if (protectedCustomerRoutes.includes(`/${pathArray[1]}`)) {
    const user = await getSessionUser();

    const url = request.nextUrl.clone();
    if (!user || !user.id) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    } else if (+pathArray[2] !== user.id) {
      url.pathname = `/account/${user.id}`;
      return NextResponse.redirect(url);
    }
  }
};

const middleware = async (request: NextRequest) => {
  const response = (await middlewareAuth(request)) ?? NextResponse.next();
  return response;
};

// matcher is an alternative to conditional path logic
export const config = {
  matcher: ['/account/:path*']
};

export default middleware;
