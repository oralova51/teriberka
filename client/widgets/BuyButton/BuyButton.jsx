import "./BuyButton.css";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';


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
          <Modal.Title>Выберите тариф</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                 <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-tariffs">
            Тарифы
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/product1" target="_blank">
              Тариф 1
            </Dropdown.Item>
            <Dropdown.Item href="/product2" target="_blank">
              Тариф 2
            </Dropdown.Item>
            <Dropdown.Item href="/product3" target="_blank">
              Тариф 3
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
