import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import reCodeLogo from '../../../images/ReCodeGPC.png'
import "./UserCreationPage.css";



const customTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#08f3ff',
        contrastText: '#fff',
      },
      text: '#fff'
    },
  });
  const errorTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#f44336',
        contrastText: '#fff',
      },
      text: '#fff'
    },
  });
class UserCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            alert: ''
        }
    }
    componentDidMount(){
        this.props.history.push("/");
    }
    changeUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    usernameCheck = async () => {
        if (this.state.username === "") {
            this.setState({ alert: "Username cannot be empty." })
        }
        else {
            await this.props.userCreation(this.state.username)
            if(this.props.userCreated) {
                this.props.history.push("/creation"); 
            }
            if(this.props.errorCode) {
                this.setState({alert:this.props.errorCode})
            }
            console.log(this.state.alert,"alertin")
        }
    }

    render() {
        return (
            <div className="pageContainer">
            <div className={`usernameTable${this.state.alert ? "Error" : ""}`}>
                <div>
                    <h2 style={{paddingTop:"15%"}}>Welcome to </h2>
                    <img className="logo"src={reCodeLogo} alt="Logo"/>
                </div>
                <div style={{ justifyContent: "center", alignItems: "flex-start", display: "flex" }}>
                    {!this.state.alert ?
                    (
                        <ThemeProvider theme={customTheme}>
                        <TextField variant="filled" id="usernameinput" label="Enter a Guest name" color="primary" onChange={this.changeUsername}/>
                        </ThemeProvider>
                    )
                    :
                    (
                        <ThemeProvider theme={errorTheme}>
                        <TextField error variant="filled" id="usernameinputerror" label="Try again" color="primary" defaultValue={this.state.username} helperText={this.state.alert} onChange={this.changeUsername}/>
                        </ThemeProvider>
                    )
                    }
                    <ThemeProvider>
                    <PlayCircleOutlineOutlinedIcon className={`goButton${this.state.alert ? "Error" : ""}`}style={{paddingLeft:"2%",paddingTop:"2%"}}fontSize="large" onClick={this.usernameCheck}/>
                    </ThemeProvider>
                </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserCreation)