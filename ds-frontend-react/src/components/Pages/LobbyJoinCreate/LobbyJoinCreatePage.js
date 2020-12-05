import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import reCodeLogo from '../../../images/ReCodeGPC.png'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './LobbyJoinCreatePage.css';

const colButton = createMuiTheme({
    palette: {
        primary: {
            main: "#FFFFFF"
        }
    },
});

class LobbyJoinCreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        if (typeof this.props.tempuser === 'string') {
            this.setState({ name: this.props.tempuser })
        }
        else {
            this.props.history.push("/")
        }
    }
    deleteUser = () => {
        this.props.userChange(this.state.name);
        this.props.history.push("/");
    }
    checkName = () => {
        this.props.history.push("/")
        if (this.props.tempuser === '') {
            this.props.history.push("/")
        }
    }
    joinLobby = () => {
        // this.props.history.push("/lobby")
        console.log("Implementation Underway")
        //this.props.socket.emit('joinLobby',{lobbyCode:x, username: this.props.tempuser})
    }

    createLobby = async () => {
        alert("FLASH BANG");
        await this.props.lobbyCreate(this.props.tempuser);
        this.props.socket.emit('createLobby', {username: this.props.tempuser})

        this.props.history.push(`/lobby/${this.props.lobbyInfo.lobbyName}`)
    }

    render() {
        return (
            <div className="createPage">
                <div className="wrapBoxBG">
                <div className="wrapBox">
                    <div className="logoBox">
                        <img className="logoCreate" src={reCodeLogo} alt="Logo" />
        <div>USER: {this.state.name}</div>
                    </div>
                    <div className="bigBoxCreate">
                        <div className="smallBoxLeft">
                            <h1 className="headingTitle">CHALLENGE AND<br/>CONQUER</h1>
                                <p className="botTextL">Buncha text oh lol someone who want eat chicken sometimes <br/>I want some chipotle too but you know sometimes corona yeah <br/>lol it be like that sometimes.</p>

                        </div>
                        <div className="smallBoxRight">
                        <ThemeProvider theme={colButton}>
                            <Button className="colButtonDS" variant="contained" onClick={this.joinLobby}disableElevation>Join Lobby</Button>
                            <Button className="colButtonDS" variant="contained" onClick={this.createLobby}disableElevation>Create Lobby</Button>
                            <Button className="colButtonDS" variant="contained" onClick={this.deleteUser}disableElevation>Change Username</Button>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
                </div>
                <div>
                    {/*Bottom Content */}
                </div>
            </div>
        )
    }
}

export default withRouter(LobbyJoinCreatePage)