import React from "react";
import MenuItem from "components/CategoryItem";
import "components/CategoryMenu/CategoryMenu.scss";

import {CATEGORY_DATA} from "config/data.config"

export default class CategoryMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      items: CATEGORY_DATA
    };
  }

  render() {
    return (
      <div className="category-menu">
        {this.state.items.map(({id, ...itemOtherKeys}) => 
          <MenuItem key={id} {...itemOtherKeys} />
        )}
      </div>
    );
  }
}
