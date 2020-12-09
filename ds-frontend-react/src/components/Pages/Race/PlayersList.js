import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import './RacePage.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    palette: {
       secondary: {
           main: '#13ffff'
       }
    }
  })



function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <ThemeProvider theme={theme}>
            <CircularProgress color="secondary" variant="determinate" {...props} />
            </ThemeProvider>
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {props.placement ? 
                (
                <Typography variant="caption" component="div" className="whiteText">{`#${props.placement}`}</Typography>
                ):(
                    <Typography variant="caption" component="div" className="whiteText">{`${Math.floor(
                        props.value,
                    )}%`}</Typography>
                )
                }

            </Box>
        </Box>
    );
}

class PlayersList extends Component {

    render() {
        return (
            <div>
                <List>
                    {this.props.players ? (this.props.players.map((player) => (
                        <div>
                            <ListItem>
                                <ListItemAvatar>
                                    <CircularProgressWithLabel value={player.percentage} placement={player.placement} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<div className="whiteText">{player.playerName}</div>}
                                    secondary={<div className="itemsListed">{Math.floor(player.wpm)+" WPM"}</div>}
                                />
                            </ListItem>
                            <Divider />
                        </div>
                    ))):
                        (<div></div>)}

                </List>
            </div>
        )
    }
}

export default PlayersList;

