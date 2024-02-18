import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Complete: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch pop-up window
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is the content of the pop-up window.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* Additional buttons can be added here */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Complete;
