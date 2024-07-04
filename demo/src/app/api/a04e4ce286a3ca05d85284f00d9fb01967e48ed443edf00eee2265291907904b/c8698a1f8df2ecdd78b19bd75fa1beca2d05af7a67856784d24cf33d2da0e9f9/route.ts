import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const file = await fetch("https://deceipt.aideyekit.com/receipt.jpg");
  const image = await file.blob();

  return new Response(image, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
}
