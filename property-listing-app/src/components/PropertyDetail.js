import React from "react";
import classnames from "classnames";
import KeyFeatures from "./KeyFeatures";
import PropertyMap from "./PropertyMap";
import Gallery from "./Gallery";

function PropertyDetails({ property }) {
  if (!property) {
    return null;
  }
  const {
    title,
    address,
    description,
    price,
    features,
    details,
    image
  } = property;
  const priceClasses = classnames("text-success", "text-right");

  return (
    <div>
      <div className="columns">
        <div className="column col-9 col-xs-12">
          <h2>{title}</h2>
          <h3 className="text-dark text-small mb-1">{description}</h3>
        </div>
        <div className="column col-3 col-xs-12">
          <h5 className={priceClasses}>
            <small>Priced from</small>
            <br />
            &pound;
            {price}
          </h5>
        </div>
      </div>
      <div className="columns">
        <div className="column col-6 col-xs-12">
          <Gallery image={image} title={title} />
        </div>
        <div className="column col-6 col-xs-12">
          <KeyFeatures features={features} />
        </div>
      </div>
      <p className="text-bold mt-3">Full Details</p>
      {details.map(detail => (
        <p key={detail}>{detail}</p>
      ))}
      <p className="text-bold mt-3">Map</p>
      <PropertyMap address={address} />
    </div>
  );
}
export default PropertyDetails;
