import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PlayersList from './PlayersList'
import LinearProgress from '@material-ui/core/LinearProgress';
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './RacePage.css'

const theme = createMuiTheme({
    palette: {
       secondary: {
           main: '#69d5e4'
       }
    }
  })


class Racing extends Component {
    constructor(props) {
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

    componentDidMount() {
        if (this.props.prompt !== undefined) {
            this.setState({ textString: this.props.prompt.textString, textArr: this.props.prompt.textArr, textArrLength: this.props.prompt.textArrLength })
        }

        this.props.socket.on("updateText", ({ users }) => {
            console.log(users, "Data from updateText");
            this.setState({players:users})
        })

    }
    onUserInputChange = (e) => {
        const inputText = e.target.value;

        let tempInput = this.state.totalUserInput + inputText
        this.checkIfComplete(tempInput)
        this.setTimer();
        this.setState({ curUserInput: inputText, tempUserInput: this.state.totalUserInput + inputText, characters: this.countCorrectCharacters(tempInput) })
    }

    countCorrectCharacters(tempInput) {
        const text = this.props.prompt.textString;
        let correctChars = tempInput.split('').filter((s, i) => s === text[i]).length;
        if (((correctChars / this.props.prompt.textArrLength) * 100) >= this.state.floorPercentage) {
            this.setState({ floorPercentage: Math.floor((correctChars / this.props.prompt.textArrLength) * 100)},
                (() => {
                if (this.state.floorPercentage === 100) {
                    this.props.socket.emit('letterTyped', { lobbyCode: this.props.lobbyInfo, percentage: this.state.floorPercentage, wpm: this.state.wpm })
                }}
                )
            )};
        this.setState({ percentage: correctChars / this.props.prompt.textArrLength });
        return correctChars;
    };

    setTimer() {
        if (!this.state.started) {
            this.setState({ started: true });
            this.interval = setInterval(() => {
                this.calculateWPM();
                this.setState(prevProps => {
                    return { seconds: prevProps.seconds + 1 }
                }, () => { this.props.socket.emit('letterTyped', { lobbyCode: this.props.lobbyInfo, percentage: this.state.floorPercentage, wpm: this.state.wpm }) })
            }, 1000)
        }
    }

    handleSubmit = (submit) => {
        submit.preventDefault();
        let totalInput = this.state.totalUserInput + this.state.curUserInput
        if (this.state.finished === false && this.state.curUserInput === this.props.prompt.textArr[this.state.currentLine]) {
            this.setState({ curUserInput: '', totalUserInput: totalInput })
            if (this.state.currentLine < this.props.prompt.textArr.length - 1) {
                this.setState({ currentLine: this.state.currentLine + 1 })
            }
        }
    }

    checkIfComplete(totalInput) {
        if (totalInput === this.props.prompt.textString) {
            console.log("Done")
            document.getElementById("textArea").disabled = true;
            clearInterval(this.interval);
            this.setState({ finished: true });
        }
    }

    calculateWPM() {
        if (this.state.characters !== 0 && this.state.seconds !== 0) {
            this.setState({ wpm: (this.state.characters / 5) / (this.state.seconds / 60) })
        }
    }

    render() {
        return (
            <div className="racePage">
                <div className="wrapBoxBGR">
                    <div className="wrapBoxR">
                        <div className="logoBoxR">
                            <div>Race Progress: </div>
                            <MuiThemeProvider theme={theme}>
                            <LinearProgress style={{backgroundColor: "#c9c9c9",color:"white"}} className="progressBar" color="secondary" variant="determinate" value={this.state.floorPercentage}/>
                            </MuiThemeProvider>
                        </div>
                        <div className="bigBoxCreateR">
                            <div className="smallBoxLeftR">
                                <div className="leftTop">
                                <div className="leftSmallWPM">
                                   {Math.round(this.state.wpm)} wpm
                                   </div>
                                <div className="promptSection" style={{ userSelect: "none" }}>
                                    <div>
                                       {this.props.prompt.textArr ? (
                                            this.props.prompt.textArr[this.state.currentLine].split('').map((s, i) => {
                                                let color;
                                                if (i < this.state.curUserInput.length) {
                                                    color = s === this.state.curUserInput[i] ? '#00ba00' : '#ba0000';
                                                }
                                                return <span key={i} style={{ backgroundColor: color }}>{s}</span>
                                            })) : ('')
                                        }
                                    </div>
                                    <div className="nextPrompt">{this.props.prompt.textArr ? (this.props.prompt.textArr[this.state.currentLine + 1]) : ('')}</div>
                                    <div className="furtherPrompt">{this.props.prompt.textArr ? (this.props.prompt.textArr[this.state.currentLine + 2]) : ('')}</div>
                                </div>
                                </div>
                                <div >
                                    <form className="leftBot" onSubmit={this.handleSubmit}>
                                        <input className="inputBox"tabindex="-1" id="textArea" onChange={this.onUserInputChange} value={this.state.curUserInput}></input>
                                    </form>
                                </div>
                            </div>
                            <div className="smallBoxRightR">
                                <PlayersList players={this.state.players}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// return (
//     <div>
//         <h1>Vroom vroom racing</h1>

//         <div>
//             {this.props.prompt.textArr?(
//                 this.props.prompt.textArr[this.state.currentLine].split('').map((s,i) => {
//                     let color;
//                     if (i < this.state.curUserInput.length){
//                         color = s === this.state.curUserInput[i] ? '#00FF00' : '#FF0000';
//                     }
//                     return <span key={i} style={{backgroundColor: color}}>{s}</span>
//                 })):('')
//             }
//         </div>

//         <div>{this.props.prompt.textArr?(this.props.prompt.textArr[this.state.currentLine+1]):('')}</div>
//         <div>{this.props.prompt.textArr?(this.props.prompt.textArr[this.state.currentLine+2]):('')}</div>

//         <br></br>

//         <form onSubmit={this.handleSubmit}>
//             <input tabindex="-1" id="textArea" onChange={this.onUserInputChange} value={this.state.curUserInput}></input>
//         </form>

//         <div>{this.state.seconds}s</div>

//         <div>{Math.round(this.state.wpm)} WPM</div>

//         <div>
//             {Math.floor(this.state.percentage*100)}%
//         </div>

//         <br></br>

//         {/* <div>{this.state.players !== undefined?(this.state.players[0].percentage?(this.state.players[0].percentage):('')):('')}</div> */}

//         <p><Link to ="/">Back to User Creation</Link></p>
//         <p><Link to ="/lobby/:lobbyid">Back to Lobby</Link></p>
//     </div>
// )
// }
// }
export default withRouter(Racing)