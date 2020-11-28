import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class UserCreation extends Component {
    render() {
        return (
            <p><Link to ="/">To Home</Link></p>
        )
    }
}

export default withRouter(UserCreation)