import "./BuyButton.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

export default function BuyButton({ products, className }) {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelect = (product) => {
    setSelectedProduct(product);
  };

    const handleConfirm = () => {
    if (!selectedProduct) return alert("Выберите тариф!");
    // Пример: редирект на оплату
    window.location.href = `/checkout/${selectedProduct.id}`;
  };

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
              {products && products.length > 0 ? (
                products.map((product) => (
                  <Dropdown.Item
                    key={product.id}
                    onClick={() =>handleSelect(product)}
                  >
                    {product.title} - {product.price} руб.
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>Продукты загружаются...</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>

        <Modal.Footer>
          <button onClick={handleClose}>Закрыть</button>
          <button onClick={handleConfirm} disabled={!selectedProduct}>
            Подтвердить
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}