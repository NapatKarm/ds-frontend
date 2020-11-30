import React from 'react';

export default (props) => {
    const text = props.text.split('');

    return (
        <div>
            {
                text.map((s,i) => {
                    let color;
                    if (i < props.userInput.length){
                        color = s === props.userInput[i] ? '#00FF00' : '#FF0000';
                    }
                    return <span key={i} style={{color: color}}>{s}</span>
                })
            }
        </div>
    )
}