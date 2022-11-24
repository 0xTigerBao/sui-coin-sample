import {Ed25519Keypair, JsonRpcProvider, RawSigner} from "@mysten/sui.js";

const RPC = "https://fullnode.devnet.sui.io:443"
const account_seed = Ed25519Keypair.deriveKeypair("letter face pilot excuse wrist audit turtle speak relax slice extra traffic")
const client = new JsonRpcProvider(RPC)
const signer = new RawSigner(account_seed, client)

const MODULE_OBJECT_ID = "0x29bd0d999d4453172698a97a252d946801436d8e"
const MODULE_NAME = "APT_LEGEND"

/**
 * Tạo CMND mới
 * https://explorer.sui.io/transactions/FoApRd%2F6HR0MUv00DUWDk4fU8kCeyvfXaIyqHlyJrUM%3D?network=devnet&module=APT_LEGEND
 * */
async function createCMND(name: string, number: number) {
    const tx = await signer.executeMoveCall(
        {
            arguments: [name, number],
            packageObjectId: MODULE_OBJECT_ID,
            module: MODULE_NAME,
            function: "createCMND",
            typeArguments: [],
            gasBudget: 3000
        }
    ) as any
    return tx.EffectsCert.effects.effects.created[0].reference.objectId
}

/**
 * chỉnh sửa CMND
 * https://explorer.sui.io/transactions/pWqZFJbPF7Gb3BMerucEOQppqrxbimVFWKtWeOlczrU%3D?network=devnet&module=APT_LEGEND
 * **/
async function editCMND(cmnd: string, name: string, number: number) {
    const tx = await signer.executeMoveCall(
        {
            arguments: [cmnd, name, number],
            packageObjectId: MODULE_OBJECT_ID,
            module: MODULE_NAME,
            function: "editCMND",
            typeArguments: [],
            gasBudget: 3000
        }
    ) as any
    return tx.EffectsCert.certificate.transactionDigest
}


/**
 * gửi CMND cho ví khác
 * https://explorer.sui.io/transactions/YaJzsST77G8hTPUytT9hkumGhzRcqt788g8PaiSw7mQ%3D?network=devnet&module=APT_LEGEND
 * **/
async function transferCMND(cmnd: string, to: string) {
    const tx = await signer.transferObject({
        objectId: cmnd,
        recipient: to,
        gasBudget: 3000
    }) as any
    return tx.EffectsCert.certificate.transactionDigest
}

/**
 * get details của object
 * **/
async function getDetailsObject(id: string) {
    const data = await client.getObject(id) as any
    const result = data.details.data
    console.log(result)
    return result
}

async function main() {
    const id = await createCMND("Tigerbao", 98)
    await getDetailsObject(id)
    await editCMND(id, "bla bla", 11)
    await getDetailsObject(id)
    await transferCMND(id, "0x657197af2e4588e3979cf64fffb21245bf0fc4b6")
}

main().then(() => {

}).catch((e) => {
    console.log(e)
})
