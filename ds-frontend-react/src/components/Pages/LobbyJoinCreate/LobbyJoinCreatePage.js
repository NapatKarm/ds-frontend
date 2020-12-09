import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import reCodeLogo from '../../../images/ReCodeGPC.png'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './LobbyJoinCreatePage.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
            name: '',
            openBool: false,
            lobbyIDChoice: "",
            joinError: "",
        }
    }

    componentDidMount() {
        this.props.socket.on("lobbyUpdate", ({ error, users }) => {
            if(error!==undefined) this.setState({joinError:error});
            if(users!==undefined) {
                if(this.props.lobbyInfo===undefined)
                {
                    this.props.lobbyUpdate(users)
                    this.props.history.push(`/lobby/${users[0].lobbyCode}`);
                }
            }
        })
        if (typeof this.props.tempuser === 'string') {
            this.setState({ name: this.props.tempuser })
        }
        else {
            this.props.history.push("/")
        }
    }
    // componentDidUpdate() {
    //     if (this.props.lobbyInfo !== undefined) {
    //         this.props.history.push(`/lobby/${this.props.lobbyInfo}`);
    //     }
    // }
    changeUser = () => {
        this.props.userChange(this.state.name);
        this.props.history.push("/");
    }
    handleIDChange = (event) => {
        this.setState({ lobbyIDChoice: event.target.value })
    }
    joinLobby = (event) => {
        event.preventDefault()
        if (this.state.lobbyIDChoice.length === 6) {
            this.props.socket.emit('joinLobby', { lobbyCode: this.state.lobbyIDChoice, username: this.props.tempuser })
            document.getElementById('lobbyIDInput').value = '';
            if(this.props.lobbyInfo!=undefined) {
                this.props.history.push(`/lobby/${this.props.lobbyInfo}`)
            }
        }
        else this.setState({ joinError: "Lobby ID must be 6 digits." })

    }

    createLobby = () => {
        // this.props.lobbyCreate(this.props.tempuser);
        this.props.socket.emit('createLobby', { username: this.props.tempuser })
        this.props.socket.on("lobbyUpdate", ({ error, users }) => {
            if(error!==undefined) this.setState({joinError:error});
            if(users!==undefined) {
                if(this.props.lobbyInfo===undefined) {
                    this.props.lobbyUpdate(users)
                    this.props.history.push(`/lobby/${users[0].lobbyCode}`);
                }
            }
        })
    }
    openUp = () => {
        this.setState({ openBool: true })
    }
    closeUp = () => {
        this.setState({ openBool: false })
    }
    maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }
    render() {
        return (
            <div className="createPage">
                <div className="wrapBoxBG">
                    <div className="wrapBox">
                        <div className="logoBox">
                            <img className="logoCreate" src={reCodeLogo} alt="Logo" />
                            <div>USER# [ {this.state.name} ]</div>
                        </div>
                        <div className="bigBoxCreate">
                            <div className="smallBoxLeft">
                                <h1 className="headingTitle">Cod·ing<br /></h1>
                                <h2 className="semiHeading">/ˈkōdiNG/</h2>
                                <p className="botTextL">
                                    1. the process of assigning a code to something for classification or identification.
                                    <br/><br/>
                                    2. the process or activity of writing computer programs.</p>

                            </div>
                            <div className="smallBoxRight">
                                <ThemeProvider theme={colButton}>
                                    <Button className="colButtonDS" variant="contained" onClick={this.openUp} disableElevation>Join Lobby</Button>
                                    <Button className="colButtonDS" variant="contained" onClick={this.createLobby} disableElevation>Create Lobby</Button>
                                    <Button className="colButtonDS" variant="contained" onClick={this.changeUser} disableElevation>Change Username</Button>
                                </ThemeProvider>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog
                        open={this.state.openBool}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.closeUp}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Enter Lobby ID"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Enter the 6 digits unique Lobby ID from your friend/foe.
        <div className="errorMSG">{this.state.joinError? `${this.state.joinError}`:""}</div>
                    </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <form onSubmit={this.joinLobby}>
                                <input id="lobbyIDInput" maxLength="6" onInput={this.maxLengthCheck} onChange={this.handleIDChange} />
                            </form>
                            <Button onClick={this.joinLobby} color="primary">
                                Enter
                    </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

export default withRouter(LobbyJoinCreatePage)