import "./Instructions.css";

export default function Instructions() {
  return (
    <div className="instruction_block">
      <h2 className="instructions_header">Инструкция и Рекомендации</h2>
      <p>
        Стараемся каждый день, чтобы сделать ваше путешествие по Териберке еще
        более захватывающим и незабываемым
      </p>
      <div className="images">
        <img src='/Vector.png' alt='северное сияние' className='polar_light_instruction'/>
        <div className="card">
          <img className="instruction_img"
            src="/IMG_1495.JPG"
            alt="Изображение сундука с денежками"
          />
          <h3>Оплата</h3>
          <p className="instructions_text">Удобная оплата прямо на сайте</p>
        </div>
        <div className="card">
          <img className="instruction_img"
            src="/IMG_1496.JPG"
            alt="Изображение ключика для доступа к аудиогиду"
          />
          <h3>Получение доступа</h3>
          <p className="instructions_text">
            Через несколько минут вам придёт письмо на электронную почту c
            доступом к закрытому каналу аудиогида
          </p>
        </div>
        <div className="card">
          <img className="instruction_img"
            src="/IMG_1497.JPG"
            alt="Изображение кита, слушающего аудиогид"
          />
          <h3>Прослушивание</h3>
          <p className="instructions_text">
            Самостоятельно изучаете Териберку, используя наш аудиогид как
            верного помощника. Рекомендуем вам использовать наушники.
          </p>
        </div>
      </div>
    </div>
  );
}
