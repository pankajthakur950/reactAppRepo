import 'package:flutter/material.dart';

import './widgets/Quiz.dart';

void main(){
  runApp(Quiz());
}

/*class MyApp extends StatelessWidget{
  int _questionIndex = 0;

  final List<Question> questions = [
    Question("What\'s your favourite color", ["Red", "Green", "Blue", "Yellow"]),
    Question("What\'s your favourite mobile", ["Moto", "Nokia", "Samsung", "Iphone"]),
    Question("What\'s your favourite laptop", ["Dell", "Lenovo", "Mac", "Asus"])
  ];

  @override
  Widget build(BuildContext context) {
    print(_questionIndex);
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text("Quiz Time"),
        ),
        body: Column(
          children: [
            Text(questions[_questionIndex].question),
            Column(
              children: questions[_questionIndex].answers.map((e){ 
                return RaisedButton(
                    child: Text(e),
                    onPressed: () { 
                      print(_questionIndex);
                      _questionIndex++;
                    },
                    color: Colors.blue,
                  );
                }
              ).toList(),
            ) 
          ],
        ),
      ),
    );
  }
}
//StatelessWidget example
*/