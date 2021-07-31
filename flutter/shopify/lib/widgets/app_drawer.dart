import 'package:flutter/material.dart';

import '../screens/orders_screen.dart';

class AppDrawer extends StatelessWidget {
  Widget buildDrawerListTile(
      BuildContext context, IconData icon, String title, String routeName) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      onTap: () {
        Navigator.of(context).pushReplacementNamed(routeName);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: [
          AppBar(
            title: Text("Hello Friend!"),
            automaticallyImplyLeading: false,
          ),
          Divider(),
          buildDrawerListTile(context, Icons.shop, "Shop", '/'),
          Divider(),
          buildDrawerListTile(context, Icons.payment, "Orders", OrdersScreen.routeName),
        ],
      ),
    );
  }
}
