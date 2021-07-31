import 'package:flutter/material.dart';
import '../widgets/home_drawer.dart';

class FiltersScreen extends StatefulWidget {
  static const routeName = "/filters";

  Function updateFilters;
  Map<String,bool> filters;

  FiltersScreen(this.filters, this.updateFilters);

  @override
  _FiltersScreenState createState() => _FiltersScreenState();
}

class _FiltersScreenState extends State<FiltersScreen> {
  Map<String, bool> _filterObject;

  void initState(){
    super.initState();
    _filterObject = {
      "gluttenFree": widget.filters["gluttenFree"],
      "lactoseFree": widget.filters["lactoseFree"],
      "vegan": widget.filters["vegan"],
      "vegetarian": widget.filters["vegetarian"]
    };
  }

  Widget buildSwitchListTile(String title, String description, String filter) {
    return SwitchListTile(
      title: Text(title),
      value: _filterObject[filter],
      subtitle: Text(description),
      onChanged: (newValue) {
        setState(() {
          _filterObject[filter] = newValue;
        });
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Meals App'),
        backgroundColor: Theme.of(context).primaryColor,
        actions: [
          IconButton(
            icon: Icon(Icons.save),
            onPressed: (){
              widget.updateFilters(_filterObject);
            },
          )
        ],
      ),
      drawer: HomeDrawer(),
      body: Column(
        children: [
          Container(
            padding: EdgeInsets.all(20),
            width: double.infinity,
            child: Text(
              "Adjust your meal selection.",
              style: Theme.of(context).textTheme.headline6,
              textAlign: TextAlign.center,
            ),
          ),
          Expanded(
            child: ListView(
              children: [
                buildSwitchListTile(
                  "Glutten-free",
                  "Only include glutten free meals",
                  "gluttenFree",
                ),
                buildSwitchListTile(
                  "Lactose-free",
                  "Only include lactose free meals",
                  "lactoseFree",
                ),
                buildSwitchListTile(
                  "Vegan",
                  "Only include vegan meals",
                  "vegan",
                ),
                buildSwitchListTile(
                  "Vegetarian",
                  "Only include vegetarian free meals",
                  "vegetarian",
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
