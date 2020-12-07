import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StarsIcon from '@material-ui/icons/Stars';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green,red,cyan } from '@material-ui/core/colors';

class UsersTable extends Component {
    componentDidMount(){
        console.log(this.props.users,this.props.tempuser,"Mounted info table")
    }
    kickPlayer = (thisUser) => {
        console.log()
        this.props.socket.emit('kickPlayer', {lobbyCode: this.props.lobbyName, playerName: thisUser})
    }
    render() {
        return (
            <TableContainer component={Paper}>
            <Table aria-label="simple table" size="medium">
                <TableHead>
                    <TableRow style={{backgroundColor:'#212121'}}>
                        <TableCell/>
                        <TableCell align="center" style={{color:'#fff',fontWeight:'bold'}}>Racers</TableCell>
                        <TableCell align="center" style={{color:'#fff',fontWeight:'bold'}}>Status</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.users ? (this.props.users.map((user) => (
                        <TableRow key={user.username}>
                            <TableCell component="th" scope="row" style={{textAlign:"center"}}>
                    {user.leader ? (<StarsIcon fontSize="small" style={{ color: cyan[500]}}/>):("")}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{textAlign:"center"}}>
                    {user.username}{user.username === this.props.tempuser ? " (You)" : ""}
                            </TableCell>
                            <TableCell align="center">{user.ready ? <CheckCircleIcon style={{ color: green[500]}} fontSize="small"/> : <CancelIcon style={{ color: red[500]}} fontSize="small"/>}</TableCell>
                    <TableCell align="center">
                    {user.username === this.props.tempuser ? "" : <Button onClick={()=>this.kickPlayer(user.username)}>Kick</Button>}
                    </TableCell>
                        </TableRow>
                    ))):(
                        <TableRow key="loading">
                            <TableCell/>
                            <TableCell component="th" scope="row" style={{textAlign:"center"}}>
                            <div style={{justifyContent:"center", padding:"30px"}}><CircularProgress fontSize="small"/></div>
                            </TableCell>
                            <TableCell component="th" scope="row" style={{textAlign:"center"}}>
                                Loading Data...
                            </TableCell>
                        </TableRow>
                    
                    )}
                </TableBody>
            </Table>
        </TableContainer>            
        )
    }
}

export default UsersTable;