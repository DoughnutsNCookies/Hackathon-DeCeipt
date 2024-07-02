/**
 * To call this API route: /api/template/example
 *
 * req parameter is required
 */
export async function GET(
  req: Request,
  { params }: { params: { path: string } },
) {
  const { path } = params;
  return new Response(`URL Dynamic Path Example: ${path}`);
}
