import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AppContextProvider from "./context/AppContextProvider";
import App from "./components/App";
//import Demo from './components/Demo';
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Checkout from "./components/Checkout";
import Navbar from "./components/Navbar";
import Brews from "./components/Brews";

import "gestalt/dist/gestalt.css";
import "./components/App.css";

import registerServiceWorker from "./registerServiceWorker";

const Root = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/brews/:brandId" exact component={Brews} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </AppContextProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
