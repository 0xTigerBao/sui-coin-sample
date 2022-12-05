module object_basic::dynamis_obj {
    use sui::dynamic_object_field;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{TxContext, sender};

    struct Marketplace has key {
        id: UID,
        owner: address
    }

    struct Info has key, store {
        id: UID,
        price: u64
    }


    fun init(ctx: &mut TxContext) {
        transfer::share_object(Marketplace {
            id: object::new(ctx),
            owner: sender(ctx)
        })
    }

    entry fun add_item<T: key + store + drop>(
        market: &mut Marketplace,
        price: u64,
        token: T,
        ctx: &mut TxContext) {
        let listing = Info {
            id: object::new(ctx),
            price
        };
        let token_id = object::id(&token);
        dynamic_object_field::add(&mut market.id, token_id, listing)
    }
}
