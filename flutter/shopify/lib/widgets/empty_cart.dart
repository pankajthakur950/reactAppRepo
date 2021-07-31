import 'package:flutter/material.dart';

class EmptyCart extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        margin: EdgeInsets.only(
          left: 60,
          right: 60,
        ),
        height: MediaQuery.of(context).size.height * .5,
        child: Column(
          children: [
            CircleAvatar(
              radius: 80,
              child: Image.asset("assets/images/empty_cart.png"),
            ),
            Text(
              "Your Cart is empty",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 24,
              ),
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              "Looks Like you haven't made your choices yet...",
              style: TextStyle(
                fontSize: 20,
                color: Colors.grey,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(
              height: 20,
            ),
            RaisedButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              padding: EdgeInsets.symmetric(
                horizontal: 50,
                vertical: 10,
              ),
              child: Text(
                "Shop Now",
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              color: Theme.of(context).accentColor,
            ),
          ],
        ),
      ),
    );
  }
}
