import React, { Component } from 'react';
import '../../search.css';
import axios from 'axios';
import { Field, reduxForm } from "redux-form";
import { createProperty } from "../../actions/propertyActions";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import _ from "lodash";

class SearchResults extends Component {
    renderProperties() {
        const { handleSubmit } = this.props;
        return _.map(this.props.properties, property => {
            return (
                
                    <div >
                        <section class="col-xs-12 col-sm-6 col-md-12 pop_box_div" id="resultSection" key={property._id}>
                            <article class="search-result row">
                                <div class="col-xs-12 col-sm-12 col-md-3">
                                    <a href="#" title="" class="thumbnail"><img id="resultImage" src="https://images.pexels.com/photos/1459103/pexels-photo-1459103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Lorem ipsum" /></a>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-8 excerpet">
                                    <h3><a href={'http://localhost:3000/propertyDetails/' + property._id} title={property.headline}>{property.headline}</a></h3>
                                    <p>{property.description}</p>
                                    <ul class="meta-search">
                                        <li><span><i class="glyphicon glyphicon-bed"></i>{property.bedroom}BR {property.type}</span></li>
                                        <li><span><i class="glyphicon glyphicon-tint"></i>{property.bathroom}Bath </span></li>
                                        <li><span><i class="glyphicon glyphicon-flash"></i>{property.currency}{property.base} per night!  </span>
                                            <span ><input type="hidden" class="form-control" name="ID" value={property._id} /></span></li>
                                    </ul>
                                    {/* <span class="plus"><a href="#" title="Lorem ipsum"><i class="glyphicon glyphicon-plus"></i></a></span> */}
                                    {/* <span onClick={this.handleClick.bind(this, result.id)} ><input type="hidden" class="form-control" name="ID" value={result.id} />
                                    <button class="btn btn-success" type="submit">View</button></span> */}
                                </div>
                                <span class="clearfix"></span>
                            </article>
                        </section>

                    </div>
            );
        });
    }
    onSubmit = (val, e) => {
        const data = {
            ID: val
        }
        //console.log(e.target.value);
        axios.defaults.withCredentials = true;
        // axios.post('http://localhost:3001/loadProperty', data)
        //     .then(response => {
        //         console.log("Status Code : ", response.data);
        //         if (response.status === 200) {
        //             this.setState({
        //                 details: response.data,
        //                 getDetails: true
        //             })
        //         } else if (response.status === 400) {
        //             this.setState({
        //                 getDetails: false
        //             })
        //         }
        //     });

    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <div class="container">

                    <hgroup class="mb20">
                        <h1>Search Results</h1>
                    </hgroup>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    {/* {details} */}
                    {this.renderProperties()}
                    </form>
                </div>
            </div>
        )
    }
}
//export default SearchResults;
const mapStateToProps = state => ({
    properties: state.property.properties,
    errors: state.errors
});
export default reduxForm({
    //validate,
    //   form: "NewBookForm"
    form: "propertyForm"
})(connect(mapStateToProps, { createProperty })(withRouter(SearchResults)));