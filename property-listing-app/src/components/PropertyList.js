import React, { Component } from 'react';
import {PropertyListContext} from './../context/PropertListContext';
import PropertyCard from './PropertyCard';

export default class PropertyList extends Component {

    render() {
        const PropertyListConsumer = PropertyListContext.Consumer;
        return (
            <PropertyListConsumer>
                {
                    ({propertyList})=>(
                        <>
                        <h2 data-cy="property-count">
                            {`${propertyList.length} private property for sale`}
                        </h2>
                        <div className="columns">
                            {propertyList.map(property => (
                                <PropertyCard key={property.id} property={property}/>
                            ))}
                        </div>
                        </>
                    )
                }
            </PropertyListConsumer>
        )
    }
}