import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "@/app/api/wallet/wallet.json";

export async function GET() {
  if (wallet.length === 0) {
    return new Response(
      JSON.stringify({
        error: "Please create a wallet first.",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
  const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

  const connection = new Connection("https://api.devnet.solana.com");
  const txhash = await (async () => {
    try {
      return await connection.requestAirdrop(
        keypair.publicKey,
        2 * LAMPORTS_PER_SOL,
      );
    } catch (e: any) {
      console.error(`Oops, something went wrong: ${e}`);
      return new Error(e);
    }
  })();

  if (txhash instanceof Error) {
    return new Response(
      JSON.stringify({
        error: txhash.message,
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  return new Response(
    JSON.stringify({
      txhash: txhash,
      link: `https://explorer.solana.com/tx/${txhash}?cluster=devnet`,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
