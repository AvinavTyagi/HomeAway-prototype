import React, { Component } from 'react';
import '../../propertyDetails.css';
import '../../search.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class PropertyDetail extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            booked: false,
            property: this.props.location.state.propertyDetails,
            propertyID: '',
            owner: '',
            toDate: '',
            fromDate: '',
            user: '',
            fields: {},//validation
            errors: {}//validation
        }
        this.user = React.createRef();
        this.propertyID = React.createRef();
        this.owner = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.fromDateHandler = this.fromDateHandler.bind(this);
        this.toDateHandler = this.toDateHandler.bind(this);
        this.toDateHandler = this.toDateHandler.bind(this);

    }
    componentDidMount() {
        this.setState({
            booked: false
        })
    }
    fromDateHandler(field,e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        this.setState({
            fromDate: e.target.value
        })
    }
    toDateHandler(field,e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        this.setState({
            toDate: e.target.value
        })
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["fromDate"]) {
            formIsValid = false;
            errors["fromDate"] = "Cannot be empty";
        }
        if (!fields["toDate"]) {
            formIsValid = false;
            errors["toDate"] = "Cannot be empty";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }
    handleClick = (e) => {
        const data = {
            propertyID: this.propertyID.current.value,
            user: this.user.current.value,
            owner: this.owner.current.value,
            toDate: this.state.toDate,
            fromDate: this.state.fromDate
        }
        axios.defaults.withCredentials = true;
        if (!this.handleValidation()) {
            console.log("Please rectify the validation errors in the form");

        } else {
        axios.post('http://localhost:3001/addBooking', data)
            .then(response => {
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    this.setState({
                        booked: true
                    })
                } else if (response.status === 400) {
                    this.setState({
                        booked: false
                    })
                }
            });
        }

    }

    render() {
        var redirectVar = null;
        var user = cookie.load('cookie');
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/ownerLogin" />
        }
        else if (this.state.booked) {
            redirectVar = <Redirect to={{
                pathname: '/'
                // state: { propertyDetails: this.state.details }
            }} />
        }
        let details = this.state.property.map(p => {
            return (
                <div class="container">
                    <div class="card">
                        <div class="container-fliud">
                            <div class="wrapper row">
                                <div class="preview col-md-6">

                                    <div class="preview-pic tab-content">
                                        <div class="tab-pane active" id="pic-1"><img src="http://placekitten.com/400/252" /></div>
                                        <div class="tab-pane" id="pic-2"><img src="http://placekitten.com/400/252" /></div>
                                        <div class="tab-pane" id="pic-3"><img src="http://placekitten.com/400/252" /></div>
                                        <div class="tab-pane" id="pic-4"><img src="http://placekitten.com/400/252" /></div>
                                        <div class="tab-pane" id="pic-5"><img src="http://placekitten.com/400/252" /></div>
                                    </div>
                                    <ul class="preview-thumbnail nav nav-tabs">
                                        <li class="active"><a data-target="#pic-1" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                                        <li><a data-target="#pic-2" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                                        <li><a data-target="#pic-3" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                                        <li><a data-target="#pic-4" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                                        <li><a data-target="#pic-5" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                                    </ul>

                                </div>
                                <div class="details col-md-6">
                                    <h3 class="product-title">{p.headline}</h3>
                                    <p class="product-description">{p.description}</p>
                                    <p ><span><i class="glyphicon glyphicon-bed"></i>{p.bedroom}BR {p.type}</span></p>
                                    <p ><span><i class="glyphicon glyphicon-tint"></i>{p.bathroom}Bath </span></p>

                                    <p><span><i class="glyphicon glyphicon-flash"></i>{p.currency}{p.base} per night!  </span> <span></span></p>

                                    <p><span><i class="glyphicon glyphicon-map-marker"></i>{p.street}  </span> <span></span></p>

                                    <form role="form" class="js-profile-form">
                                        <div class="row form-group ">
                                            <div>
                                                <p>From Date :</p>
                                                <input type="text" refs="fromDate" class="form-control input-lg js-input-field" id="fromDateInput" placeholder="MM/DD/YYYY" value={this.state.fromDate} onChange={this.fromDateHandler.bind(this, "fromDate")}></input>
                                                <span style={{ color: "red" }}>{this.state.errors["fromDate"]}</span>
                                                </div>
                                            <div>
                                                <br />
                                                <p>To Date :</p>
                                                <input type="text" refs="toDate" class="form-control input-lg js-input-field" id="toDateInput" placeholder="MM/DD/YYYY" value={this.state.toDate} onChange={this.toDateHandler.bind(this, "toDate")}></input>
                                                <span style={{ color: "red" }}>{this.state.errors["toDate"]}</span>
                                                </div><br />
                                            <input type="hidden" value={p.id} name="propertyID" ref={this.propertyID} />
                                            <input type="hidden" value={p.owner} name="owner" ref={this.owner} />
                                            <input type="hidden" value={user} name="user" ref={this.user} />
                                            <div class="action">
                                                <button class="add-to-cart btn btn-default pull-right" type="button" onClick={this.handleClick}>Book Now</button>
                                            </div>
                                        </div>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>{redirectVar}
                <div class="container">

                    <hgroup class="mb20">
                        <h1>Property</h1>
                    </hgroup>
                    {details}
                </div>
            </div>
        )
    }
}
export default PropertyDetail;