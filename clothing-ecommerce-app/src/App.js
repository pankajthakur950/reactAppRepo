import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import Homepage from "pages/homepage";
import ShopPage from "pages/shop";
import Header from "components/Header";
import LoginPage from "pages/login";
import { auth, createUserProfileDocument } from "firebase/firebase.util";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }
  unsubscribeFromUserAuth = null;
  componentDidMount() {
    this.unsubscribeFromUserAuth = auth.onAuthStateChanged(async userAuth => {
      if (!userAuth) this.setState({ currentUser: userAuth });
      const userSnapshot = await createUserProfileDocument(userAuth);
      userSnapshot &&
        userSnapshot.onSnapshot(userSnapshot => {
          this.setState({
            currentUser: {
              id: userSnapshot.id,
              ...userSnapshot.data()
            }
          });
        });
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromUserAuth();
  }
  render() {
    console.log(this.state.currentUser);
    return (
      <BrowserRouter>
        <Header currentUser={this.state.currentUser} />
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/login">
          {this.state.currentUser ? <Redirect to="/" /> : <LoginPage />}
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
