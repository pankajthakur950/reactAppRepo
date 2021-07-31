import 'package:flutter/material.dart';

import 'expensetracker.dart';
import 'addexpense.dart';
import './expensechart.dart';

import '../model/Expense.dart';

class ExpenseHome extends StatefulWidget {
  @override
  _ExpenseHomeState createState() => _ExpenseHomeState();
}

class _ExpenseHomeState extends State<ExpenseHome> {
  final List<Expense> _expenses = [
    Expense(title: "Shoes", amount: 99.99, date: DateTime.now()),
    Expense(title: "Clothes", amount: 109.99, date: DateTime.now()),
    Expense(title: "Grocery", amount: 49.99, date: DateTime.now())
  ];

  void _addNewTransaction(String txTitle, double txAmount) {
    final newTx = Expense(
      title: txTitle,
      amount: txAmount,
      date: DateTime.now(),
      id: DateTime.now().toString(),
    );

    setState(() {
      _expenses.add(newTx);
    });
  }

  void _showNewExpenseModal(ctx) {
    showModalBottomSheet(
        context: ctx,
        builder: (_) {
          return AddExpense(_addNewTransaction);
        });
  }

  List<Expense> get _recentTransactions {
    return _expenses.where((expense) {
      return expense.date.isAfter(
        DateTime.now().subtract(
          Duration(days: 7),
        ),
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Personal Expenses"),
        actions: <Widget>[
          IconButton(
            icon: Icon(
              Icons.add_circle_outline,
              color: Colors.white,
              size: 30.0,
            ),
            onPressed: () => _showNewExpenseModal(context),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showNewExpenseModal(context),
        child: Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      body: SingleChildScrollView(
        child: Container(
          child: Column(
            children: [
              ExpenseChart(_recentTransactions),
              ExpenseList(_expenses),
            ],
          ),
          margin: EdgeInsets.all(15.0),
        ),
      ),
    );
  }
}
