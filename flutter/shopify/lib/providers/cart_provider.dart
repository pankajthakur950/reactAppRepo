import 'package:flutter/cupertino.dart';

class CartItem {
  final String id;
  final String title;
  final int quantity;
  final double price;
  final String imageUrl;

  CartItem({this.id, this.title, this.quantity, this.price, this.imageUrl});

  String toString() {
    return '$title -> $quantity';
  }

  Map<String, dynamic> toProductMap(){
    return {
      'id' : id,
      'title': title,
      'quantity': quantity,
      'price' : price,
      'imageUrl': imageUrl
    };
  }
}

enum CartOperation { INC_QUANTITY, DEC_QUANTITY }

class CartProvider with ChangeNotifier {
  Map<String, CartItem> _cartItems = {};

  Map<String, CartItem> get items {
    return {..._cartItems};
  }

  int get itemCount {
    return _cartItems.length;
  }

  double get totalAmount {
    var totalAmount = 0.0;
    _cartItems.forEach((key, value) {
      totalAmount += (value.quantity * value.price);
    });
    return totalAmount;
  }

  int getCartItemQuantity(String productId) {
    var quantity = 0;
    if (_cartItems.containsKey(productId)) {
      quantity = _cartItems[productId].quantity;
    }
    return quantity;
  }

  void modifyCartItemQuantity(String productId, CartOperation operation) {
    print(productId);
    if (_cartItems.containsKey(productId)) {
      var currentCartItem = _cartItems[productId];
      _cartItems[productId] = CartItem(
          id: currentCartItem.id,
          title: currentCartItem.title,
          price: currentCartItem.price,
          quantity: operation == CartOperation.INC_QUANTITY
              ? currentCartItem.quantity + 1
              : operation == CartOperation.DEC_QUANTITY
                  ? currentCartItem.quantity - 1
                  : currentCartItem.quantity,
          imageUrl: currentCartItem.imageUrl);
      notifyListeners();
      print(_cartItems);
    }
    
  }

  void addCartItem(
      String productId, String title, double price, String imageUrl) {
    if (_cartItems.containsKey(productId)) {
      var currentCartItem = _cartItems[productId];
      _cartItems[productId] = CartItem(
          id: currentCartItem.id,
          title: currentCartItem.title,
          price: currentCartItem.price,
          quantity: currentCartItem.quantity + 1,
          imageUrl: currentCartItem.imageUrl);
    } else {
      _cartItems[productId] = CartItem(
          id: productId,
          title: title,
          price: price,
          quantity: 1,
          imageUrl: imageUrl);
    }
    print(_cartItems);
    notifyListeners();
  }

  void removeItem(String productId) {
    _cartItems.remove(productId);
    notifyListeners();
  }

  void emptyCart(){
    _cartItems = {};
    notifyListeners();
  }
}
