import React from "react";
import { PropertyListContext } from "./../context/PropertListContext";
import PropertyDetails from "./../components/PropertyDetail";

export default function Details(props) {
  const PropertyListConsumer = PropertyListContext.Consumer;
  return (
    <PropertyListConsumer>
      {({ getPropertyById }) => (
        <PropertyDetails
          property={getPropertyById(props.match.params.id)}
        ></PropertyDetails>
      )}
    </PropertyListConsumer>
  );
}
