import "./BuyButton.css";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


export default function BuyButton({ className }) {
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <button onClick={handleOpen} className={className}>
        Купить
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Покупка</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Здесь может быть форма, описание тарифа, что угодно.
        </Modal.Body>

        <Modal.Footer>
          <button onClick={handleClose}>
            Закрыть
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
