import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {userCreationThunk} from "../../store/utilities/tempuser";

//Page Imports
import UserCreation from '../Pages/UserCreationPage';
import HomePage from '../Pages/HomePage';
import LobbyPage from '../Pages/LobbyViewPage';
import RacePage from '../Pages/RacePage';


class RoutesView extends Component {
    render () {
        const UserCreationComponent = () => (<UserCreation/>)
        const HomeComponent = () => (<HomePage/>)
        const LobbyComponent = () => (<LobbyPage/>)
        const RaceComponent = () => (<RacePage/>)
        return (
        <Router>
            <Switch>
                <Route exact path="/" render={HomeComponent} />
                <Route exact path="/creation" render={UserCreationComponent} />
                <Route exact path="/lobby" render={LobbyComponent} />
                <Route exact path="/racing" render={RaceComponent} />
            </Switch>
        </Router>
        )
    }
}

const mapState = (state) => {
    return {
        tempuser: state.tempuser
    }
}

const mapDispatch = (dispatch) => {
    return {
        userCreation: (userinfo) => dispatch(userCreationThunk(userinfo))
    }
}

export default connect(mapState, mapDispatch)(RoutesView);