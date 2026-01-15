import "./Description.css";

export default function Description() {
  return (
    <>
    <section className="audio-teaser">
      <iframe
        title="Тизер Териберка"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="0"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1689263097&color=%238cd4cc&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
      />

      <div
        style={{
          fontSize: '10px',
          color: '#004252',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily:
            'Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Garuda, Verdana, Tahoma, sans-serif',
          fontWeight: 100,
        }}
      >
        <a
          href="https://soundcloud.com/olga-oralova"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#004252', textDecoration: 'none' }}
        >
          Olga Oralova
        </a>
        {' · '}
        <a
          href="https://soundcloud.com/olga-oralova/tizer"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#004252', textDecoration: 'none' }}
        >
          Тизер «Териберка в ваших ушах»
        </a>
      </div>
    </section>
    <div className="div_description" >
    <img src="../../../public/Vector.png" alt="териберка" className="description_polar" />
      <h2 className="description_text">
        Имена наших персонажей необычны для териберской местности. Вдохновленные
        знаменитым фильмом "Левиафан", этим художественным приёмом мы решили
        напомнить вам о важном эпизоде, после которого Териберка обрела новую
        жизнь. Словно со страниц детской сказки, вас ждет захватывающее
        аудиоприключение. Наша задача - дать путешественникам ощутить дух этого
        места.
      </h2>
    </div>
    </>
  );
}
