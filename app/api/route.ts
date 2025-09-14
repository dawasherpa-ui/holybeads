import { NextResponse } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json(
      { error: 'Missing required query parameter: url' },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  try {
    const response = await fetch(targetUrl, { method: 'GET' });

    const resHeaders = new Headers(response.headers);
    Object.entries(CORS_HEADERS).forEach(([k, v]) => resHeaders.set(k, v as string));
    resHeaders.delete('content-encoding');

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: resHeaders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Fetch failed' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}