import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/order_provider.dart' show OrderProvider;
import '../widgets/app_drawer.dart';
import '../widgets/screen_with_loader.dart';
import '../widgets/order_item.dart';

class OrdersScreen extends StatelessWidget {
  static const routeName = '/orders';

  @override
  Widget build(BuildContext context) {
    print("order screen build...");

    return Scaffold(
      appBar: AppBar(
        title: Text('Your Orders'),
      ),
      drawer: AppDrawer(),
      body: FutureBuilder(
        builder: (ctx, dataSnapshot) {
          print("FutureBuilder~~~~~~~~~~~~~~~~~~");
          print(dataSnapshot.connectionState);
          var _isLoader = false;
          if (dataSnapshot.connectionState == ConnectionState.waiting) {
            _isLoader = true;
          }
          return ScreenWithLoader(
            showLoader: _isLoader,
            screen: Consumer<OrderProvider>(
              builder: (ctx, orderData, child) {
                return ListView.builder(
                  itemCount: orderData.orders.length,
                  itemBuilder: (ctx, i) => OrderItem(orderData.orders[i]),
                );
              },
            ),
          );
        },
        future:
            Provider.of<OrderProvider>(context, listen: false).getAllOrders(),
      ),
    );
  }
}
