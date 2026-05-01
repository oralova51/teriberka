import "./SuccessPaymentPage.css";

export default function SuccessPaymentPage() {
  // TODO: Получать название тарифа из глобального хранилища, когда оно будет подключено.
  const tariffName = "Название тарифа";
  // TODO: Брать email юзера из глобального хранилища после его подключения.
  const email = `user@mail.ru`;

  return (
    <section className="success-payment-page">
      <img
        className="success-payment-page__lights"
        src="/Vector.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="success-payment-page__mountains"
        src="/noroot.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="success-payment-page__bird"
        src="/5c45b1bd22ea23441144da9f4976d507b9e4542c.png"
        alt=""
        aria-hidden="true"
      />

      <div className="success-payment-page__content">
        <div className="success-payment-page__card">
          <h1 className="success-payment-page__title">
            Вы успешно оплатили аудиогид < br />
            {tariffName.toLowerCase()}
          </h1>
          <p className="success-payment-page__text">
            Пожалуйста, проверьте свою электронную почту — <a href={`mailto:${email}`}>{email}</a>
            - вам придёт письмо с доступом в закрытый Telegram-канал. Если письмо по какой-то причине
            не пришло, напишите нам в поддержку <a href="mailto:teriberka.audio@yandex.ru">teriberka.audio@yandex.ru</a>.
          </p>
          <p className="success-payment-page__text">
            Желаем вам приятного прослушивания. <br />
            Леви уже ждет вас в путешествии в Териберке.
          </p>
        </div>
      </div>
    </section>
  );
}
