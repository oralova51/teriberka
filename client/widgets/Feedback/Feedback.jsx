import React from "react";
import "./Feedback.css";

export default function Feedback() {
  return (
    <>
      <h3 className="feedback_heading">Отзывы после прослушивания</h3>
      <div className="feedback_block">
      <div className="feedback_card">
        <img src="../../public/photo_2024-07-1012.41.34.jpeg" />
        <p>
          Замечательные истории, легко следовать маршруту, и каждый раздел полон
          интересных фактов.
        </p>
        <p className="name">Жанна</p>
      </div>
      <div className="feedback_card">
        <img src="/photo_2026-01-1917.29.24.jpeg" />
        <p>
          Удобно, что можно слушать истории в любом порядке. Рекомендую всем,
          кто хочет глубже погрузиться в местную культуру!
        </p>
        <p className="name">Денис</p>
      </div>
      <div className="feedback_card">
        <img src="/photo_2026-01-1917.31.23.jpeg" />
        <p>
          Мы отправились в путешествие по Териберке с друзьями и использовали
          аудиогид как персонального рассказчика. Отличное дополнение к
          приключению!
        </p>
        <p className="name">Варвара</p>
      </div>
      <div className="feedback_card">
        <img src="/public/photo_2026-01-1917.45.45.jpeg" />
        <p>
         Рассказы погружают в атмосферу места, а подробная информация помогает лучше понять историю и природу.
        </p>
        <p className="name">Евгений</p>
      </div>
      </div>
    </>
  );
}
