```move
module sui_tutorial::object_basic {
    use sui::object;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// Trong Move core, key ability đóng vai trò là chìa khóa cho các global_store,
    /// nó kiểm soát tất cả hoạt động lưu trữ global, được sử dụng với "move_to, borrow_global, move_from, ..v.v,
    /// Nó đi theo concept Type => address mapping để lập chỉ mục
    /// Trong khi đó SUI sử đụng map keyed by ID object, nó là một id duy nhất xác định cho một object
    struct ColorObject has key {
        id: object::UID,
        red: u8,
        green: u8,
        blue: u8,
    }

    /// tạo một màu mới
    /// txcontext tạo bí danh cho cấu trúc txcontext trong module TX_context.
    fun new(red: u8, green: u8, blue: u8, ctx: &mut TxContext): ColorObject {
        ColorObject {
            red,
            green,
            blue,
            id: object::new(ctx)
        }
    }

    /// thay thay vì dùng move_to để lưu đối tượng, ở SUI chúng ta sử dụng "transfer::transfer"
    /// để thực hiện điều này
    /// Tạo một màu thuộc quyền sở hữu của sender
    public entry fun create(red: u8, greeen: u8, blue: u8, ctx: &mut TxContext) {
        let new_color = new(red, greeen, blue, ctx);
        transfer::transfer(new_color, tx_context::sender(ctx))
    }

    /// trả về thuộc tính của một màu
    public fun get_color(seft: &ColorObject): (u8, u8, u8) {
        (seft.red, seft.blue, seft.green)
    }
}

```
