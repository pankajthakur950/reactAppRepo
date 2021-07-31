import React, { Component } from "react";
import { PropertyListContext } from "./../context/PropertListContext";
import PropertyCard from "./../components/PropertyCard";
import PropertyFilter from "./../components/PropertyFilter";

export default class PropertyList extends Component {
  render() {
    const PropertyListConsumer = PropertyListContext.Consumer;
    return (
      <PropertyListConsumer>
        {({ propertyList, updateFilter }) => (
          <>
            <PropertyFilter updateFilter={updateFilter}></PropertyFilter>
            <h2 data-cy="property-count">
              {`${propertyList.length} private property for sale`}
            </h2>
            <div className="columns">
              {propertyList.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        )}
      </PropertyListConsumer>
    );
  }
}
