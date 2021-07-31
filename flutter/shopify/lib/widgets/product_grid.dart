import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/products_provider.dart';
import './product_item.dart';

class ProductsGridBuilder extends StatelessWidget {
  final bool showFavorites;

  ProductsGridBuilder(this.showFavorites);
  
  @override
  Widget build(BuildContext context) {
    final productsProvider = Provider.of<ProductsProvider>(context);
    final products = showFavorites ? productsProvider.showFavorites : productsProvider.items ;
    return GridView.builder(
      padding: const EdgeInsets.all(10.0),
      itemCount: products.length,
      itemBuilder: (ctx, i) => ChangeNotifierProvider.value(
              value: products[i],
              child: ProductItem(),
      ),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: .9,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
      ),
    );
  }
}