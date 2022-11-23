import {account} from "./configs";

async function main() {
    const tx = await account.executeMoveCall(
        {
            arguments: [100, 249, 10],
            packageObjectId: "0x92029dd56325a6940654e30e254da5378b42eafa",
            module: "object_basic",
            function: "create",
            typeArguments: [],
            gasBudget: 3000
        }
    )
    console.log(tx)
}

main().then(() => {

}).catch((e) => {
    console.log(e)
})
