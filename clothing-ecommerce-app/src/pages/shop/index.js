import React from "react";

import CollectionPreview from "components/CollectionPreview";

import { SHOP_DATA as collections} from "config/data.config";
const ShopPage = () => {
  return (
    <div className="shop-page">
      <h1>Collections</h1>
      {collections.map(collection => (
        <div key={collection.id} className="shop-collection">
          <h2 className="shop-collection__title">{collection.title}</h2>
          <CollectionPreview items={collection.items.slice(0,4)}/>
        </div>
      ))}
    </div>
  );
};

export default ShopPage;
