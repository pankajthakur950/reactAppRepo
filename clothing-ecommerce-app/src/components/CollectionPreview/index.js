import React from "react";

import "components/CollectionPreview/CollectionPreview.scss";
import CollectionItem from "components/CollectionItem"

function CollectionPreview({ items }) {
  return (
    <div className="collection-preview-items">
      {items.map(({ id, ...itemOtherKeys}) => (
        <CollectionItem key={id} {...itemOtherKeys}/>
      ))}
    </div>
  );
}

export default CollectionPreview;
