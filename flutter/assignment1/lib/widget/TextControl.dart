import 'package:flutter/material.dart';

class TextControl extends StatelessWidget {
  final String text;

  TextControl(this.text);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text(
        text,
        style: TextStyle(fontSize: 24),
        textAlign: TextAlign.center,
      ),
      margin: EdgeInsets.all(20.0),
    );
  }
}
