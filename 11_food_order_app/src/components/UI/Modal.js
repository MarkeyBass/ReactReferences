import React from "react";
import reactDom from "react-dom";
import styles from "./Modal.module.css";

// The first two components used only in this file in order to send them to
// different location in the DOM using ReactDom.createPortal()

const BackDrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCloseModal} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

// The main component in this js file.

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {reactDom.createPortal(
        <BackDrop onCloseModal={props.onCloseModal} />,
        portalElement
      )}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
