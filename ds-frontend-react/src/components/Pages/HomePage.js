import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div>
            {/* <p>{ this.props.tempuser || "" }</p> */}
            {console.log(this.props.tempuser)}
            <p><Link to ="/lobby">To THIS LOBBY</Link></p>
            <p><Link to ="/creation">To Creation!</Link></p>
            </div>
        )
    }
}

export default withRouter(HomePage)