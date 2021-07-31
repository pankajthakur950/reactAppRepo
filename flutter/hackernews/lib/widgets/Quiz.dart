import 'package:flutter/material.dart';

import '../model/question.dart';
import './Question.dart';

class Quiz extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _QuizState();
}

class _QuizState extends State<Quiz> {
  var _questionIndex = 0;

  final List<Question> _questions = [
    Question("What\'s your favourite color", ["Red", "Green", "Blue", "Yellow"],
        correctAnswer: 1),
    Question(
        "What\'s your favourite mobile", ["Moto", "Nokia", "Samsung", "Iphone"],
        correctAnswer: 0),
    Question("What\'s your favourite laptop", ["Dell", "Lenovo", "Mac", "Asus"],
        correctAnswer: 2)
  ];

  var _totalScore = 0;

  void _selectAnswer(int answer) {
    setState(() {
      _questions[_questionIndex].selectedAnswer = answer;
      if (_questions[_questionIndex].correctAnswer == answer) {
        _totalScore +=1;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text("Quiz Time"),
        ),
        body: Column(
          children: [
            QuestionWidget(
              _questions[_questionIndex].question,
              _questions[_questionIndex].answers,
              _selectAnswer,
              _questions[_questionIndex].correctAnswer,
              _questions[_questionIndex].selectedAnswer
            ),
            RaisedButton(
              child: Text("Next Question"),
              onPressed: _questionIndex < _questions.length - 1
                  ? () {
                      setState(() {
                        //_checkAnswerText = "";
                        //_answerSelected = false;
                        _questionIndex++;
                      });
                    }
                  : null,
              color: Colors.blue,
            ),
          ],
        ),
      ),
    );
  }
}
