import React from 'react';
import RestaurantList from './RestaurantList';
import RestaurantHeader from './RestaurantHeader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RestaurantHeader/>      
      </header>
      <main>
        <RestaurantList/>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
