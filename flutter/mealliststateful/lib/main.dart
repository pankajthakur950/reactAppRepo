import 'package:flutter/material.dart';

import 'model/app_data.dart';
import 'model/meal.dart';
import 'screens/category_meal_screen.dart';
import 'screens/category_tab_screen.dart';
import 'screens/meal_details_screen.dart';
import 'screens/filters_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  // This widget is the root of your application.
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Map<String, bool> _filters = {
    "gluttenFree": false,
    "lactoseFree": false,
    "vegan": false,
    "vegetarian": false
  };
  List<Meal> _availableMeals = DUMMY_MEALS;
  List<Meal> _favoriteMeals = [];

  void _updateFilters(updatedFilter){
    print(updatedFilter);
    setState(() {
      _filters = updatedFilter;
      _availableMeals = DUMMY_MEALS.where((meal) {
        if (_filters['gluttenFree'] && !meal.isGlutenFree) {
          return false;
        }
        if (_filters['lactoseFree'] && !meal.isLactoseFree) {
          return false;
        }
        if (_filters['vegan'] && !meal.isVegan) {
          return false;
        }
        if (_filters['vegetarian'] && !meal.isVegetarian) {
          return false;
        }
        return true;
      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Meals App',
      theme: ThemeData(
        primarySwatch: Colors.pink,
        accentColor: Colors.amber,
        canvasColor: Color.fromRGBO(255, 254, 229, 1),
        fontFamily: 'Raleway',
        textTheme: ThemeData.light().textTheme.copyWith(
              bodyText1: TextStyle(
                color: Color.fromRGBO(20, 51, 51, 1),
              ),
              bodyText2: TextStyle(
                color: Color.fromRGBO(20, 51, 51, 1),
              ),
              headline6: TextStyle(
                fontSize: 20,
                fontFamily: 'RobotoCondensed',
                fontWeight: FontWeight.bold,
              ),
            ),
      ),
      home: CategoryTabScreen(_favoriteMeals),
      routes: {
        CategoryMealsScreen.routeName : (context) => CategoryMealsScreen(_availableMeals),
        MealDetailsScreen.routeName : (context) => MealDetailsScreen(),
        FiltersScreen.routeName : (context) => FiltersScreen(_filters, _updateFilters),
      },
    );
  }
}
