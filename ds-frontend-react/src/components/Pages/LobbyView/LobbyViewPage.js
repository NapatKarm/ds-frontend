import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import UsersTable from './LobbyUsersTable'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const readyButton = createMuiTheme({
    palette: {
        primary: green,
    },
});

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lobbyName: "",
            readyStatus: false,
            lobbyUsers: [],
            loading: true
        }
    }
    componentDidMount() {
        this.setState({
            lobbyName: this.props.lobbyInfo.lobbyName,
            lobbyUsers: this.props.lobbyInfo.users,
            loading: false
        }, () => {
            console.log("Jeez")
        })
    }
    leavingLobby = () => {
        console.log("SENDING LEAVING SIGNALS TO BACKEND");
        this.props.history.push("/creation")
    }
    render() {
        return (
            <div>
                <div style={{ justifyContent: "space-between", alignItems: "center", display: "flex" }}>
                    <div>
                        <Button variant="outlined" color="secondary" startIcon={<ExitToAppIcon />} onClick={this.leavingLobby}>
                            Leave Lobby
                            </Button>
                    </div>
                    <div>
                        <ThemeProvider theme={readyButton}>

                            <Button variant="outlined" color="primary" startIcon={<AlarmOnIcon />}>
                                Ready Up
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
                <Grid container spacing={3} alignItems="stretch" style={{ backgroundColor: "lightblue", borderRadius: ".25rem", marginTop: "20px" }}>
                    <Grid item xs={12} >
                        <Paper style={{ textAlign: "center", padding: "10px", margin: "auto" }}>
                            <div style={{ justifyContent: "left" }}>Welcome to {this.state.lobbyName} Lobby</div>
                            <div></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <p><Link to="/racing">START GAME</Link></p>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>{this.state.loading ? <CircularProgress /> : <UsersTable tempuser={this.props.tempuser} users={this.state.lobbyUsers} />}</Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withRouter(Lobby)