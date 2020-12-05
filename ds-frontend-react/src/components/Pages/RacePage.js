import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

import Textblock from '../Textblock'
import Speed from '../speed'

class Racing extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            userInput: '',

            textArr: ["test1","test2","test3","test4","test5","test6"],
            textArrLength: 30,
            currentLine: 0,
            lineCompleted: false,


            characters: 0,
            correctInput: 0,
            charLength: 0,
            seconds: 0,
            started: false,
            finished: false,
            percentage: 0
        }
        this.setNextLine = this.setNextLine.bind(this);
    }

    _handleKey(event){
        if(event.key.length === 1)
            console.log(event.key);
    }

    setNextLine(event){
        if(event.code === "Enter")
            this.setState({currentLine: this.state.currentLine + 1})
        
    }

    componentDidMount(){
        let prompt = "Commodo aute ipsum elit pariatur in officia magna esse exercitation laboris labore anim irure velit. Tempor eiusmod ut veniam id minim consequat. Dolor dolor anim sint ex non nulla officia magna ullamco est in. Amet sit quis fugiat adipisicing fugiat ullamco cillum exercitation."
        this.setText(prompt)
        this.setCharLength(prompt)
        document.addEventListener("keyup", this._handleKey)
        document.addEventListener("keyup", this.setNextLine)

        this.props.socket.on("raceInit", ({text, error}) => {

        })

        this.props.socket.on("updateText", ({playerName, percentage, placement}) => {

        })
    }

    componentWillUnmount(){
        document.removeEventListener("keyup", this._handleKey)
    }

    setText=(prompt)=>{
        this.setState({text: prompt})
    }

    setCharLength(prompt){
        this.setState({charLength: prompt.replace(/\s+/g, '').length});
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
        const text = this.state.text.replace(/\s+/g, '');
        let correctChars = userInput.replace(/\s+/g, '').split('').filter((s, i) => s === text[i]).length;
        
        // if(changed positively)
        //     this.props.socket.emit('letterTyped', {lobbyCode: x, percentage: this.state.percentage})
        
        this.setState({percentage: correctChars/this.state.charLength})
        return correctChars;
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

    onCorrectInput(input){        
        return '#00FF00';
    }

    onIncorrectInput(){
        return '#FF0000';
    }

    render() {
        return (
            <div>
                <h1>Vroom vroom racing</h1>

                <Textblock text={this.state.text} userInput={this.state.userInput}/>

                {/* <div>
                    {
                        this.state.text.split('').map((s,i) => {
                            let color;
                            if (i < this.state.userInput.length){
                                color = s === this.state.userInput[i] ? this.onCorrectInput() : this.onIncorrectInput();
                            }
                            return <span key={i} style={{color: color}}>{s}</span>
                        })
                    }
                </div> */}

                <br></br>

                <textarea
                    onChange={this.onUserInputChange}
                    value={this.state.userInput}
                    placeholder="Type Here"
                ></textarea>

                <div>
                    {this.state.textArr[this.state.currentLine]} <br></br>
                    {this.state.textArr[this.state.currentLine+1]} <br></br>
                    {this.state.textArr[this.state.currentLine+2]} <br></br>
                </div>

                <Speed seconds={this.state.seconds} characters={this.state.characters}/>

                <div>
                    {Math.round(this.state.percentage*100)}%
                </div>

                <p><Link to ="/">Back to User Creation</Link></p>
                <p><Link to ="/lobby/:lobbyid">Back to Lobby</Link></p>
            </div>
        )
    }
}

export default withRouter(Racing)