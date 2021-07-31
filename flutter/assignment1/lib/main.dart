import 'package:flutter/material.dart';

import './widget/ThoughtGenerator.dart';

void main() {
  runApp(TextApp());
}

class TextApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.lightGreen,
        appBar: AppBar(
          title: Text("Random Thought Generator"),
        ),
        body: Center(
          child: ThoughtGenerator(),
        ),
      ),
    );
  }
}
