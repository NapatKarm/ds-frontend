import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class LobbyJoinCreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            prompt: ''
        }
    }

    componentDidMount(){
        if(typeof this.props.tempuser === 'string'){
            this.setState({name: this.props.tempuser})
        }
        else{
            this.props.history.push("/")
        }
    }

    checkName=()=>{
        this.props.history.push("/")
        if(this.props.tempuser === ''){
            this.props.history.push("/")
        }
    }

    joinLobby=()=>{
        // this.props.history.push("/lobby")
        console.log("Implementation Underway")
    }

    createLobby= async ()=>{
        await this.props.lobbyCreate(this.props.tempuser);
        this.props.history.push(`/lobby/${this.props.lobbyInfo.lobbyName}`)
    }

    render() {
        return (
            <div>
            {/* <p>{ this.props.tempuser || "" }</p> */}

            {<h1>Welcome {this.state.name}</h1>}
            <p>Join a lobby (Enter Code):</p>
            <input />
            <button onClick={this.joinLobby}>Join Lobby</button>
            <br></br>
            <button onClick={this.createLobby}>Create Lobby</button>

            <div>
                {this.state.prompt}
            </div>

            <p><Link to ="/lobby/:lobbyid">To THIS LOBBY</Link></p>
            <p><Link to ="/">To User Creation!</Link></p>
            </div>
        )
    }
}

export default withRouter(LobbyJoinCreatePage)