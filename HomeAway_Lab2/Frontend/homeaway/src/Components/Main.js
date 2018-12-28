import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavComp from './Navbar/navbar';
//import OwnerLogin from './OwnerLogin/OwnerLogin';
import TravellerLogin from './TravelerLogin/TravelerLogin';
import Profile from './Profile/Profile';
import PropertyListing from './PropertyListing/propertyListing';
import SearchResults from './SearchResults/searchResults';
import PropertyDetail from './PropertyDetail/propertyDetail';
import TravellerRegistration from './RegisterUser/registerUser';
import OwnerDashboard from './OwnerDashboard/ownerDashboard';
import UserDashboard from './UserDashboard/userDashboard';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import { BrowserRouter, Switch } from "react-router-dom";
import store from '../store';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authActions';
//import { clearCurrentProfile } from './actions/profileActions';
import RootReducer from "../reducers";
import OwnerLogin from "./Login/ownerLogin";
import OwnerRegistration from "./Registration/ownerRegistration";
import TravelerLogin from './TravelerLogin/TravelerLogin';

if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    // if (decoded.exp < currentTime) {
    //   // Logout user
    //   //store.dispatch(logoutUser());
    //   // Clear current Profile
    //   //store.dispatch(clearCurrentProfile());aksldnalsknakdnalksdnaklsdnsld
    //   // Redirect to login
    //   window.location.href = '/ownerLogin';
    // }
}

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
                        <Route exact path="/" component={NavComp} />
                        {/* <Route exact path="/" component={Home}/> */}
                        <Route path="/ownerLogin" component={NavComp} />
                        <Route path="/ownerLogin" component={OwnerLogin} />
                        <Route path="/travellerLogin" component={NavComp} />
                        <Route path="/travellerLogin" component={TravellerLogin} />
                        <Route path="/ownerRegistration" component={NavComp} />
                        <Route path="/ownerRegistration" component={OwnerRegistration} />
                        <Route path="/travellerRegistration" component={NavComp} />
                        <Route path="/travellerRegistration" component={TravellerRegistration} />

                        <Route path="/profile" component={NavComp} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path="/propertyListing" component={NavComp} />
                        <Route exact path="/propertyListing" component={PropertyListing} />
                        <Route path="/searchResults" component={NavComp} />
                        <Route exact path="/searchResults" component={SearchResults} />
                        <Route path="/propertyDetails/:id" component={NavComp} />
                        <Route exact path="/propertyDetails/:id" component={PropertyDetail} />
                        <Route path="/loadUserBookings" component={NavComp} />
                        <Route exact path="/loadUserBookings" component={UserDashboard} />
                        <Route path="/loadOwnerProperties"component={NavComp} />
                        <Route exact path="/loadOwnerProperties" component={OwnerDashboard} />

                    </div>

                </Provider>

            </div>
        )
    }
}
//Export The Main Component
export default Main;