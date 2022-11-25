module object_basic::shop {
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::object::{Self, new};
    use sui::sui::SUI;
    use sui::transfer;
    use sui::tx_context::{TxContext, sender};

    struct AdminCapability has key { id: object::UID }

    struct Products has key {
        id: object::UID
    }

    struct Shop has key {
        id: object::UID,
        name: vector<u8>,
        price: u64,
        coins: Balance<SUI>
    }

    fun init(ctx: &mut TxContext) {
        transfer::transfer<AdminCapability>(AdminCapability {
            id: new(ctx)
        }, sender(ctx));
    }

    public entry fun create_shop(_: &AdminCapability, name: vector<u8>, price: u64, ctx: &mut TxContext) {
        transfer::share_object(Shop {
            id: new(ctx),
            name,
            price,
            coins: balance::zero()
        })
    }

    public entry fun buy(shop: &mut Shop, payment: &mut Coin<SUI>, ctx: &mut TxContext) {
        assert!(coin::value(payment) >= shop.price, 0);
        let fund = balance::split(coin::balance_mut(payment), shop.price);
        balance::join(&mut shop.coins, fund);
        transfer::transfer(Products {
            id: new(ctx)
        }, sender(ctx))
    }

    public entry fun whitdraw_fund(_: &AdminCapability, shop: &mut Shop, ctx: &mut TxContext) {
        let value = balance::value(&shop.coins);
        let fund = coin::take(&mut shop.coins, value, ctx);
        transfer::transfer(fund, sender(ctx))
    }
}
