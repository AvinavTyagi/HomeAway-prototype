import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';

class Calculator extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            displayString: ["Press = to evaluate"]
        }
        this.inputStringChangeHandler = this.inputStringChangeHandler.bind(this);

    }
    inputStringChangeHandler = (field, e) => {
        this.setState({
            displayString: e.target.value
        });
    }
    handleClick = e => {
        const value = e.target.value
        const data = {
            displayString: this.state.displayString
        }
        axios.defaults.withCredentials = true;
        switch (value) {
            case 'clear':
                this.setState({
                    displayString: ["Press = to evaluate"]
                })
                break
            case 'equal':
                axios.post('http://localhost:3001/validate', data)
                    .then(response => {
                        console.log("Status Code : ", response.status)
                        console.log("After post call " + response.data);

                        this.setState({
                            displayString: "= " + response.data
                        })
                    });
                break
        }

    }

    render() {
        return (
            <div>
                <h2 class="text-center">Calculator</h2>
                <div class="calculator">

                    <input id="display" type="text" refs="inputString" onChange={this.inputStringChangeHandler.bind(this, "inputString")} />

                    <div class="display"> {this.state.displayString} </div>


                    <div class="calculator-buttons">

                        <button id="clrBtn" onClick={this.handleClick} label="C" value="clear" class="calc-button is-clear">Clear</button>
                        <button id="eqBtn" class="calc-button is-equals" onClick={this.handleClick} label="=" value="equal">=</button>
                    </div>
                </div>
            </div>
        )
    }
}
//export Calculator Component
export default Calculator;