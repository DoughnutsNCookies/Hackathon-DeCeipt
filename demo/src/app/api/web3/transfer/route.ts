import { NextRequest } from "next/server";
import {
  Transaction,
  SystemProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import wallet from "@/app/api/wallet/wallet.json";

export async function POST(req: NextRequest) {
  const { dest } = await req.json();
  if (!dest) {
    return new Response(
      JSON.stringify({
        error: "Please provide a destination address.",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const from = Keypair.fromSecretKey(new Uint8Array(wallet));
  const to = new PublicKey(dest);
  const connection = new Connection("https://api.devnet.solana.com");

  const signature = await (async () => {
    try {
      const balance = await connection.getBalance(from.publicKey);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to,
          lamports: balance,
        }),
      );
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash("confirmed")
      ).blockhash;
      transaction.feePayer = from.publicKey;

      const fee =
        (
          await connection.getFeeForMessage(
            transaction.compileMessage(),
            "confirmed",
          )
        ).value || 0;
      transaction.instructions.pop();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to,
          lamports: balance - fee,
        }),
      );
      return await sendAndConfirmTransaction(connection, transaction, [from]);
    } catch (e) {
      console.error(`Oops, something went wrong: ${e}`);
      return new Error(e);
    }
  })();

  if (signature instanceof Error) {
    return new Response(
      JSON.stringify({
        error: signature.message,
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
      signature: signature,
      link: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
