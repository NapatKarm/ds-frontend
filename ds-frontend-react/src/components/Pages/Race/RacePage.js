import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PlayersList from './PlayersList'
import LinearProgress from '@material-ui/core/LinearProgress';
import { createMuiTheme, MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles';
import './RacePage.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#009ab0'
        }
    }
})

const colButton = createMuiTheme({
    palette: {
        primary: {
            main: "#FFFFFF"
        }
    },
});

class Racing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalUserInput: '',                     //Main comparator to determine if the entire prompt has been typed
            tempUesrInput: '',                      //Total string plus total line string 
            curUserInput: '',                       //Current Line String
            currentLine: 0,                         //Current line number for the text Array
            wpm: 0,                                 //Words per minute
            characters: 0,                          //Correct number of characters
            seconds: 0,                             //Seconds passed, incremented by timer
            started: false,                         //Boolean for when the user begins typing
            finished: false,                        //Boolean for when the user finishes typing                          
            floorPercentage: 0,                     //Calculate Floor percentage 
            players: [],                            //Stores all player information (name, percentage, placement) received from socket
            ending: false                           //Boolean for when all users finish
        }
    }

    componentDidMount() {
        this.props.socket.on("updateText", ({ users }) => {                 //Returns information (name, percentage, placement) of players in lobby
            this.setState({players:users})
        })
        this.props.socket.on("lobbyUpdate", ({ error, users }) => {         //Called when all users finish race
            this.setState({ending:true})
            
        })

    }
    componentWillReceiveProps(props) {
        console.log("Updating Information...")
    }

    onUserInputChange = (e) => {                                //Called whenever user types, set timer and check if complete
        const inputText = e.target.value;
        let tempInput = this.state.totalUserInput + inputText
        this.checkIfComplete(tempInput)
        this.setTimer();
        this.setState({ curUserInput: inputText, tempUserInput: this.state.totalUserInput + inputText, characters: this.countCorrectCharacters(tempInput) })
    }

    countCorrectCharacters(tempInput) {                         //Count correct number of characters as user types
        const text = this.props.prompt.textString;
        let correctChars = tempInput.split('').filter((s, i) => s === text[i]).length;      //Number of correct input compared to full prompt
        if (((correctChars / this.props.prompt.textArrLength) * 100) >= this.state.floorPercentage) {               //Compare if new percentage is greater than the current percentage
            this.setState({ floorPercentage: Math.floor((correctChars / this.props.prompt.textArrLength) * 100) },  //Set new percentage
                (() => {
                    if (this.state.floorPercentage === 100) {
                        this.props.socket.emit('letterTyped', { lobbyCode: this.props.lobbyInfo, percentage: this.state.floorPercentage, wpm: this.state.wpm }) //Sends new percentage through socket
                    }
                }
                )
            )
        };
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

    toLobby = () => {
        this.props.history.push(`/lobby/${this.props.lobbyInfo}`);
    }
    render() {
        return (
            <div className="racePage">
                <div className="wrapBoxBGR">
                    <div className="wrapBoxR">
                        <div className="logoBoxR">
                            <div>Race Progress: </div>
                            <MuiThemeProvider theme={theme}>
                                <LinearProgress style={{ backgroundColor: "#c9c9c9" }} className="progressBar" color="secondary" variant="determinate" value={this.state.floorPercentage} />
                            </MuiThemeProvider>
                        </div>
                        <div className="bigBoxCreateR">
                            <div className="smallBoxLeftR">
                                <div className="leftTop">
                                    <div className="leftSmallWPM">
                                        {Math.round(this.state.wpm)} wpm
                                   </div>
                                   
                                   {this.state.floorPercentage!== 100 ?
                                   (
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
                                   )
                                    :
                                    (
                                        <div className="promptSection" style={{ userSelect: "none" }}>Finished!</div>
                                    )
                                }
                                
                                </div>
                                <div >
                                    <form className="leftBot" onSubmit={this.handleSubmit}>
                                        <input className="inputBox" tabindex="-1" id="textArea" onChange={this.onUserInputChange} value={this.state.curUserInput}></input>
                                    </form>
                                </div>
                            </div>
                            <div className="smallBoxRightR">
                                <PlayersList players={this.state.players} />
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    open={this.state.ending}
                    TransitionComponent={Transition}
                    keepMounted
                    // onClose={}
                    fullWidth={true}
                    maxWidth="sm"
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    PaperProps={{
                        style: {
                          backgroundColor: '#424242',
                          color: 'white'
                        },
                      }}
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Placements!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                        <PlayersList players={this.state.players} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <ThemeProvider theme={colButton}>
                        <Button className="colButtonDSV" variant="contained" disableElevation onClick={this.toLobby}>
                            To Lobby
                    </Button>
                    </ThemeProvider>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withRouter(Racing)