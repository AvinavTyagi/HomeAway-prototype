import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './Navbar/navbar';
//import OwnerLogin from './OwnerLogin/OwnerLogin';
import TravelerLogin from './TravelerLogin/TravelerLogin';
import Profile from './Profile/Profile';
import PropertyListing from './PropertyListing/propertyListing';
import SearchResults from './SearchResults/searchResults';
import PropertyDetail from './PropertyDetail/propertyDetail';
import RegisterOwner from './RegisterOwner/registerOwner';
import RegisterUser from './RegisterUser/registerUser';
import OwnerDashboard from './OwnerDashboard/ownerDashboard';
import UserDashboard from './UserDashboard/userDashboard';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import { BrowserRouter, Switch } from "react-router-dom";

import RootReducer from "../reducers";
import OwnerLogin from "./Login/ownerLogin";
//import NewBook from "./components/book_new";
//Create a Main Component
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(promise)));
class Main extends Component {

    render() {
        return (
            <div>
                {/* <Route exact path="/" render={()=><NavBar loginFlag={false}/>}/>
                <Route path="/ownerLogin" render={()=><NavBar loginFlag={true}/>}/>
                <Route exact path="/ownerLogin" component={OwnerLogin}/>
                <Route path="/travelerLogin" render={()=><NavBar loginFlag={true}/>}/>
                <Route exact path="/travelerLogin" component={TravelerLogin}/>
                <Route path="/profile" render={()=><NavBar loginFlag={true}/>}/>
                <Route exact path="/profile" component={Profile}/>
                <Route path="/propertyListing" render={()=><NavBar loginFlag={true}/>}/>
                <Route exact path="/propertyListing" component={PropertyListing}/>
                <Route path="/searchResults" render={()=><NavBar loginFlag={true}/>}/>
                <Route exact path="/searchResults" component={SearchResults}/>
                <Route path="/propertyDetail" render={()=><NavBar loginFlag={true}/>}/>
                <Route exact path="/propertyDetail" component={PropertyDetail}/>
                <Route path="/ownerRegistration" render={()=><NavBar loginFlag={true}/>}/>
                <Route exact path="/ownerRegistration" component={RegisterOwner}/>
                <Route path="/userRegistration" render={()=><NavBar loginFlag={true}/>}/>
                <Route exact path="/userRegistration" component={RegisterUser}/>
                <Route path="/loadOwnerProperties" render={()=><NavBar loginFlag={true}/>}/>
                <Route exact path="/loadOwnerProperties" component={OwnerDashboard}/>
                <Route path="/loadUserBookings" render={()=><NavBar loginFlag={true}/>}/>
                <Route exact path="/loadUserBookings" component={UserDashboard}/> */}
                <Provider store={store}>

                    <div>

                        {/* <Route path="/book/new" component={NewBook} /> */}
                        {/* <Route exact path="/" component={OwnerLogin} /> */}
                        <Route exact path="/" render={() => <NavBar loginFlag={false} />} />
                        {/* <Route exact path="/" component={Home}/> */}
                        <Route path="/ownerLogin" render={() => <NavBar loginFlag={true} />} />
                        <Route path="/ownerLogin" component={OwnerLogin} />
                        <Route path="/propertyListing" render={() => <NavBar loginFlag={true} />} />
                        <Route exact path="/propertyListing" component={PropertyListing} />
                        <Route path="/loadOwnerProperties" render={() => <NavBar loginFlag={true} />} />
                        <Route exact path="/loadOwnerProperties" component={OwnerDashboard} />
                        <Route path="/searchResults" render={() => <NavBar loginFlag={true} />} />
                        <Route exact path="/searchResults" component={SearchResults} />
                        <Route path="/ownerRegistration" render={() => <NavBar loginFlag={true} />} />
                        <Route exact path="/ownerRegistration" component={RegisterOwner} />
                        <Route path="/loadUserBookings" render={() => <NavBar loginFlag={true} />} />
                        <Route exact path="/loadUserBookings" component={UserDashboard} />
                        <Route path="/propertyDetail" render={() => <NavBar loginFlag={true} />} />
                        <Route exact path="/propertyDetail" component={PropertyDetail} />
                    </div>

                </Provider>

            </div>
        )
    }
}
//Export The Main Component
export default Main;