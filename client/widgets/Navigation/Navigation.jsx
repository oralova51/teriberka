import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./Navigation.css";

function MyNavbar() {
  return (
    <Navbar expand="lg" bg="light">
      <Container>
        {/* Логотип слева */}
        <Navbar.Brand href="/">
          <img
            src="../../public/logo.svg"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>

        {/* Кнопка-бургер для мобильных */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Навигация — отталкиваем в право с помощью ms-auto */}
          <Nav className="ms-auto">
            <Nav.Link href="#buy">Купить</Nav.Link>
            <Nav.Link href="#about">О проекте</Nav.Link>
            <Nav.Link href="#team">Команда</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;