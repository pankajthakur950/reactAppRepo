import React from "react";
import { withRouter } from "react-router-dom";

import "components/CategoryItem/CategoryItem.scss";

function CategoryItem({title, imageUrl, categoryUrl, history}) {
  return (
    <div className="category-menu__item menu-item">
      <div
        className="menu-item__background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="menu-item__content" onClick={()=>history.push(`/shop/${categoryUrl}`)}>
        <h4 className="content__title">{title.toUpperCase()}</h4>
        <span className="content__subtitle">SHOP NOW</span>
      </div>
    </div>
  );
}

export default withRouter(CategoryItem);
