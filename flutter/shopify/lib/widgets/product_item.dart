import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/cart_provider.dart';

import '../screens/product_detail_screen.dart';
import '../providers/product_provider.dart';

class ProductItem extends StatelessWidget {
  // final String id;
  // final String title;
  // final String imageUrl;
  // final double price;

  // ProductItem(this.id, this.title, this.imageUrl, this.price);

  @override
  Widget build(BuildContext context) {
    print("Building product item....");
    final product = Provider.of<Product>(context);
    final cart = Provider.of<CartProvider>(context, listen: false);
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: Colors.grey,
          width: .5,
        ),
        borderRadius: BorderRadius.all(Radius.circular(10)),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(10),
        child: GridTile(
          child: GestureDetector(
            onTap: () {
              Navigator.of(context).pushNamed(
                ProductDetailScreen.routeName,
                arguments: product.id,
              );
            },
            child: FadeInImage.assetNetwork(
              placeholder: "assets/images/image_placeholder.gif",
              image: product.imageUrl,
              fit: BoxFit.cover,
            ),
          ),
          footer: Container(
            height: 80,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                  colors: [Colors.black12, Colors.black54, Colors.black],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: EdgeInsets.symmetric(
                    horizontal: 15,
                    vertical: 4,
                  ),
                  child: Text(
                    product.title,
                    style: TextStyle(
                      fontWeight: FontWeight.w700,
                      fontSize: 20,
                      color: Colors.white,
                    ),
                  ),
                ),
                GridTileBar(
                  title: Text(
                    '\$${product.price.toStringAsFixed(2)}',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                  trailing: IconButton(
                    icon: Icon(
                      Icons.shopping_cart,
                    ),
                    onPressed: () {
                      cart.addCartItem(
                        product.id,
                        product.title,
                        product.price,
                        product.imageUrl,
                      );
                      Scaffold.of(context).showSnackBar(
                        SnackBar(
                          content: Text("Item added to Cart"),
                          duration: Duration(seconds: 1),
                        ),
                      );
                    },
                    color: Theme.of(context).accentColor,
                  ),
                ),
              ],
            ),
          ),
          header: GridTileBar(
            title: Text(""),
            trailing: IconButton(
              icon: Icon(
                  product.isFavorite ? Icons.favorite : Icons.favorite_border),
              color: Theme.of(context).accentColor,
              onPressed: () {
                product.toggleFavorite();
              },
            ),
          ),
        ),
      ),
    );
  }
}
