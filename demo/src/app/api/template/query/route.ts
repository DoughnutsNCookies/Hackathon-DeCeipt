/**
 * To call this API route: /api/template/query?query=example
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  return new Response(`Query Example: ${query}`);
}
