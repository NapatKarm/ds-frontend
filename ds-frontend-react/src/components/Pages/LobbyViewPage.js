import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class Lobby extends Component {
    render() {
        return (
            <div>
            <p><Link to ="/racing">START GAME</Link></p>
            <p><Link to ="/creation">Back to Lobby Join/Create</Link></p>
            <p><Link to ="/">Back User Creation</Link></p>
            </div>
        )
    }
}

export default withRouter(Lobby)