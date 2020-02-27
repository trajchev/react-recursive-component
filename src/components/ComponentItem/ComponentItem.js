import React from 'react';
import './ComponentItem.css';

const ComponentItem = props => {

    let openClass = 'opened';

    if (!props.opened) {
        openClass = 'closed';
    } else {
        openClass = 'opened';
    }

    return (
        <div className="component">
            <button onClick={props.onClick} className="toggle-button">{props.opened ? 'Close' : 'Open'}</button>
            <h5><span>{props.id}</span> {props.title}</h5>
            <p className={openClass}>{props.body}</p>
            {props.opened ? props.children : null}
        </div>
    )

}

export default ComponentItem;