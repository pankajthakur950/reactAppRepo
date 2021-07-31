import React from 'react';
import { connect } from 'react-redux';

import { fetchFoodList } from '../../actions';

class FoodList extends React.Component{
    componentDidMount(){
        this.props.fetchFoodList();
    }
    renderFoodList(){
        return(
            this.props.foodMenu.map( foodItem => {
                return <li key={foodItem.id} className="food-item">{foodItem.itemname}</li>
            })
        )
    }
    render(){
        return (
            <ul>
                {this.renderFoodList()}
            </ul>
        );
    }
}

const mapStateToProp = (state) => {
    return {foodMenu: state.foodMenu};
}

export default connect(mapStateToProp, {fetchFoodList})(FoodList);