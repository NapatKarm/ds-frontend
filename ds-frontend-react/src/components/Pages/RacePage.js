import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Speed from '../speed'

class Racing extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalUserInput: '',
            tempUesrInput: '',
            curUserInput: '',

            textString: '',
            textArr: ["place holder"],
            textArrLength: 0,
            currentLine: 0,

            characters: 0,
            seconds: 0,
            started: false,
            finished: false,
            percentage: 0
        }
    }

    componentDidMount(){
        this.props.socket.on("raceInit", ({prompt, error}) => {
            let replacedPrompt = prompt.replaceAll('|', '')
            this.setState({textString: replacedPrompt, textArr: prompt.split('|'), textArrLength: replacedPrompt.length})
            console.log(prompt.replaceAll('|', ''), "\n", prompt.split('|'))
        })

        this.props.socket.on("updateText", ({playerName, percentage, placement}) => {

        })
    }

    onUserInputChange=(e)=>{
        const inputText = e.target.value;

        let tempInput = this.state.totalUserInput+inputText

        this.setTimer();
        this.setState({curUserInput: inputText, tempUserInput: this.state.totalUserInput+inputText, characters: this.countCorrectCharacters(tempInput)})
    }

    countCorrectCharacters(tempInput){
        const text = this.state.textString.replace(/\s+/g, '');
        let correctChars = tempInput.replace(/\s+/g, '').split('').filter((s, i) => s === text[i]).length;

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

    handleSubmit = (submit) => {
        submit.preventDefault();
        let totalInput = this.state.totalUserInput+this.state.curUserInput
        if(this.state.finished === false && this.state.curUserInput === this.state.textArr[this.state.currentLine]){
            this.setState({curUserInput: '', totalUserInput: totalInput})
            if(this.state.currentLine < this.state.textArr.length-1){
                this.setState({currentLine: this.state.currentLine + 1})
            }
        }
        this.checkIfComplete(totalInput);
        console.log("Completed");
    }

    checkIfComplete(totalInput){
        console.log("TOTAL: ", totalInput)
        if(totalInput === this.state.textString) {
            console.log("Done")
            document.getElementById("textArea").disabled = true;
            clearInterval(this.interval);
            this.setState({finished: true});
        }
    }

    render() {
        return (
            <div>
                <h1>Vroom vroom racing</h1>

                <div>
                    {
                        this.state.textArr[this.state.currentLine].split('').map((s,i) => {
                            let color;
                            if (i < this.state.curUserInput.length){
                                color = s === this.state.curUserInput[i] ? '#00FF00' : '#FF0000';
                            }
                            return <span key={i} style={{backgroundColor: color}}>{s}</span>
                        })
                    }
                </div>

                <div>{this.state.textArr[this.state.currentLine+1]}</div>
                <div>{this.state.textArr[this.state.currentLine+2]}</div>

                <br></br>

                <form onSubmit={this.handleSubmit}>
                    <input tabindex="-1" id="textArea" onChange={this.onUserInputChange} value={this.state.curUserInput}></input>
                </form>

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