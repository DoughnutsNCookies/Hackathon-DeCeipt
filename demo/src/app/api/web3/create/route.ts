import { Keypair } from "@solana/web3.js";
import * as fs from "fs";

export async function POST() {
  let kp = Keypair.generate();

  let secretKeyPath = "src/app/api/wallet/wallet.json";
  fs.writeFileSync(secretKeyPath, "[" + kp.secretKey.toString() + "]");

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
