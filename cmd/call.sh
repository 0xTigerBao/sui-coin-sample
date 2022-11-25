module=SUNCOIN
package=0x245907628fe2da68979410c3b952693a5d7ed3ff
function=mint
cap=0xcc0e739a8c6d4fc6998b0793f4e8dfa7933b3d05
sui client call --package $package --module $module --function $function --args $cap 100000000000000 \
0x657197af2e4588e3979cf64fffb21245bf0fc4b6 --gas-budget 3000
