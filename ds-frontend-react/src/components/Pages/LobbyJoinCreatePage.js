import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class LobbyJoinCreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcome: '',
            prompt: ''
        }
    }

    welcomeUser=()=>{
        this.setState({welcome: "Welcome "})
    }

    joinLobby=()=>{
        this.props.history.push("/lobby")
    }

    createLobby=()=>{
        this.setState({prompt: "PLACEHOLDER: Lobby Created"})
    }

    render() {
        return (
            <div>
            {/* <p>{ this.props.tempuser || "" }</p> */}
            {console.log(this.props.tempuser)}
            <h1>Welcome {this.props.tempuser}</h1>
            <div>
                {this.state.welcome}
            </div>

            <p>Join a lobby (Enter Code):</p>
            <input />
            <button onClick={this.joinLobby}>Join Lobby</button>
            <br></br>
            <button onClick={this.createLobby}>Create Lobby</button>

            <div>
                {this.state.prompt}
            </div>

            <p><Link to ="/lobby">To THIS LOBBY</Link></p>
            <p><Link to ="/">To User Creation!</Link></p>
            </div>
        )
    }
}

export default withRouter(LobbyJoinCreatePage)