import 'package:flutter/material.dart';

import 'widget/expensehome.dart';

void main() {
  runApp(ExpenseApp());
}

class ExpenseApp extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Personal Expenses",
      theme: ThemeData(
        primarySwatch: Colors.purple,
        accentColor: Colors.amber
      ),
      home: ExpenseHome()
    );
  }
  
}
