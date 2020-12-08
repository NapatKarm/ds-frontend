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

            wpm: 0,
            characters: 0,
            seconds: 0,
            started: false,
            finished: false,
            percentage: 0,
            floorPercentage: 0,
            players: []
        }
    }

    componentDidMount(){
        if(this.props.prompt !== undefined){
            console.log(this.props.prompt)

            this.setState({textString: this.props.prompt.textString, textArr: this.props.prompt.textArr, textArrLength: this.props.prompt.textArrLength})


        }

        this.props.socket.on("updateText", ({users}) => {
            console.log(users);//percentage, placement, playerName
            //this.setState({players: users})
        })

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        console.log("PROMPT", this.props.prompt)
    }

    onUserInputChange=(e)=>{
        const inputText = e.target.value;

        let tempInput = this.state.totalUserInput+inputText
        this.checkIfComplete(tempInput)
        this.setTimer();
        this.setState({curUserInput: inputText, tempUserInput: this.state.totalUserInput+inputText, characters: this.countCorrectCharacters(tempInput)})
    }

    countCorrectCharacters(tempInput){
        const text = this.props.prompt.textString;
        let correctChars = tempInput.split('').filter((s, i) => s === text[i]).length;

        let percent = Math.floor(((correctChars/this.props.prompt.textArrLength)*100))

        if(((correctChars/this.props.prompt.textArrLength)*100) >= this.state.floorPercentage){
            this.setState({floorPercentage: this.state.floorPercentage+1})
            this.props.socket.emit('letterTyped', {lobbyCode: this.props.lobbyInfo, percentage: this.state.floorPercentage, wpm: this.state.wpm})
        }


        this.setState({percentage: correctChars/this.props.prompt.textArrLength})
        return correctChars;
    }

    setTimer(){
        if(!this.state.started){
            this.setState({started: true});
            this.interval = setInterval(() => {
                this.calculateWPM();
                this.setState(prevProps => {
                    return {seconds: prevProps.seconds + 1}
                })
            }, 1000)
        }
    }

    handleSubmit = (submit) => {
        submit.preventDefault();
        let totalInput = this.state.totalUserInput+this.state.curUserInput
        if(this.state.finished === false && this.state.curUserInput === this.props.prompt.textArr[this.state.currentLine]){
            this.setState({curUserInput: '', totalUserInput: totalInput})
            if(this.state.currentLine < this.props.prompt.textArr.length-1){
                this.setState({currentLine: this.state.currentLine + 1})
            }
        }
        console.log("Completed");
    }

    checkIfComplete(totalInput){
        console.log("TOTAL: ", totalInput)
        console.log(this.props.prompt.textString)
        console.log(totalInput === this.props.prompt.textString)
        if(totalInput === this.props.prompt.textString) {
            console.log("Done")
            document.getElementById("textArea").disabled = true;
            clearInterval(this.interval);
            this.setState({finished: true});
        }
    }

    calculateWPM(){
        if(this.state.characters !== 0 && this.state.seconds !== 0){
            this.setState({wpm: (this.state.characters/5) / (this.state.seconds/60)})
        }
    }

    render() {
        return (
            <div>
                <h1>Vroom vroom racing</h1>

                <div>
                    {this.props.prompt.textArr?(
                        this.props.prompt.textArr[this.state.currentLine].split('').map((s,i) => {
                            let color;
                            if (i < this.state.curUserInput.length){
                                color = s === this.state.curUserInput[i] ? '#00FF00' : '#FF0000';
                            }
                            return <span key={i} style={{backgroundColor: color}}>{s}</span>
                        })):('')
                    }
                </div>

                <div>{this.props.prompt.textArr?(this.props.prompt.textArr[this.state.currentLine+1]):('')}</div>
                <div>{this.props.prompt.textArr?(this.props.prompt.textArr[this.state.currentLine+2]):('')}</div>

                <br></br>

                <form onSubmit={this.handleSubmit}>
                    <input tabindex="-1" id="textArea" onChange={this.onUserInputChange} value={this.state.curUserInput}></input>
                </form>

                <div>{this.state.seconds}s</div>

                <div>{Math.round(this.state.wpm)} WPM</div>
                
                <div>
                    {Math.floor(this.state.percentage*100)}%
                </div>

                <br></br>

                {/* <div>{this.state.players !== undefined?(this.state.players[0].percentage?(this.state.players[0].percentage):('')):('')}</div> */}

                <p><Link to ="/">Back to User Creation</Link></p>
                <p><Link to ="/lobby/:lobbyid">Back to Lobby</Link></p>
            </div>
        )
    }
}

export default withRouter(Racing)