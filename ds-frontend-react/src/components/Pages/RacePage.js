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
            lastLine: '',

            textString: "test1\ntest2\ntest3\ntest4\ntest5\n",
            textArr: ["test1","test2","test3","test4","test5"],
            textArrLength: 25,
            currentLine: 0,

            characters: 0,
            seconds: 0,
            started: false,
            finished: false,
            percentage: 0
        }
        this.setNextLine = this.setNextLine.bind(this);
    }

    _handleKey(event){
        if(event.key.length === 1){}
            //console.log(event.key);
    }

    setNextLine(event){
        let lastLine = this.state.userInput.substr(this.state.userInput.indexOf("\n", this.state.userInput.length-this.state.textArr[this.state.currentLine].length-1)+1)
        console.log("LastLine: " + lastLine + " Size: " + lastLine.length)
        this.setState({lastLine: lastLine})
        console.log("ArrayCurrentLine: " + this.state.textArr[this.state.currentLine] + " Size: " + lastLine.length)
        if(event.code === "Enter" && lastLine !== this.state.textArr[this.state.currentLine]){
            console.log("ENTERED")
            if(this.state.currentLine < this.state.textArr.length-1){
                this.setState({currentLine: this.state.currentLine + 1})
            }
        }

        this.checkIfComplete()
    }

    componentDidMount(){
        //let prompt = "Commodo aute ipsum elit pariatur in officia magna esse exercitation laboris labore anim irure velit. Tempor eiusmod ut veniam id minim consequat. Dolor dolor anim sint ex non nulla officia magna ullamco est in. Amet sit quis fugiat adipisicing fugiat ullamco cillum exercitation."
        let prompt = this.state.textArr[this.state.currentLine]

        document.addEventListener("keyup", this._handleKey)
        document.addEventListener("keyup", this.setNextLine)

        this.props.socket.on("raceInit", ({text, error}) => {
            
        })

        this.props.socket.on("updateText", ({playerName, percentage, placement}) => {

        })
    }

    componentWillUnmount(){
        document.removeEventListener("keyup", this._handleKey)
        document.removeEventListener("keyup", this.setNextLine)
    }

    checkIfComplete(){
        if(this.state.userInput === this.state.textString) {
            console.log("Done")
            document.getElementById("textArea").disabled = true;
            clearInterval(this.interval);
            this.setState({finished: true})
        }
    }

    onUserInputChange=(e)=>{
        const inputText = e.target.value;

        this.setTimer();
        this.setState({userInput: inputText,characters: this.countCorrectCharacters(inputText)})
    }

    countCorrectCharacters(userInput){
        const text = this.state.textString.replace(/\s+/g, '');
        let correctChars = this.state.userInput.replace(/\s+/g, '').split('').filter((s, i) => s === text[i]).length;

        //if(correctChars/this.state.textArrLength > this.state.percentage)
            //this.props.socket.emit('letterTyped', {lobbyCode: x, percentage: this.state.percentage})
        //console.log(this.state.correctInput)

        this.setState({percentage: correctChars/this.state.textArrLength})
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

    render() {
        return (
            <div>
                <h1>Vroom vroom racing</h1>

                {/* <Textblock text={this.state.textArr[this.state.currentLine]} userInput={this.state.userInput}/> */}

                <div>
                    {
                        this.state.textArr[this.state.currentLine].split('').map((s,i) => {
                            let color;
                            if (i < this.state.lastLine.length){
                                color = s === this.state.lastLine[i] ? '#00FF00' : '#FF0000';
                            }
                            return <span key={i} style={{backgroundColor: color}}>{s}</span>
                        })
                    }
                </div>

                <div>{this.state.textArr[this.state.currentLine+1]}</div>
                <div>{this.state.textArr[this.state.currentLine+2]}</div>

                <br></br>

                <textarea
                    id="textArea"
                    onChange={this.onUserInputChange}
                    value={this.state.userInput}
                    placeholder="Type Here"
                ></textarea>

                <div>{this.state.seconds}s</div>
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