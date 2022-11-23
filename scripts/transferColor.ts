import {account, client} from "./configs";

async function main() {
    const data = await client.getObjectsOwnedByAddress('e1cd05dc7ef3ef6e8347ba7435aca9fb2cb327da')
    const objectDetails = await client.getObjectBatch(data.map(f => f.objectId))
    const datas = (objectDetails as any).map((f: any) => f.details.data).filter((a: any) => a.type === "0x92029dd56325a6940654e30e254da5378b42eafa::object_basic::ColorObject")

    const tx = await account.transferObject({
        objectId: datas[0].fields.id.id,
        gasBudget: 3000,
        recipient: "0x657197af2e4588e3979cf64fffb21245bf0fc4b6"
    })

    console.log('tx', tx)
}


main().then(() => {

}).catch((e) => {
    console.log(e)
})
