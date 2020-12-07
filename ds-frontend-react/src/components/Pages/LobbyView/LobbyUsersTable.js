import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';

class UsersTable extends Component {
    state = {
        currentuser:"",
        users: []
    }
    componentDidMount(){
        console.log(this.props.tempuser,this.props.users,"WOW")
        this.setState({
            currentuser: this.props.tempuser,
            users: this.props.users
        })
    }
    render() {
        return (
            <TableContainer component={Paper}>
            <Table aria-label="simple table" size="medium">
                <TableHead>
                    <TableRow style={{backgroundColor:'#212121'}}>
                        <TableCell style={{color:'#fff',fontWeight:'bold'}}>Racers</TableCell>
                        <TableCell align="center" style={{color:'#fff',fontWeight:'bold'}}>Status</TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.users ? (this.state.users.map((user) => (
                        <TableRow key={user.username}>
                            <TableCell component="th" scope="row">
                                {user.username}
                            </TableCell>
                            <TableCell align="center">{user.status ? "Ready!" : "Not Ready..."}</TableCell>
                            <TableCell align="center" style={{color:'#28a745',fontWeight:'bold'}}>{user.username === this.state.currentuser ? "You" : ""}</TableCell>
                        </TableRow>
                    ))):<div style={{justifyContent:"center", padding:"100px"}}><CircularProgress /></div>}
                </TableBody>
            </Table>
        </TableContainer>            
        )
    }
}

export default UsersTable;