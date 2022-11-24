module sui_tutorial::object_basic {
    use std::debug;

    use sui::object;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    struct ColorObject has key, store {
        id: object::UID,
        red: u8,
        green: u8,
        blue: u8,
    }

    struct Capability has key, store {
        id: object::UID
    }

    fun new(red: u8, green: u8, blue: u8, ctx: &mut TxContext): ColorObject {
        ColorObject {
            id: object::new(ctx),
            red,
            green,
            blue
        }
    }

    public entry fun create(red: u8, green: u8, blue: u8, ctx: &mut TxContext) {
        let new_color = new(red, green, blue, ctx);
        transfer::transfer(new_color, tx_context::sender(ctx))
    }

    public entry fun edit_color(color: &mut ColorObject, red: u8, green: u8, blue: u8) {
        color.red = red;
        color.green = green;
        color.blue = blue;
    }

    public fun get_color(seft: &ColorObject): (u8, u8, u8) {
        let addr = object::uid_to_address(&seft.id);
        debug::print(&addr);
        (seft.red, seft.green, seft.blue)
    }

    #[test]
    fun test_to_end() {
        use sui::test_scenario::{Self, ctx};

        let admin = @0x45;

        let scenario_val = test_scenario::begin(admin);
        let scenario = &mut scenario_val;

        {
            create(10, 11, 22, ctx(scenario));
        };

        {
            assert!(!test_scenario::has_most_recent_for_sender<ColorObject>(scenario), 0);
        };

        test_scenario::next_tx(scenario, admin);

        {
            let object = test_scenario::take_from_sender<ColorObject>(scenario);
            let (red, green, blue) = get_color(&object);
            assert!(red == 10 && green == 11 && blue == 22, 0);
            test_scenario::return_to_sender(scenario, object);
        };

        test_scenario::end(scenario_val);
    }

    #[test]
    fun transfer_object() {
        use sui::test_scenario::{Self, ctx};

        let admin = @0x45;
        let alice = @0x46;

        let scenario_val = test_scenario::begin(admin);
        let scenario = &mut scenario_val;

        {
            create(10, 11, 22, ctx(scenario));
        };

        {
            assert!(!test_scenario::has_most_recent_for_sender<ColorObject>(scenario), 0);
        };

        test_scenario::next_tx(scenario, admin);

        {
            let object = test_scenario::take_from_sender<ColorObject>(scenario);
            transfer::transfer(object, alice);
        };

        test_scenario::end(scenario_val);
    }
}
