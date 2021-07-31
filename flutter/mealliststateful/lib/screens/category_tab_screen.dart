import 'package:flutter/material.dart';

import '../widgets/home_drawer.dart';
import './categories_screen.dart';
import './favorites_categories_screen.dart';
import '../model/meal.dart';

class CategoryTabScreen extends StatefulWidget {
  final List<Meal> favoriteMeals;

  CategoryTabScreen(this.favoriteMeals);

  @override
  _CategoryTabScreenState createState() => _CategoryTabScreenState();
}

class _CategoryTabScreenState extends State<CategoryTabScreen> {
  List<Widget> _pages;
  int _selectedPageIndex = 0;

  void _selectPage(int index) {
    setState(() {
      _selectedPageIndex = index;
    });
  }

  void initState() {
    super.initState();
    _pages = [
      CategoriesScreen(),
      FavoriteCategoriesScreen(widget.favoriteMeals),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Meals App'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      drawer: HomeDrawer(),
      body: _pages[_selectedPageIndex],
      bottomNavigationBar: BottomNavigationBar(
        onTap: _selectPage,
        unselectedItemColor: Colors.white,
        selectedItemColor: Theme.of(context).accentColor,
        currentIndex: _selectedPageIndex,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.category),
            title: Text("Categories"),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.favorite),
            title: Text("Favorites"),
          ),
        ],
        backgroundColor: Theme.of(context).primaryColor,
      ),
    );
  }
}
