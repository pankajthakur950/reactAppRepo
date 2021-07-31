import React from 'react';

import FoodList from './menu/foodList';

class App extends React.Component{
    render(){
        return (
            <div>
                <FoodList/>
            </div>
        )
    }
}

export default App;

//functional component template
/*const App = () =>{
    return <div>Functional App...</div>
}*/