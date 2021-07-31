import 'package:flutter/material.dart';

import '../model/app_data.dart';
import '../widgets/categoryitem.dart';

class CategoriesScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GridView(
      padding: const EdgeInsets.all(20),
      gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
          maxCrossAxisExtent: 200,
          mainAxisSpacing: 20,
          crossAxisSpacing: 20,
          childAspectRatio: 1.5),
      children: DUMMY_CATEGORIES
          .map((category) => CategoryItem(
                category.id,
                category.title,
                category.color,
              ))
          .toList(),
    );
  }
}
