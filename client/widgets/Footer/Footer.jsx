import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-heading">Свяжитесь с нами</h2>
        <div className="footer-socials">
          <a href="#">
            <img className="icon" src="/telegram.svg" alt="Telegram" />
          </a>
          <a href="#">
            <img className="icon" src="/instagram.svg" alt="Instagram" />
          </a>
          <a href="#">
            <img className="icon" src="/vk.svg" alt="VK" />
          </a>
        </div>
        <div className="footer-bones-wrapper">
            <img src='footer_bones.png' alt="Кости" className="footer-bones" />
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-left">
          <img src="/logo.png" alt="Логотип" className="footer-logo" />
        </div>

        <nav className="footer-links">
          <a href="#">Договор-оферта</a>
          <a href="#">Способы оплаты</a>
          <a href="#">Возврат</a>
          <a href="#">Правовая информация</a>
        </nav>
      </div>

      <div className="footer-bottom">
        <span className="year">© 2022</span>
      </div>
    </footer>
  );
}