import React from 'react';
import ReactDOM from "react-dom";

import "components/Modal/Modal.scss"

export default function Modal(props) {
    return ReactDOM.createPortal(
        <div className={`page-modal-dimmer ${props.showModal ? 'visible': 'hidden'}`} onClick={props.dismissHandler}>
            <div className="modal-container" onClick={event=>event.stopPropagation()}>
                {props.children}
            </div>
        </div>,
        document.getElementById("modal")
    );
}
