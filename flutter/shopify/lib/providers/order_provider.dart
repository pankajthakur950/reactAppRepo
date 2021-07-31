import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../providers/cart_provider.dart';

class OrderItem {
  final String orderId;
  final double orderAmount;
  final List<CartItem> products;
  final DateTime dateTime;

  OrderItem({this.orderId, this.orderAmount, this.products, this.dateTime});
}

class OrderProvider with ChangeNotifier {
  List<OrderItem> _orderItems = [];

  List<OrderItem> get orders {
    return [..._orderItems];
  }

  int get orderCount {
    return _orderItems.length;
  }

  Future<void> getAllOrders() async{  
    const url = "https://shopify-3fc54.firebaseio.com/orders.json";
    print("getAllOrders^^^^^^^^^^^^^^^^^^^^^^^^^");
    try{
      var response = await http.get(url);
      var extractedData = json.decode(response.body) as Map<String, dynamic>;
      if (extractedData == null) {
        return;
      }
      final List<OrderItem> loadedOrders = [];
      extractedData.forEach((orderId, orderData) {
        var products = orderData['products'] as List<dynamic>;
        var productItems = products.map((ci) => CartItem(
          id: ci['id'],
          imageUrl: ci['imageUrl'],
          price: ci['price'],
          quantity: ci['quantity'],
          title: ci['title']
        )).toList();
        loadedOrders.add(
          OrderItem(
            orderId: orderId,
            dateTime: DateTime.parse(orderData['dateTime']),
            orderAmount: orderData['orderAmount'],
            products: productItems
          )
        );
      });
      print("loaded orders ###############");
      print(loadedOrders);
      _orderItems = loadedOrders.reversed.toList();
      notifyListeners();
    }catch(error){
      print(error);
      throw error;
    }
  }

  Future<void> addOrder(List<CartItem> cartProducts, double total) async {
    const url = "https://shopify-3fc54.firebaseio.com/orders.json";
    final currentDate = DateTime.now();
    try {
      var response = await http.post(url,
          body: json.encode({
            'dateTime': currentDate.toIso8601String(),
            'orderAmount': total,
            'products': cartProducts.map((cp) => cp.toProductMap()).toList()
          }));
          print(json.decode(response.body));
      final orderItem = OrderItem(
        dateTime: currentDate,
        orderId: json.decode(response.body)['name'],
        orderAmount: total,
        products: cartProducts,
      );
      _orderItems.insert(0, orderItem);
      notifyListeners();
    } catch (error) {
      print(error);
      throw error;
    }
  }
}
