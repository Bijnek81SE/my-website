export function GET() {
  return new Response('User-agent: *\\nDisallow: /mobiltronic/\\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
