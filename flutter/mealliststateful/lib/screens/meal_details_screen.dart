import 'package:flutter/material.dart';
import '../model/app_data.dart';

class MealDetailsScreen extends StatefulWidget {
  static const routeName = "/meal-details";

  @override
  _MealDetailsScreenState createState() => _MealDetailsScreenState();
}

class _MealDetailsScreenState extends State<MealDetailsScreen>
    with SingleTickerProviderStateMixin {
  TabController _controller;
  bool isFavorite = false;

  @override
  void initState() {
    super.initState();
    _controller = TabController(length: 2, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    final mealId = ModalRoute.of(context).settings.arguments as String;
    final selectedMeal = DUMMY_MEALS.firstWhere((meal) => meal.id == mealId);
    final appBar = AppBar(
      title: Text(selectedMeal.title),
    );
    final mediaQueryObj = MediaQuery.of(context);

    Widget buildMealDeatilItem(IconData iconData, List<String> itemList) {
      return Card(
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        child: Container(
          padding: const EdgeInsets.symmetric(
            vertical: 15,
          ),
          child: ListView.builder(
            itemBuilder: (context, index) {
              return ListTile(
                leading: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(10),
                    child: Icon(
                      iconData,
                      color: Colors.black,
                    ),
                  ),
                  elevation: 5,
                ),
                title: Text(
                  itemList[index],
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                ),
              );
            },
            itemCount: itemList.length,
          ),
        ),
      );
    }

    return Scaffold(
      appBar: appBar,
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: Icon(Icons.star),
      ),
      body: Container(
        child: Column(
          children: <Widget>[
            Container(
              height: (mediaQueryObj.size.height -
                      appBar.preferredSize.height -
                      mediaQueryObj.padding.top) *
                  0.35,
              width: double.infinity,
              child: Image.network(
                selectedMeal.imageUrl,
                fit: BoxFit.cover,
              ),
            ),
            Container(
              margin: const EdgeInsets.all(15),
              child: Column(
                children: [
                  Container(
                    height: (mediaQueryObj.size.height -
                            appBar.preferredSize.height -
                            mediaQueryObj.padding.top) *
                        0.1,
                    decoration: BoxDecoration(
                      border: Border(
                        bottom: BorderSide(
                          color: Theme.of(context).textTheme.bodyText1.color,
                          width: 2,
                        ),
                      ),
                    ),
                    child: TabBar(
                      controller: _controller,
                      indicatorColor: Colors.transparent,
                      unselectedLabelColor:
                          Theme.of(context).textTheme.bodyText1.color,
                      labelColor: Theme.of(context).accentColor,
                      labelStyle: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w500,
                          letterSpacing: 1),
                      tabs: [
                        Tab(text: 'Ingredients'),
                        Tab(text: 'Steps'),
                      ],
                    ),
                  ),
                  Container(
                    height: (mediaQueryObj.size.height -
                            appBar.preferredSize.height -
                            mediaQueryObj.padding.top) *
                        0.5,
                    child: TabBarView(
                      controller: _controller,
                      children: <Widget>[
                        buildMealDeatilItem(
                          Icons.add,
                          selectedMeal.ingredients,
                        ),
                        buildMealDeatilItem(
                          Icons.arrow_forward,
                          selectedMeal.steps,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
