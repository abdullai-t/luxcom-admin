import React from "react";
import { Toast } from "react-bootstrap";

/**
 * @props show  | bool representing the state of the toast
 * @props type | @String | type of Notification
 * @props className
 * @props style
 * @props message | @String | notification content
 */
export default function Notification({ show, type, message, classes, styles }) {
  return (
    <Toast show={show} delay={3000} autohide className = {`toast-container`} >
      <Toast.Header className="failed">
        <strong className="mr-auto">{type}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
