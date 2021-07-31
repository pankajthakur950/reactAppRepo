import 'package:flutter/material.dart';
import 'package:meallist/screens/categories_screen.dart';
import 'package:meallist/screens/favorites_categories_screen.dart';

class CategoryTabScreen extends StatefulWidget {
  @override
  _CategoryTabScreenState createState() => _CategoryTabScreenState();
}

class _CategoryTabScreenState extends State<CategoryTabScreen> {
  List<Widget> _pages = [
    CategoriesScreen(),
    FavoriteCategoriesScreen(),
  ];
  int _selectedPageIndex = 0;

  void _selectPage(int index){
    setState(() {
      _selectedPageIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Meals App'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
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
