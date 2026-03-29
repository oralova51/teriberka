import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-heading">Свяжитесь с нами</h2>
        <div className="footer-socials">
          <a href="https://t.me/oralovalova">
            <img className="icon" src="/telegram.svg" alt="Telegram" />
          </a>
          <a href="https://m.vk.com/teriberka_audio">
            <img className="icon" src="/vk.svg" alt="VK" />
          </a>
           <a href="mailto:teriberka.audio@yandex.ru">
            <img className="icon" src="/mail.svg" alt="VK" />
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
          <a href="https://disk.yandex.ru/i/mWh38jjm2cTC_Q" target="_blank" rel="noopener noreferrer">Договор-оферта, Политика конфиденциальности</a>
          <a href="https://disk.yandex.ru/i/15yCbXtIdkIHvQ" target="_blank" rel="noopener noreferrer">Способы оплаты, возврата и остальные требования</a>
        </nav>
      </div>

      <div className="footer-bottom">
        <span className="year">© 2022</span>
      </div>
    </footer>
  );
}