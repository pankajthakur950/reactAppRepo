import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import './product_provider.dart';

class ProductsProvider with ChangeNotifier {
  List<Product> _products = [];

  List<Product> get items {
    return [..._products];
  }

  List<Product> get showFavorites {
    return _products.where((product) => product.isFavorite).toList();
  }

  Product findById(String productId) {
    return _products.firstWhere((product) => product.id == productId);
  }

  Future<void> getAllProducts() async {
    try {
      var response =
          await http.get("https://shopify-3fc54.firebaseio.com/products.json");
      var extractedData = json.decode(response.body) as Map<String, dynamic>;
      if (extractedData == null) {
        return;
      }
      final List<Product> loadedProducts = [];
      extractedData.forEach((productId, productData) {
        print(productData);
        loadedProducts.add(
          Product(
            id: productId,
            title: productData['title'],
            price: productData['price'],
            imageUrl: productData['imageUrl'],
            description: productData['description'],
          ),
        );
      });
      _products = loadedProducts;
      notifyListeners();
    } catch (error) {
      throw error;
    }
  }
}
