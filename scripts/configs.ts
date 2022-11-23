import {Ed25519Keypair, JsonRpcProvider, RawSigner} from "@mysten/sui.js";

export const RPC = "https://fullnode.devnet.sui.io:443"
export const account_seed = Ed25519Keypair.deriveKeypair("letter face pilot excuse wrist audit turtle speak relax slice extra traffic")
export const client = new JsonRpcProvider(RPC)
export const account = new RawSigner(account_seed, client)
