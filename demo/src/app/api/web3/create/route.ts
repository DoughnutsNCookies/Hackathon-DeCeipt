import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import * as fs from "fs";

export async function POST() {
  let kp = Keypair.generate();

  let secretKeyPath = "src/app/api/wallet/wallet.json";
  fs.writeFileSync(secretKeyPath, "[" + kp.secretKey.toString() + "]");
  const privkey = bs58.encode(new Uint8Array(kp.secretKey));

  return new Response(
    JSON.stringify({
      publicKey: kp.publicKey.toBase58(),
      secretKey: kp.secretKey,
      secretAddress: privkey,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
