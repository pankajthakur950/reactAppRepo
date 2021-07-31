import React from 'react';
import axios from 'axios';

import RestaurantItem from './RestaurantItem';

/*class RestaurantList extends React.Component{
    constructor(){
        super();
        this.state={
            restaurantList: []
        }
    }
    async componentDidMount(){
        const response = await axios.get("http://starlord.hackerearth.com/TopRamen");
        console.table(response.data);
        this.setState({restaurantList: response.data});
    }
    renderRestaurantList(){
        return (
            this.state.restaurantList.map((restaurant, index)=>{
                return <RestaurantItem key={index} {...restaurant} />
            })
        );
    }
    render(){
        return(
            this.state.restaurantList <= 0 ? 
            <div>Loading...</div> : 
            <div className="restaurant-list">
                {this.renderRestaurantList()}
            </div>
        );
    }
}*/

function RestaurantList(props){
    const [restaurantList, setRestaurantList] = React.useState([]);
    React.useEffect(()=>{
        const fetchData = async ()=>{
            const response = await axios.get("http://starlord.hackerearth.com/TopRamen");
            setRestaurantList(response.data);
        };
        fetchData();
    },[]);

    const renderRestaurantList = ()=> {
        return (
            restaurantList.map((restaurant, index)=>{
                return <RestaurantItem key={index} {...restaurant} />
            })
        );
    }

    return(
        restaurantList.length <= 0 ? 
            <div>Loading...</div> : 
            <div className="restaurant-list">
                {renderRestaurantList()}
            </div>
    );
}

export default RestaurantList;