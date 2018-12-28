import React, { Component } from 'react';
import '../../search.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class OwnerDashboard extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            getDetails: false,
            details: []
        }

    }
    componentDidMount() {
        // var user = cookie.load('cookie');
        // const data = {
        //     email: user
        // }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/loadOwnerProperties')
            .then(response => {
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    this.setState({
                        details: response.data,
                        getDetails: true
                    })
                } else if (response.status === 400) {
                    this.setState({
                        getDetails: false
                    })
                }
            });
    }

    render() {
        // var redirectVar = null;
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/ownerLogin" />
        // }
        // }
        // else if (this.state.getDetails) {
        //     redirectVar = <Redirect to="/propertyDetail" />
        // }
        // else if (this.state.getDetails) {
        //     redirectVar = <Redirect to={{
        //         pathname: '/propertyDetail',
        //         state: { propertyDetails: this.state.details }
        //     }} />
        // }
        let detail = this.state.details.map(result => {
            return (
                <div >
                    <section class="col-xs-12 col-sm-6 col-md-12 pop_box_div" id="resultSection">
                        <article class="search-result row">
                            <div class="col-xs-12 col-sm-12 col-md-3">
                                <a href="#" title="Lorem ipsum" class="thumbnail"><img id="resultImage" src="https://images.pexels.com/photos/1459103/pexels-photo-1459103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Lorem ipsum" /></a>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-8 excerpet">
                                <h3><a href="#" title="">{result.headline}</a></h3>
                                <p>{result.description}</p>
                                <ul class="meta-search">
                                    <li><span><i class="glyphicon glyphicon-bed"></i>{result.bedroom}BR {result.type}</span></li>
                                    <li><span><i class="glyphicon glyphicon-tint"></i>{result.bathroom}Bath </span></li>
                                    <li><span><i class="glyphicon glyphicon-flash"></i>{result.currency}{result.base} per night!  </span>
                                        </li>
                                </ul>
                            </div>
                            <span class="clearfix"></span>
                        </article>
                    </section>

                </div>

            )
        })
        return (
            <div>
                <div class="container">

                    <hgroup class="mb20">
                        <h1>Search Results</h1>
                    </hgroup>
                    {detail}
                </div>
            </div>
        )
    }
}
export default OwnerDashboard;