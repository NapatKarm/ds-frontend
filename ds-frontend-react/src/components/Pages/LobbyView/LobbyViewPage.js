import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import UsersTable from './LobbyUsersTable'
import './LobbyViewPage.css';

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lobbyLeader: false,
            lobbyName: "",
            readyStatus: false,
            lobbyUsers: [],
            loading: true
        }
    }
    componentDidMount() {
        this.setState({
            // lobbyName: this.props.lobbyInfo,
            lobbyName: "TEMP HARDCODE",
            lobbyUsers: [ 
                {
                    username:this.props.tempuser,
                    status: false
                }
            ],
            loading: false
        })
        this.props.socket.on("lobbyUpdate", ({error, users}) => {
            // let {username, ready, leader} = users[0]
        }) 
    }
    leavingLobby = () => {
        console.log("SENDING LEAVING SIGNALS TO BACKEND");
        //this.props.socket.emit('leaveLobby',{lobbyCode: x})
        this.props.history.push("/creation")
    }
    toggleReady = () => {
        //this.props.socket.emit('toggleReady', {lobbyCode: x})
    }

    // kickPlayer = () => {
    //     this.props.socket.emit('kickPlayer', {lobbyCode: x, playerName: kickedPlayer})
    // }
    
    startGame = () => {
        //this.props.socket.emit('startGame', {lobbyCode: x})
    }

    render() {
        return (
            <div className="viewPageV">
                <div className="wrapBoxBGV">
                    <div className="wrapBoxV">
                        <div className="logoBoxV">
                            <div>Lobby ID: </div>
                        </div>
                        <div className="bigBoxCreateV">
                            <div className="smallBoxLeftV">
                                <h1 className="headingTitleV">CHALLENGE AND<br />CONQUER</h1>
                                <p className="botTextLV">Buncha text oh lol someone who want eat chicken sometimes <br />I want some chipotle too but you know sometimes corona yeah <br />lol it be like that sometimes.</p>

                            </div>
                            <div className="smallBoxRightV">
                                {/* <ThemeProvider theme={colButton}>
                                    <Button className="colButtonDS" variant="contained" onClick={this.openUp} disableElevation>Join Lobby</Button>
                                    <Button className="colButtonDS" variant="contained" onClick={this.createLobby} disableElevation>Create Lobby</Button>
                                    <Button className="colButtonDS" variant="contained" onClick={this.changeUser} disableElevation>Change Username</Button>
                                </ThemeProvider> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        )
    }
}
export default withRouter(Lobby)