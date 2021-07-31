import React from "react";

import "components/CollectionItem/CollectionItem.scss";

function CollectionItem({ name, imageUrl, price }) {
  return (
    <div className="collection-item">
      <div
        className="collection-item__image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="collection-item__content">
        <span className="collection-item__content__title">{name}</span>
        <span className="collection-item__content__price">${price}</span>
      </div>
      <button className="collection-item__shopnow">ADD TO CART</button>
    </div>
  );
}

export default CollectionItem;
