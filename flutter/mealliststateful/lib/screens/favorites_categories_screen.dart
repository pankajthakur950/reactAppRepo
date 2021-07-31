import 'package:flutter/material.dart';
import 'package:mealliststateful/model/meal.dart';

import '../widgets/mealitem.dart';

class FavoriteCategoriesScreen extends StatelessWidget {
  final List<Meal> favoriteMeals;

  FavoriteCategoriesScreen(this.favoriteMeals);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: favoriteMeals.length > 0
          ? ListView.builder(
        itemBuilder: (context, index) {
          return MealItem(
            mealId: favoriteMeals[index].id,
            mealName: favoriteMeals[index].title,
            imageUrl: favoriteMeals[index].imageUrl,
            duration: favoriteMeals[index].duration,
            affordability: favoriteMeals[index].affordability,
            complexity: favoriteMeals[index].complexity,
          );
        },
        itemCount: favoriteMeals.length,
      )
          : Center(
              child: Text(
                "There is no favorite yet..choose some",
                style: Theme.of(context).textTheme.headline6,
              ),
            ),
    );
  }
}
