import React from 'react';

class RestaurantItem extends React.Component{
    render(){
        console.log(this.props);
        const {Brand, Variety, Style, Country, Stars} = this.props;
        return (
            <div className="restaurant-item">
                <h3 className="restaurant-item__brand">{Brand}</h3>
                <div className="content">
                    <div className="restaurant-item__country">{Country}</div>
                </div>
            </div>
        )
    }
}

export default RestaurantItem;