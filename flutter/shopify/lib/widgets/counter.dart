import 'package:flutter/material.dart';

enum CounterDirection { horizontal, vertical }

class Counter extends StatelessWidget {
  final int count;
  final CounterDirection direction;
  final Function incrementCounter;
  final Function decrementCounter;

  Counter({
    @required this.count,
    this.direction = CounterDirection.vertical,
    @required this.incrementCounter,
    @required this.decrementCounter,
  });

  Widget buildCounter({CounterDirection direction, List<Widget> children}) {
    return direction == CounterDirection.horizontal
        ? Row(
            children: children,
          )
        : Column(
            children: children,
          );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: buildCounter(
        direction: direction,
        children: [
          SizedBox(
            child: IconButton(
              icon: Icon(Icons.keyboard_arrow_up),
              padding: EdgeInsets.all(0),
              onPressed: incrementCounter,
            ),
            height: 24,
            width: 24,
          ),
          Container(
            child: Text(
              "${count}x",
            ),
          ),
          SizedBox(
            child: IconButton(
              icon: Icon(Icons.keyboard_arrow_down),
              padding: EdgeInsets.all(0),
              onPressed: count > 1 ? decrementCounter : null,
            ),
            height: 24,
            width: 24,
          )
        ],
      ),
    );
  }
}
