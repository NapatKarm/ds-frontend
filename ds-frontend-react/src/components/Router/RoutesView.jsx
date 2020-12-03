import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {userCreationThunk} from "../../store/utilities/tempuser";
import { lobbyJoinThunk, lobbyUpdateThunk, lobbyCreateThunk } from "../../store/utilities/lobbyinfo"
import socket from '../socket'; 

//Page Imports
import UserCreation from '../Pages/UserCreation/UserCreationPage';
import LobbyJoinCreatePage from '../Pages/LobbyJoinCreatePage';
import LobbyPage from '../Pages/LobbyView/LobbyViewPage';
import RacePage from '../Pages/RacePage';


class RoutesView extends Component {
    render () {
        const {userCreated}=this.props
        const UserCreationComponent = () => (<UserCreation userCreation={ this.props.userCreation }/>)
        const LobbyJoinCreateCompenent = () => (<LobbyJoinCreatePage tempuser={ this.props.tempuser } lobbyJoin={this.props.lobbyJoin} lobbyCreate={this.props.lobbyCreate} lobbyInfo={this.props.lobbyInfo}/>)
        const LobbyComponent = () => (<LobbyPage lobbyInfo={this.props.lobbyInfo} lobbyUpdate={this.props.lobbyUpdate} tempuser={this.props.tempuser} socket={socket}/>)
        const RaceComponent = () => (<RacePage/>)
        return (
        <Router>
            <Switch>
                <Route exact path="/" render={UserCreationComponent} />
                {   userCreated && (
                        <Switch>
                            <Route exact path="/creation" render={LobbyJoinCreateCompenent} />
                            <Route exact path="/lobby/:lobbyid" render={LobbyComponent} />
                            <Route exact path="/lobby/:lobbyid/racing" render={RaceComponent} />
                        </Switch>
                    )
                }   
                <Route render={UserCreationComponent} />
            </Switch>
        </Router>
        )
    }
}

const mapState = (state) => {
    return {
        tempuser: state.tempuser,
        userCreated: !!state.tempuser,
        lobbyInfo: state.lobbyinfo
    }
}

const mapDispatch = (dispatch) => {
    return {
        userCreation: (userinfo) => dispatch(userCreationThunk(userinfo)),
        lobbyJoin: (tempuser, lobbyID) => dispatch(lobbyJoinThunk(tempuser, lobbyID)),
        lobbyUpdate: (tempuser, lobbyID) => dispatch(lobbyUpdateThunk(tempuser,lobbyID)),
        lobbyCreate: (tempuser) => dispatch(lobbyCreateThunk(tempuser))
    }
}

export default connect(mapState, mapDispatch)(RoutesView);