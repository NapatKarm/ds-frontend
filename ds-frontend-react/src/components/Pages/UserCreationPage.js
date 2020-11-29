import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class UserCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          alert: ""
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
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div>
                <input onChange={this.changeUsername}/>
                <button onClick={this.usernameCheck}>Enter</button>
                <div>
                    {this.state.alert}
                </div>
                <p><Link to ="/">To Home</Link></p>
            </div>
        )
    }
}

export default withRouter(UserCreation)