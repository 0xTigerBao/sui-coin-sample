import {account, client} from "./configs";

const MODULE_OBJECT_ID = "0x5b334aa9e800436898805293e076dc36e4d2dc1b"
const MODULE_NAME = "shop"
const ADMIN_ROLE_OBJECT = "0xab1c7a36d1648d3a5984c1c19d171b2baba3f25f"
const SHOP_ID = "0x848c59870e78a328ca64fcbb2478a30a5ce6fa0d"


async function getDetailsObject(id: string) {
    const data = await client.getObject(id) as any
    const result = data.details.data
    console.log(result)
    return result
}

async function create_shop(name: string, price: number) {
    const tx = await account.executeMoveCall({
        module: MODULE_NAME,
        packageObjectId: MODULE_OBJECT_ID,
        arguments: [ADMIN_ROLE_OBJECT, name, price],
        function: "create_shop",
        typeArguments: [],
        gasBudget: 3000
    })
    console.log(tx)
}

async function buy() {
    const tx = await account.executeMoveCall({
        module: MODULE_NAME,
        packageObjectId: MODULE_OBJECT_ID,
        arguments: [SHOP_ID, "0x34608fac74f7e4a58feca3bc0e115adf30272dc2"],
        function: "buy",
        typeArguments: [],
        gasBudget: 3000
    })
    console.log(tx)
}

async function withdraw_fund() {
    const tx = await account.executeMoveCall({
        module: MODULE_NAME,
        packageObjectId: MODULE_OBJECT_ID,
        arguments: [ADMIN_ROLE_OBJECT, SHOP_ID],
        function: "whitdraw_fund",
        typeArguments: [],
        gasBudget: 3000
    })
    console.log(tx)
}

async function main() {
    // await create_shop("Tiger bao", 10000)
    // await buy()
    await withdraw_fund()
}

main().then(() => {

}).catch((e) => {
    console.log(e)
})
