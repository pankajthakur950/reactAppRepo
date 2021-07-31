import "package:flutter/material.dart";

class App extends StatefulWidget{
  @override
  State<App> createState() {
    return AppState();
  }
}

class AppState extends State<App> {
  int counter = 0;
  Widget build(context) {
    return MaterialApp(
      home: Scaffold(
        body: Text('$counter'),
        appBar: AppBar(
          backgroundColor: Colors.green,
          title: Text("Random Images"),
        ),
        floatingActionButton: FloatingActionButton(
          backgroundColor: Colors.green,
          child: Icon(Icons.add),
          onPressed: () {
            setState(() {
              counter +=1;
            });
          },
        ),
      ),
    );
  }
}

class StatelessApp extends StatelessWidget {
  Widget build(context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.green,
          title: Text("Random Images"),
        ),
        floatingActionButton: FloatingActionButton(
          backgroundColor: Colors.green,
          child: Icon(Icons.add),
          onPressed: () {
            print("hi there....from widget");
          },
        ),
      ),
    );
  }
}
