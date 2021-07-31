import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../model/Expense.dart';

class ExpenseChart extends StatelessWidget {

  final List<Expense> recentTransactions;

  ExpenseChart(this.recentTransactions);

  List<Map<String, Object>> get groupedExpenseValues {
    return List.generate(7, (index){
      final weekDay = DateTime.now().subtract(
        Duration(days: index),
      );
      var totalSum = 0.0;
      for(var i=0; i<recentTransactions.length; i++){
        if(recentTransactions[i].date.day == weekDay.day &&
            recentTransactions[i].date.month == weekDay.month &&
            recentTransactions[i].date.year == weekDay.year){
              totalSum += recentTransactions[i].amount;
        }
      }
      return{
        'day': DateFormat.E().format(weekDay),
        'amount': totalSum,
      };
    });
  }

  @override
  Widget build(BuildContext context) {
    print(groupedExpenseValues);
    return Card(
      elevation: 6,
      child: Row(
        children: groupedExpenseValues.map((data){
          return Text(data['day']);
        }).toList(),
      ),
    );
  }
}
