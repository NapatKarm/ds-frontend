import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {userCreationThunk, userChangeThunk} from "../../store/utilities/tempuser";
import { lobbyUpdateThunk, lobbyLeaveThunk } from "../../store/utilities/lobbyinfo";
import { parsePromptThunk, resetPromptThunk } from "../../store/utilities/promptinfo";
import socket from '../socket'; 

//Page Imports
import UserCreation from '../Pages/UserCreation/UserCreationPage';
import LobbyJoinCreatePage from '../Pages/LobbyJoinCreate/LobbyJoinCreatePage';
import LobbyPage from '../Pages/LobbyView/LobbyViewPage';
import RacePage from '../Pages/Race/RacePage';


class RoutesView extends Component {
    render () {
        const {userCreated}=this.props
        const UserCreationComponent = () => (<UserCreation socket={socket} userCreation={ this.props.userCreation } userCreated={this.props.userCreated} errorCode={this.props.errorCode}/>)
        const LobbyJoinCreateCompenent = () => (<LobbyJoinCreatePage tempuser={ this.props.tempuser } lobbyUpdate={this.props.lobbyUpdate} lobbyInfo={this.props.lobbyInfo} userChange={this.props.userChange}socket={socket}/>)
        const LobbyComponent = () => (<LobbyPage resetPrompt={this.props.resetPrompt} lobbyInfo={this.props.lobbyInfo} tempuser={this.props.tempuser} lobbyUpdate={this.props.lobbyUpdate} lobbyUsers={this.props.lobbyUsers} lobbyLeave={this.props.lobbyLeave} parsePrompt={this.props.parsePrompt} socket={socket}/>)
        const RaceComponent = () => (<RacePage prompt={this.props.prompt} lobbyInfo={this.props.lobbyInfo} socket={socket}/>)
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
        tempuser: state.tempuser.Username,
        userCreated: !!state.tempuser.Username,
        errorCode: state.tempuser.ErrorCode,
        lobbyInfo: state.lobbyinfo.lobbyName,
        lobbyUsers: state.lobbyinfo.users,
        lobbyError: state.lobbyinfo.error,
        prompt: state.promptinfo
    }
}

const mapDispatch = (dispatch) => {
    return {
        userCreation: (userinfo) => dispatch(userCreationThunk(userinfo)),
        lobbyUpdate: (users) => dispatch(lobbyUpdateThunk(users)),
        userChange: (tempuser) => dispatch(userChangeThunk(tempuser)),
        lobbyLeave: () => dispatch(lobbyLeaveThunk()),
        parsePrompt: (prompt) => dispatch(parsePromptThunk(prompt)),
        resetPrompt: () => dispatch(resetPromptThunk())
    }
}

export default connect(mapState, mapDispatch)(RoutesView);