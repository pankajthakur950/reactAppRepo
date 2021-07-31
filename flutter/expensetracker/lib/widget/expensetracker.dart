import 'package:flutter/material.dart';

import '../model/Expense.dart';
import './expenseitem.dart';

class ExpenseList extends StatelessWidget {
  final List<Expense> expenses;

  ExpenseList(this.expenses);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          height: 300,
          child: ListView.builder(
            itemBuilder: (ctx, index) {
              return ExpenseItem(expenses[index]);
            },
            itemCount: expenses.length,
          ),
        ),
      ],
    );
  }
}
