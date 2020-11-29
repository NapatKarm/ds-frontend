import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class UserCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          alert: ''
        }
    }

    changeUsername=(event)=>{
        this.setState({username: event.target.value})
    }

    usernameCheck=()=>{
        if(this.state.username === ""){
            this.setState({alert: "This name is empty. Please enter a username."})
        }
        else{
            this.props.userCreation(this.state.username)
            this.props.history.push("/creation");
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome to &lt;INSERT TITLE HERE&gt;</h1>
                <br></br>
                <h3>Enter a username: </h3>
                <input onChange={this.changeUsername}/>
                <button onClick={this.usernameCheck}>Enter</button>
                <div>
                    {this.state.alert}
                </div>
            </div>
        )
    }
}

export default withRouter(UserCreation)