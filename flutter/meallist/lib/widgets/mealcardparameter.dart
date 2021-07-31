import 'package:flutter/material.dart';

class MealCardParameter extends StatelessWidget {
  final IconData paramIcon;
  final String paramText;

  MealCardParameter(this.paramIcon, this.paramText);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Icon(paramIcon),
        SizedBox(width: 6),
        Text(paramText),
      ],
    );
  }
}
