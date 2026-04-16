import "./BuyButton.css";
import { useMemo, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PaymentApi } from "../../features/payment/api";


//сюда надо внести ссылку, которая приходит в ответе на постзапрос по эндпоинту /api/payment
// const PAYMENT_STUB_BASE_URL = '';


function formatPrice(price) {
  return new Intl.NumberFormat("ru-RU").format(price);
}

export default function BuyButton({
  products = [],
  className = "",
  defaultProduct = null,
  buttonLabel = "Купить",
}) {
  const [show, setShow] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const availableProducts = useMemo(() => {
    const mergedProducts = defaultProduct
      ? [defaultProduct, ...products]
      : products;

    return mergedProducts.filter(
      (product, index, currentProducts) =>
        product &&
        currentProducts.findIndex(
          (currentProduct) => currentProduct.id === product.id
        ) === index
    );
  }, [defaultProduct, products]);

  const fallbackProductId =
    defaultProduct?.id ?? availableProducts[0]?.id ?? null;
  const resolvedSelectedProductId = availableProducts.some(
    (product) => product.id === selectedProductId
  )
    ? selectedProductId
    : fallbackProductId;
  const selectedProduct =
    availableProducts.find(
      (product) => product.id === resolvedSelectedProductId
    ) ?? null;

  const handleOpen = () => {
    setErrorMessage("");
    setShow(true);
  };

  const handleClose = () => {
    setErrorMessage("");
    setShow(false);
  };

  const handlePayment = async (product) => {
    try {
      console.log(product.price, '!!!!!!!!!>>>>>>>>>>><<<<<<<<<<<<');
      
      const url = await PaymentApi.createPayment({ value: product.price});

      if (!url) {
        throw new Error("Payment URL not found in response");
      }
  
      window.open(url, "_blank", "noopener,noreferrer");
  
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <>
      <button type="button" onClick={handleOpen} className={className}>
        {buttonLabel}
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="buy-modal"
      >
        <Modal.Header closeButton className="buy-modal__header">
          <Modal.Title className="buy-modal__title">Выберите тариф</Modal.Title>
        </Modal.Header>

        <Modal.Body className="buy-modal__body">
          <p className="buy-modal__description">
            Выберите подходящий аудиогид и перейдите к оплате. Подключение
            платежного сервиса можно будет добавить без изменений в UI.
          </p>

          <div className="buy-modal__plans" aria-label="Доступные тарифы">
            {availableProducts.length > 0 ? (
              availableProducts.map((product) => {
                return (
                  <button
                    key={product.id}
                    type="button"
                    className={`buy-modal__plan ${
                      product.id === resolvedSelectedProductId
                        ? "buy-modal__plan--selected"
                        : ""
                    }`}
                    onClick={() => setSelectedProductId(product.id)}
                    aria-pressed={product.id === resolvedSelectedProductId}
                  >
                    <span className="buy-modal__plan-title">{product.title}</span>
                    <span className="buy-modal__plan-description">
                      {product.description}
                    </span>
                    <span className="buy-modal__plan-price">
                      {formatPrice(product.price)} ₽
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="buy-modal__empty">
                Тарифы загружаются. Проверьте подключение и попробуйте снова.
              </div>
            )}
          </div>

          {selectedProduct && (
            <div className="buy-modal__summary">
              <span className="buy-modal__summary-label">Выбран тариф:</span>
              <span className="buy-modal__summary-value">
                {selectedProduct.title}
              </span>
              <span className="buy-modal__summary-price">
                {formatPrice(selectedProduct.price)} ₽
              </span>
            </div>
          )}

          {errorMessage && (
            <p className="buy-modal__error" role="alert">
              {errorMessage}
            </p>
          )}
        </Modal.Body>

        <Modal.Footer className="buy-modal__footer">
          <button
            type="button"
            className="buy-modal__secondary"
            onClick={handleClose}
          >
            Отмена
          </button>
          <button
            type="button"
            className="buy-modal__primary"
            onClick={()=>handlePayment(selectedProduct)}
            disabled={!selectedProduct}
          >
            Перейти к оплате
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}