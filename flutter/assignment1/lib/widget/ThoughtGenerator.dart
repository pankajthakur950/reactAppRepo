import 'package:flutter/material.dart';

import 'dart:math';

import './TextControl.dart';

class ThoughtGenerator extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _ThoughtGeneratorState();
  }
}

class _ThoughtGeneratorState extends State<ThoughtGenerator> {
  final List<String> _textList = [
    "Your mind cannot possibly understand God.  Your heart already knows.",
    "Big-heartedness is the most essential virtue on the spiritual journey.",
    "Other people do not have to change for us to experience peace of mind.",
    "There is nothing so much like God in all the universe as silence.",
    "Settle yourself in solitude, and you will come upon Him in yourself.",
    "Prayer is the recovery of the souls breathing.",
    "Prayer is the spirit speaking truth to Truth.",
    "Who rises from prayer a better man, his prayer is answered. ",
    "More things are wrought by prayer than this world dreams of.",
    "To meditate is to listen with a receptive heart. ",
    "Meditation is not a means to an end.  It is both the means and the end.",
    "Don't keep searching for the truth, just let go of your opinions.",
    "I want to know God's thoughts...the rest are details.",
    "The best way to know God is to love many things."
  ];
  var _text = "Your mind cannot possibly understand God.  Your heart already knows.";
  var randomNumberGenerator = Random();
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        TextControl(_text),
        RaisedButton(
          child: Text("Generate Random Thought"),
          color: Colors.blueAccent,
          textColor: Colors.white,
          onPressed: () {
            setState(() {
              _text = _textList[randomNumberGenerator.nextInt(_textList.length)];
            });
          },
        ),
      ],
    );
  }
}
