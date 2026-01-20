import React from "react";
import "./Team.css";

export default function Team() {
  return (
    <div className="team">
    <h2 className="team_header">Команда проекта</h2>
    <p className="team_text">Для вас старались: </p>
    <div className="team_block">
      <div className="team_card">
        <img className="team_img" src="../../public/IMG_0095.jpg" alt="команда проекта Териберка в ваших ушах" />
        <h3 className="name">Ольга Оралова</h3>
        <p>руководитель проекта, автор сценария</p>
      </div>
      <div className="team_card">
        <img className="team_img" src="../../public/photo_2024-08-0817.34.58.jpeg" alt="команда проекта Териберка в ваших ушах" />
        <h3 className="name">Филипп Мельников</h3>
        <p>aka Филиппчик соавтор сценария, звукорежиссер, актер роли Леви</p>
      </div>
      <div className="team_card">
        <img className="team_img" src="../../public/photo_2024-08-817.35.06.jpg" alt="команда проекта Териберка в ваших ушах"  />
        <h3 className="name">Никита Котов</h3>
        <p>актер роли Афана</p>
      </div>
    </div>
    </div>
  );
}
