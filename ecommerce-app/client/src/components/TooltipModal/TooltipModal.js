import React from "react";
import "./TooltipModal.css";

function TooltipModal(props) {
  const tooltipContainer = React.useRef();
  const modalElement = React.useRef();
  const [modalTopOffset, setModalTopOffset] = React.useState(30);
  React.useEffect(() => {
    const tooltipHeight = tooltipContainer.current.clientHeight;
    setModalTopOffset(tooltipHeight);
  }, [props.children]);

  const toggleTooltip = () => {
    modalElement.current.classList.toggle('modal-open');
  };
  return (
    <div
      ref={tooltipContainer}
      className={`tooltip-container ${props.tooltipClass}`}
      onMouseEnter={toggleTooltip}
      onMouseLeave={toggleTooltip}
    >
      <div className="tooltip-container__element">{props.children}</div>
      <div
        className="tooltip-container__modal"
        ref={modalElement}
        style={{ top: `${modalTopOffset}px` }}
      >
        {props.modal}
      </div>
    </div>
  );
}

export default TooltipModal;
