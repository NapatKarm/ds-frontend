import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lobbyInfo: {},
            readyStatus: false
        }
    }
    componentDidMount() {
        this.setState({ lobbyInfo: this.props.lobbyInfo })
    }
    render() {
        console.log(this.state.lobbyInfo, "INFO BB")
        return (
            <div>
                <p> Welcome to {this.state.lobbyInfo.lobbyName ? this.state.lobbyInfo.lobbyName : ""} Lobby</p>
                <p><Link to="/racing">START GAME</Link></p>
                <p><Link to="/creation">Back to Lobby Join/Create</Link></p>
                <table className="Users">
                    <thead>
                        <tr>
                            <td>Users</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lobbyInfo.users ?
                            this.state.lobbyInfo.users.map((user) => (
                                <tr key={user.username}>
                                    <td>
                                        {user.username}
                                    </td>
                                    <td>
                                        {user.status ? "Ready!" : "Not Ready..."}
                                    </td>
                                </tr>
                            )
                            )
                            :
                            ""}
                        <tr>

                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(Lobby)