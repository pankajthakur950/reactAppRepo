import 'package:flutter/material.dart';

import '../model/Expense.dart';

class ExpenseItem extends StatelessWidget {
  final Expense expense;

  ExpenseItem(this.expense);
  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      child: Row(
        children: [
          Container(
            width: 100,
            margin: EdgeInsets.symmetric(
              vertical: 10,
              horizontal: 15,
            ),
            decoration: BoxDecoration(
              border: Border.all(
                width: 2,
                color: Theme.of(context).primaryColor,
              ),
            ),
            padding: EdgeInsets.all(10.0),
            child: Text(
              '\$${expense.amount.toStringAsFixed(2)}',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 18,
                color: Theme.of(context).primaryColor,
              ),
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                expense.title,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              Text(
                expense.date.toString(),
                style: TextStyle(
                  color: Colors.grey,
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
