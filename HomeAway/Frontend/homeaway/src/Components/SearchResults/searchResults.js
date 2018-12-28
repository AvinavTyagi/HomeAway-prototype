import React, { Component } from 'react';
import '../../search.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class SearchResults extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            getDetails : false,
            results: this.props.location.state.searchResults,
            details: []
        }
        this.handleClick = this.handleClick.bind(this);

    }
    componentDidMount() {
        this.setState({
            getDetails: false
        })
    }
    handleClick = (val,e) => {
        const data = {
            ID: val
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/loadProperty', data)
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
        var redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/ownerLogin" />
        }
        // }
        // else if (this.state.getDetails) {
        //     redirectVar = <Redirect to="/propertyDetail" />
        // }
        else if (this.state.getDetails) {
            redirectVar = <Redirect to={{
                pathname: '/propertyDetail',
                state: { propertyDetails: this.state.details }
            }} />
        }
        let details = this.state.results.map(result => {
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
                                    <span onClick={this.handleClick.bind(this, result.id)} ><input type="hidden" class="form-control" name="ID" value={result.id} />
                                    <button class="btn btn-success pull-right" id = "viewProperty" type="submit">View</button></span></li>
                                </ul>
                                {/* <span class="plus"><a href="#" title="Lorem ipsum"><i class="glyphicon glyphicon-plus"></i></a></span> */}
                                {/* <span onClick={this.handleClick.bind(this, result.id)} ><input type="hidden" class="form-control" name="ID" value={result.id} />
                                    <button class="btn btn-success" type="submit">View</button></span> */}
                            </div>
                            <span class="clearfix"></span>
                        </article>
                    </section>

                </div>

            )
        })
        return (
            <div>{redirectVar}
            <div class="container">

                <hgroup class="mb20">
                    <h1>Search Results</h1>
                </hgroup>
                {details}
            </div>
            </div>
        )
    }
}
export default SearchResults;