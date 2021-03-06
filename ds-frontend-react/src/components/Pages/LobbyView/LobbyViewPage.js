import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UsersTable from './LobbyUsersTable'
import './LobbyViewPage.css';
import Button from '@material-ui/core/Button';


class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lobbyLeader: false,
            lobbyName: "",
            lobbyUsers: [],
            loading: true,

        }
    }
    componentDidMount() {
        this.props.socket.on('kicked', ({ playerName }) => {
            console.log(playerName, " was KICKED")
            if (playerName !== undefined) {
                if (playerName === this.props.tempuser) {
                    alert("You have been kicked! :(");
                    this.props.lobbyLeave();
                    this.props.resetPrompt();
                    this.props.history.push(`/creation`);
                }
            }
        })
        this.props.socket.on("lobbyUpdate", ({ error, users }) => {
            if (users !== undefined) {
                this.setState({
                    lobbyLeader: (users[0].username === this.props.tempuser)
                })
                if(this.props.history.location.pathname!="/creation")
                {
                    this.props.lobbyUpdate(users);
                }
            }
            if (error !== undefined) {
                this.props.lobbyLeave();
                this.props.history.push("/creation");
            }
        })
        this.props.socket.on('raceInit', ({ prompt, error }) => {
            if (prompt !== undefined) {
                this.props.parsePrompt(prompt);
                this.props.history.push(`/lobby/${this.state.lobbyName}/racing`);
            }
        })
        this.setState({
            lobbyName: this.props.lobbyInfo,
            lobbyUsers: this.props.lobbyUsers,
            loading: false
        }, () => {
            if (this.state.lobbyUsers.length > 0) {
                this.setState({
                    lobbyLeader: (this.state.lobbyUsers[0].username === this.props.tempuser)
                })
            }
        })

    }
    leavingLobby = () => {
        this.props.socket.emit('leaveLobby', { lobbyCode: this.props.lobbyInfo });
        this.props.lobbyLeave();
        this.props.history.push("/creation");
    }
    toggleReady = () => {
        this.props.socket.emit('toggleReady', { lobbyCode: this.props.lobbyInfo })
    }
    startGameCheck = () => {
        let startCondition = true;
        for (let i = 0; i < this.props.lobbyUsers.length; i++) {
            if (this.props.lobbyUsers[i].ready === false) {
                startCondition = false;
                break;
            }
        }
        if (startCondition) {
            this.props.socket.emit('startGame', { lobbyCode: this.state.lobbyName })

        }
        else {
            alert("Not all players are ready!")
        }
    }
    handleClose = () => {
        this.setState({ending:false});
      };
    render() {
        return (
            <div className="viewPageV">
                <div className="wrapBoxBGV">
                    <div className="wrapBoxV">
                        <div className="logoBoxV">
                            <div>Lobby ID: {this.state.lobbyName}</div>
                            <div>
                                <Button className="colButtonDSV" variant="contained" onClick={this.leavingLobby} disableElevation>
                                    Leave Lobby
                                </Button>
                                <Button className="colButtonDSV" variant="contained" onClick={this.toggleReady} disableElevation>
                                    Ready Up
                                </Button>
                                {this.state.lobbyLeader ?
                                    <Button className="colButtonDSVGG" variant="contained" onClick={this.startGameCheck} disableElevation>
                                        Start Game
                                    </Button>
                                    :
                                    <Button className="colButtonDSVDD" variant="contained" disableElevation disabled>
                                        Start Game
                                    </Button>
                                }

                            </div>

                        </div>
                        <div className="bigBoxCreateV">
                            <div className="smallBoxLeftV">
                                <h1 className="headingTitleV">TIP#1424: </h1>
                                <span className="botTextLV">If it seems like you're losing,<br />pressing ALT+F4 increases your WPM by 50!</span>

                            </div>
                            <div className="smallBoxRightV">
                                <UsersTable lobbyName={this.props.lobbyInfo} tempuser={this.props.tempuser} users={this.props.lobbyUsers} socket={this.props.socket} lobbyLeader={this.state.lobbyLeader} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Lobby)