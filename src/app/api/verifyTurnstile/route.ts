import type { TurnstileServerValidationResponse } from '@marsidev/react-turnstile';

const secret =
  process.env.NODE_ENV === 'production'
    ? process.env.TURNSTILE_SECRET_KEY
    : process.env.NEXT_PUBLIC_TURNSTILE_TEST_SECRET_KEY_PASS;

export async function POST(request: Request) {
  if (!secret) {
    throw new Error('TURNSTILE_SECRET_KEY is not set in environment variables');
  }

  const { token } = (await request.json()) as { token: string };

  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const data = (await res.json()) as TurnstileServerValidationResponse;

    return new Response(JSON.stringify(data), {
      status: data.success ? 200 : 400,
      headers: {
        'content-type': 'application/json'
      }
    });
  } catch (err) {
    console.error(`There was an issue verifying your cloudflare token: ${err}`);
  }
}
