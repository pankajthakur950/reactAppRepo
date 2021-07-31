import 'package:flutter/material.dart';

class QuestionWidget extends StatelessWidget {
  final String questionText;
  final List<String> answerList;
  final Function answerHandler;
  final int correctAnswer;
  final int selectedAnswer;

  QuestionWidget(this.questionText, this.answerList, this.answerHandler,
      this.correctAnswer, this.selectedAnswer);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.all(20),
      child: Column(children: [
        SizedBox(
          child: Text(
            questionText,
            style: TextStyle(fontSize: 28),
            textAlign: TextAlign.left,
          ),
          width: double.infinity,
        ),
        Container(
          margin: EdgeInsets.all(10),
        ),
        ...answerList.asMap().entries.map((e) {
          var isAnswerSelected = selectedAnswer != null && selectedAnswer >= 0;
          var selectedAnswerColor = isAnswerSelected && selectedAnswer == e.key
              ? Colors.green
              : Colors.red;
          return SizedBox(
            width: double.infinity,
            child: RaisedButton(
              child: Text(e.value),
              color: Colors.lightBlue,
              disabledColor: isAnswerSelected &&
                      selectedAnswer == e.key
                  ? selectedAnswerColor
                  : Colors.lightBlue,
              onPressed: isAnswerSelected
                  ? null
                  : () {
                      print(e.key);
                      answerHandler(e.key);
                    },
            ),
          );
        }).toList(),
      ]),
    );
  }
}
