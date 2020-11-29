import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {userCreationThunk} from "../../store/utilities/tempuser";

//Page Imports
import UserCreation from '../Pages/UserCreationPage';
import LobbyJoinCreatePage from '../Pages/LobbyJoinCreatePage';
import LobbyPage from '../Pages/LobbyViewPage';
import RacePage from '../Pages/RacePage';


class RoutesView extends Component {
    render () {
        const {userCreated}=this.props
        const UserCreationComponent = () => (<UserCreation userCreation={ this.props.userCreation }/>)
        const LobbyJoinCreateCompenent = () => (<LobbyJoinCreatePage tempuser={ this.props.tempuser }/>)
        const LobbyComponent = () => (<LobbyPage/>)
        const RaceComponent = () => (<RacePage/>)
        return (
        <Router>
            <Switch>
                <Route exact path="/" render={UserCreationComponent} />
                {   userCreated && (
                        <Switch>
                            <Route exact path="/creation" render={LobbyJoinCreateCompenent} />
                            <Route exact path="/lobby" render={LobbyComponent} />
                            <Route exact path="/racing" render={RaceComponent} />
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
        userCreated: !!state.tempuser
    }
}

const mapDispatch = (dispatch) => {
    return {
        userCreation: (userinfo) => dispatch(userCreationThunk(userinfo))
    }
}

export default connect(mapState, mapDispatch)(RoutesView);