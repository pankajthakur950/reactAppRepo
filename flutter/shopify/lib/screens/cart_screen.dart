import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shopify/providers/order_provider.dart';

import '../providers/cart_provider.dart' show CartProvider;
import '../widgets/cart_item.dart';
import '../widgets/empty_cart.dart';

class CartScreen extends StatelessWidget {
  static const routeName = '/cart';

  @override
  Widget build(BuildContext context) {
    print("cart screen build...");
    final cart = Provider.of<CartProvider>(context);
    final cartItems = cart.items.values.toList();
    return Scaffold(
      appBar: AppBar(
        title: Text('Your Cart'),
      ),
      body: cartItems.length < 1
          ? EmptyCart()
          : Column(
              children: <Widget>[
                Container(
                  constraints: BoxConstraints(
                    maxHeight: MediaQuery.of(context).size.height * .6,
                  ),
                  child: ListView.builder(
                    itemBuilder: (ctx, index) => CartItem(
                        productId: cart.items.keys.toList()[index],
                        cartId: cartItems[index].id,
                        price: cartItems[index].price,
                        title: cartItems[index].title,
                        quantity: cartItems[index].quantity,
                        imageUrl: cartItems[index].imageUrl),
                    itemCount: cartItems.length,
                    shrinkWrap: true,
                  ),
                ),
                Container(
                  margin: EdgeInsets.all(15),
                  child: Column(
                    children: [
                      const Divider(
                        color: Colors.grey,
                        thickness: 2.0,
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: <Widget>[
                            Text(
                              'Total:',
                              style: TextStyle(fontSize: 20),
                            ),
                            Consumer<CartProvider>(
                              builder: (_, cart, ch) => Text(
                                '\$${cart.totalAmount.toStringAsFixed(2)}',
                                style: TextStyle(fontSize: 20),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Align(
                    alignment: Alignment.bottomCenter,
                    child: Container(
                      width: double.infinity,
                      height: 60,
                      margin: EdgeInsets.all(15),
                      child: RaisedButton.icon(
                        icon: Icon(
                          Icons.shopping_cart,
                          size: 28,
                          color: Colors.white,
                        ),
                        label: Text(
                          "Checkout",
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                        color: Theme.of(context).accentColor,
                        onPressed: () {
                          Provider.of<OrderProvider>(context, listen: false)
                              .addOrder(
                            cartItems,
                            cart.totalAmount,
                          );
                          cart.emptyCart();
                        },
                      ),
                    ),
                  ),
                )
              ],
            ),
    );
  }
}
