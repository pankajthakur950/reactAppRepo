import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shopify/providers/cart_provider.dart';
import 'package:shopify/widgets/counter.dart';

class CartItem extends StatelessWidget {
  final String cartId;
  final String productId;
  final String title;
  final double price;
  final String imageUrl;
  final int quantity;

  CartItem({
    this.productId,
    this.cartId,
    this.title,
    this.price,
    this.imageUrl,
    this.quantity,
  });

  @override
  Widget build(BuildContext context) {
    print("cart item build");
    return Dismissible(
      key: ValueKey(cartId),
      background: Container(
        color: Theme.of(context).errorColor,
        child: Icon(
          Icons.delete,
          color: Colors.white,
          size: 40,
        ),
        alignment: Alignment.centerRight,
        padding: EdgeInsets.only(right: 20),
        margin: EdgeInsets.symmetric(
          horizontal: 15,
          vertical: 4,
        ),
      ),
      direction: DismissDirection.endToStart,
      confirmDismiss: (direction) {
        return showDialog(
          context: context,
          builder: (ctx) => AlertDialog(
            title: Text("Are you sure?"),
            content:
                Text("Are you sure you want to delte the item from the cart?"),
            actions: [
              FlatButton(
                onPressed: () {
                  Navigator.of(ctx).pop(false);
                },
                child: Text("No"),
              ),
              FlatButton(
                onPressed: () {
                  Navigator.of(ctx).pop(true);
                },
                child: Text("Yes"),
              ),
            ],
          ),
        );
      },
      dismissThresholds: {
        DismissDirection.endToStart: 0.5,
      },
      onDismissed: (direction) {
        Provider.of<CartProvider>(context, listen: false).removeItem(productId);
      },
      child: Card(
        elevation: 5,
        margin: EdgeInsets.symmetric(
          horizontal: 15,
          vertical: 8,
        ),
        child: Container(
          padding: EdgeInsets.symmetric(
            horizontal: 15,
            vertical: 10,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              CircleAvatar(
                backgroundColor: Colors.grey,
                radius: 27,
                child: CircleAvatar(
                  radius: 25,
                  backgroundImage: NetworkImage(imageUrl),
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 20,
                    vertical: 5,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        title,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                        ),
                      ),
                      Consumer<CartProvider>(
                        builder: (_, cart, ch) => Counter(
                            count: cart.getCartItemQuantity(productId),
                            incrementCounter: () {
                              print("increment...");
                              cart.modifyCartItemQuantity(
                                  productId, CartOperation.INC_QUANTITY);
                            },
                            decrementCounter: () {
                              print("decrement");
                              cart.modifyCartItemQuantity(
                                  productId, CartOperation.DEC_QUANTITY);
                            }),
                      ),
                    ],
                  ),
                ),
              ),
              Consumer<CartProvider>(
                builder: (_, cart, ch) => Text(
                  '\$${(price * cart.getCartItemQuantity(productId)).toStringAsFixed(2)}',
                  style: TextStyle(
                    fontSize: 18,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
