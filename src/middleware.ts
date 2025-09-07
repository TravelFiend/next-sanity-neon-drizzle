import { type NextRequest, NextResponse } from 'next/server';
import { getSessionUser, getSessionUserById } from './auth/session.edge';
import { redis } from './redis/redis';

const COOKIE_SESSION_KEY = 'session-id';
const SESSION_EXPIRATION = 60 * 60 * 24 * 7;

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

  const sessionId = request.cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId) {
    const user = await getSessionUserById(sessionId);

    if (user) {
      await redis.set(`session:${sessionId}`, user, { ex: SESSION_EXPIRATION });

      response.cookies.set(COOKIE_SESSION_KEY, sessionId, {
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
        expires: Date.now() + SESSION_EXPIRATION * 1000,
        path: '/'
      });
    }
  }

  return response;
};

// matcher is an alternative to conditional path logic
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};

export default middleware;
