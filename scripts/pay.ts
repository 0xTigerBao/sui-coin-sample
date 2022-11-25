import {account, client} from "./configs";
import {Coin} from "@mysten/sui.js";
import {ConvertBignumber} from "./utils";

async function main() {
    const allObjectId = await client.getObjectsOwnedByAddress(await account.getAddress())
    const allObject = await client.getObjectBatch(allObjectId.map(f => f.objectId))
    const suiObjects = allObject.filter(Coin.isSUI).map((aCoin: any) => {
        return aCoin.details.data
    })


    const amount = Coin.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(
        suiObjects,
        ConvertBignumber(0.1, 9)
    )

    console.log(amount)

    const tx = await Coin.transfer(
        account,
        suiObjects as any,
        "0x2::sui::SUI",
        ConvertBignumber(0.1, 9),
        "0x657197af2e4588e3979cf64fffb21245bf0fc4b6",
        3000
    )

    console.log(tx)

}


main().then(() => {

}).catch((e) => {
    console.log(e)
})
