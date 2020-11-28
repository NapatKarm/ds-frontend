import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class Racing extends Component {
    render() {
        return (
            <div>
            <p><Link to ="/">Back to Home</Link></p>
            <p><Link to ="lobby">Back to lobby</Link></p>
            <p>Vroom vroom racing</p>
            </div>
        )
    }
}

export default withRouter(Racing)