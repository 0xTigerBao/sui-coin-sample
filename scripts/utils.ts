import BigNumber from "bignumber.js";

export const ConvertBignumber = (amount: number | string, decimals: number) => {
    return BigInt(
        new BigNumber(amount)
            .shiftedBy(decimals)
            .integerValue()
            .toString()
    );
}
