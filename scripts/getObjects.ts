import {client} from "./configs";

async function main() {
    const data = await client.getObjectsOwnedByAddress('e1cd05dc7ef3ef6e8347ba7435aca9fb2cb327da')
    // const obj = await account.splitCoin({
    //     coinObjectId: "0x662b8f31707a6469ddef39357ba51ce4d7ac0b6c",
    //     splitAmounts: [10, 20, 30],
    //     gasBudget: 3000
    // })
    // const tx = await account.transferObject({
    //     objectId: "0x4851a3bf0cfc57a9e259ea94e826910db5cd29d7",
    //     gasBudget: 3000,
    //     recipient: "0x98d2e6f93e8568e5c5968e5e9fed855720d6842d"
    // })
    const objectDetails = await client.getObjectBatch(data.map(f => f.objectId))
    const datas = (objectDetails as any).map((f: any) => f.details.data)
    console.log(datas)
}


main().then(() => {

}).catch((e) => {
    console.log(e)
})
