import 'package:flutter/material.dart';

class AddExpense extends StatefulWidget {
  final Function addExpenseItem;

  AddExpense(this.addExpenseItem);
  @override
  _AddExpenseState createState() => _AddExpenseState();
}

class _AddExpenseState extends State<AddExpense> {
  
  final titleController = TextEditingController();
  final amountController = TextEditingController();

  void submitExpense() {
    final title = titleController.text;
    final amount = double.parse(amountController.text);
    if(title.isEmpty || amount <= 0){
      return;
    }
    widget.addExpenseItem(
      title,
      amount
    );
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 5,
      child: Container(
        padding: EdgeInsets.all(10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            TextField(
              decoration: InputDecoration(labelText: "Title"),
              controller: titleController,
              onSubmitted: (_) => submitExpense(),
            ),
            TextField(
              decoration: InputDecoration(labelText: "Amount"),
              controller: amountController,
              keyboardType: TextInputType.number,
              onSubmitted: (_) => submitExpense(),
            ),
            FlatButton(
              child: Text('Add Transaction'),
              textColor: Colors.purple,
              onPressed: submitExpense,
            )
          ],
        ),
      ),
    );
  }
}
