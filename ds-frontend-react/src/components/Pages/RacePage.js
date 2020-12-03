import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

import Textblock from '../../store/utilities/Textblock'
import Speed from '../../store/utilities/speed'

class Racing extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            userInput: '',
            characters: 0,
            seconds: 0,
            started: false,
            finished: false
        }
    }

    _handleKey(event){
        if(event.key.length === 1)
            console.log(event.key);
    }

    componentDidMount(){
        this.generateText()
        this.setCharLength()
        document.addEventListener("keyup", this._handleKey)
    }

    componentWillUnmount(){
        document.removeEventListener("keyup", this._handleKey)
    }

    generateText=()=>{
        this.setState({text: "Commodo aute ipsum elit pariatur in officia magna esse exercitation laboris labore anim irure velit. Tempor eiusmod ut veniam id minim consequat. Dolor dolor anim sint ex non nulla officia magna ullamco est in. Amet sit quis fugiat adipisicing fugiat ullamco cillum exercitation."})
    }

    onUserInputChange=(e)=>{
        const inputText = e.target.value;
        this.setTimer();
        this.onFinish(inputText);
        this.setState({userInput: inputText, characters: this.countCorrectCharacters(inputText)})
    }

    onFinish(userInput) {
        if(userInput === this.state.text) {
            clearInterval(this.interval);
            this.setState({finished: true})
        }
    }

    countCorrectCharacters(userInput){
        const text = this.state.text.replace(' ', '');
        return userInput.replace(' ', '').split('').filter((s, i) => s === text[i]).length;
    }

    setTimer(){
        if(!this.state.started){
            this.setState({started: true});
            this.interval = setInterval(() => {
                this.setState(prevProps => {
                    return {seconds: prevProps.seconds + 1}
                })
            }, 1000)
        }
    }

    render() {
        return (
            <div>
                <h1>Vroom vroom racing</h1>

                <Textblock text={this.state.text} userInput={this.state.userInput}/>

                <br></br>

                <textarea
                    onChange={this.onUserInputChange}
                    value={this.state.userInput}
                   
                    placeholder="Type Here"
                ></textarea>

                <Speed seconds={this.state.seconds} characters={this.state.characters}/>

                <p><Link to ="/">Back to User Creation</Link></p>
                <p><Link to ="/lobby/:lobbyid">Back to Lobby</Link></p>
            </div>
        )
    }
}

export default withRouter(Racing)