import React from 'react';

export default (props) => {

    if(props.characters !== 0 && props.seconds !== 0){
        const wpm = (props.characters/5) / (props.seconds/60);
        return (
            <div>{Math.round(wpm)} WPM</div>
        )
    }

    return <div>0 WPM</div>
}