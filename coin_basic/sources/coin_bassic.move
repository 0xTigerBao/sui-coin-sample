module coin_basic::SUNCOIN {
    use sui::coin::{Self, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    struct SUNCOIN has drop {}

    fun init(witness: SUNCOIN, ctx: &mut TxContext) {
        transfer::transfer(
            // second parameter defines decimals of the Coin: 6
            coin::create_currency(witness, 6, ctx),
            tx_context::sender(ctx)
        )
    }

    public entry fun mint(cap: &mut TreasuryCap<SUNCOIN>, amount: u64, recipient: address, ctx: &mut TxContext) {
        coin::mint_and_transfer(cap, amount, recipient, ctx)
    }
}
