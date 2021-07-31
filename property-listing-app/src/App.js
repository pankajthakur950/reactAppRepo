import React from "react";
import "./App.css";
import HeroComponent from "./components/Hero";
import PropertyListProvider from "./context/PropertListContext";
import Home from "./pages/Home";
import { BrowserRouter, Route } from "react-router-dom";
import Details from "./pages/Details";

function App() {
  return (
    <div className="App">
      <HeroComponent />
      <div className="container">
        <PropertyListProvider>
          <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route exact path="/property/:id" component={Details}></Route>
          </BrowserRouter>
        </PropertyListProvider>
      </div>
    </div>
  );
}

export default App;
