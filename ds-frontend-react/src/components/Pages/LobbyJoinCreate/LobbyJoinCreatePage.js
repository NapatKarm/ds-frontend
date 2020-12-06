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
            lobbyIDChoice: ""
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
    changeUser = () => {
        this.props.userChange(this.state.name);
        this.props.history.push("/");
    }
    checkName = () => {
        this.props.history.push("/")
        if (this.props.tempuser === '') {
            this.props.history.push("/")
        }
    }
    handleIDChange = (event) => {
        this.setState({lobbyIDChoice:event.value})
    }
    joinLobby = (event) => {
        event.preventDefault()
        // this.props.history.push("/lobby")
        console.log("Implementation Underway")
        this.props.socket.emit('joinLobby',{lobbyCode:this.state.lobbyIDChoice, username: this.props.tempuser})
    }

    createLobby = async () => {
        alert("FLASH BANG");
        await this.props.lobbyCreate(this.props.tempuser);
        this.props.socket.emit('createLobby', {username: this.props.tempuser})

        this.props.history.push(`/lobby/${this.props.lobbyInfo.lobbyName}`)
    }
    openUp = () => {
        this.setState({openBool:true})
    }
    closeUp = () => {
        this.setState({openBool:false})
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
        <div>USER: {this.state.name}</div>
                    </div>
                    <div className="bigBoxCreate">
                        <div className="smallBoxLeft">
                            <h1 className="headingTitle">CHALLENGE AND<br/>CONQUER</h1>
                                <p className="botTextL">Buncha text oh lol someone who want eat chicken sometimes <br/>I want some chipotle too but you know sometimes corona yeah <br/>lol it be like that sometimes.</p>

                        </div>
                        <div className="smallBoxRight">
                        <ThemeProvider theme={colButton}>
                            <Button className="colButtonDS" variant="contained" onClick={this.openUp}disableElevation>Join Lobby</Button>
                            <Button className="colButtonDS" variant="contained" onClick={this.createLobby}disableElevation>Create Lobby</Button>
                            <Button className="colButtonDS" variant="contained" onClick={this.changeUser}disableElevation>Change Username</Button>
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
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <form onSubmit={this.joinLobby}>
                    <input maxLength = "6" onInput={this.maxLengthCheck} onChange={this.handleIDChange} />
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