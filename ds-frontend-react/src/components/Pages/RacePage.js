import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

import Textblock from '../../store/utilities/Textblock'

class Racing extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            userInput: ''
        }
    }

    _handleKey(event){
        if(event.key.length === 1)
            console.log(event.key);
    }

    componentDidMount(){
        this.generateText()
        document.addEventListener("keyup", this._handleKey)
    }

    componentWillUnmount(){
        document.removeEventListener("keyup", this._handleKey)
    }

    generateText=()=>{
        this.setState({text: "Commodo aute ipsum elit pariatur in officia magna esse exercitation laboris labore anim irure velit. Tempor eiusmod ut veniam id minim consequat. Dolor dolor anim sint ex non nulla officia magna ullamco est in. Amet sit quis fugiat adipisicing fugiat ullamco cillum exercitation."})
    }

    onUserInputChange=(e)=>{
        this.setState({userInput: e.target.value})
    }

    render() {
        return (
            <div>
                <h1>Vroom vroom racing</h1>

                <Textblock text={this.state.text} userInput={this.state.userInput}/>

                <br></br>

                <textarea
                    value={this.state.userInput}
                    onChange={this.onUserInputChange}
                    placeholder="Type Here"
                ></textarea>

                <p><Link to ="/">Back to User Creation</Link></p>
                <p><Link to ="/lobby/:lobbyid">Back to Lobby</Link></p>
            </div>
        )
    }
}

export default withRouter(Racing)