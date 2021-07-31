import 'package:flutter/material.dart';

class ScreenWithLoader extends StatelessWidget {
  final bool showLoader;
  final Widget screen;

  ScreenWithLoader({this.showLoader, this.screen});

  @override
  Widget build(BuildContext context) {
    return showLoader
        ? Center(
            child: CircularProgressIndicator(
              strokeWidth: 8,
            ),
          )
        : screen;
  }
}
