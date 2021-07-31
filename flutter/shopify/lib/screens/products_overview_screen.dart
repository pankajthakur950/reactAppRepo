import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/product_grid.dart';
import '../widgets/badge.dart';
import '../widgets/app_drawer.dart';
import '../providers/cart_provider.dart';
import '../providers/products_provider.dart';
import 'cart_screen.dart';

enum ProductView { SHOW_ALL, SHOW_FAVORITE }

class ProductsOverviewScreen extends StatefulWidget {
  @override
  _ProductsOverviewScreenState createState() => _ProductsOverviewScreenState();
}

class _ProductsOverviewScreenState extends State<ProductsOverviewScreen> {
  bool _showFavorites = false;
  bool _showLoader = false;
  bool _isInit = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_isInit) {
      setState(() {
        _showLoader = true;
      });
      Provider.of<ProductsProvider>(context, listen: false)
          .getAllProducts()
          .then((_) {
        setState(() {
          _showLoader = false;
        });
      });
    }
    _isInit = true;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('MyShop'),
        actions: [
          Consumer<CartProvider>(
            builder: (_, cart, ch) => Badge(
              child: ch,
              value: cart.itemCount.toString(),
            ),
            child: IconButton(
              icon: Icon(
                Icons.shopping_cart,
              ),
              onPressed: () {
                Navigator.of(context).pushNamed(CartScreen.routeName);
              },
            ),
          ),
          PopupMenuButton(
            icon: Icon(
              Icons.more_vert,
            ),
            onSelected: (ProductView value) {
              setState(() {
                if (value == ProductView.SHOW_FAVORITE) {
                  _showFavorites = true;
                } else {
                  _showFavorites = false;
                }
              });
            },
            itemBuilder: (_) => [
              PopupMenuItem(
                  child: Text("Only Favorites"),
                  value: ProductView.SHOW_FAVORITE),
              PopupMenuItem(
                  child: Text("Show All"), value: ProductView.SHOW_ALL),
            ],
          ),
        ],
      ),
      drawer: AppDrawer(),
      body: Stack(children: [
        ProductsGridBuilder(_showFavorites),
        if(_showLoader) 
          Center(
            child: CircularProgressIndicator(
              strokeWidth: 5,
            ),
          ),
      ]),
    );
  }
}
