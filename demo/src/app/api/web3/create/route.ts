import { Keypair } from "@solana/web3.js";

export async function POST() {
  let kp = Keypair.generate();

  return new Response(
    JSON.stringify({
      publicKey: kp.publicKey.toBase58(),
      secretKey: kp.secretKey,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
