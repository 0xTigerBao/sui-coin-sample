module pay::pay_sample {

    use sui::tx_context::TxContext;
    use sui::pay;

    fun init(ctx: &mut TxContext){
        pay
    }
}
