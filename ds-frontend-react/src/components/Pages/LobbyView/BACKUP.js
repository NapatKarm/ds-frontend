// import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import UsersTable from './LobbyUsersTable'
// import Grid from '@material-ui/core/Grid';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
// import AlarmOnIcon from '@material-ui/icons/AlarmOn';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';
// import './LobbyViewPage.css';
// const readyButton = createMuiTheme({
//     palette: {
//         primary: green,
//     },
// });

// class Lobby extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             lobbyLeader: false,
//             lobbyName: "",
//             readyStatus: false,
//             lobbyUsers: [],
//             loading: true
//         }
//     }
//     componentDidMount() {
//         this.setState({
//             // lobbyName: this.props.lobbyInfo,
//             lobbyName: "TEMP HARDCODE",
//             lobbyUsers: [ 
//                 {
//                     username:this.props.tempuser,
//                     status: false
//                 }
//             ],
//             loading: false
//         })
//         this.props.socket.on("lobbyUpdate", ({error, users}) => {
//             // let {username, ready, leader} = users[0]
//         }) 
//     }
//     leavingLobby = () => {
//         console.log("SENDING LEAVING SIGNALS TO BACKEND");
//         //this.props.socket.emit('leaveLobby',{lobbyCode: x})
//         this.props.history.push("/creation")
//     }
//     toggleReady = () => {
//         //this.props.socket.emit('toggleReady', {lobbyCode: x})
//     }

//     // kickPlayer = () => {
//     //     this.props.socket.emit('kickPlayer', {lobbyCode: x, playerName: kickedPlayer})
//     // }
    
//     startGame = () => {
//         //this.props.socket.emit('startGame', {lobbyCode: x})
//     }

//     render() {
//         return (
//             <div className="lobbyViewPage">
//                 <div className="topButtonsRow">
//                     {/* <div>
//                         <Button variant="outlined" color="secondary" startIcon={<ExitToAppIcon />} onClick={this.kickPlayer}>
//                             Kick
//                         </Button>
//                     </div> */}

//                     <div>
//                         <Button variant="outlined" color="secondary" startIcon={<ExitToAppIcon />} onClick={this.leavingLobby}>
//                             Leave Lobby
//                             </Button>
//                     </div>
//                     <div>
//                         <ThemeProvider theme={readyButton}>
//                             <Button variant="outlined" color="primary" startIcon={<AlarmOnIcon />} onClick={this.toggleReady}>
//                                 Ready Up
//                             </Button>
//                         </ThemeProvider>
//                     </div>
//                 </div>
//                 <Grid container spacing={3} alignItems="stretch" className="lobbyBox">
//                     <Grid item xs={12} >
//                         <Paper style={{ textAlign: "center", padding: "10px", margin: "auto" }}>
//                             <div style={{ justifyContent: "left" }}>LobbyID: {this.state.lobbyName}</div>
//                             <div></div>
//                         </Paper>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Paper>
//                             <span><Link to="/lobby/:lobbyid/racing" onClick={this.startGame}>START GAME</Link></span>
//                         </Paper>
//                     </Grid>
//                     <Grid item xs={6}>
//                         {/* <Paper>{this.state.loading ? <CircularProgress /> : <UsersTable tempuser={this.props.tempuser} users={this.state.lobbyUsers} />}</Paper> */}
//                     </Grid>
//                 </Grid>
//             </div>
//         )
//     }
// }

// export default withRouter(Lobby)