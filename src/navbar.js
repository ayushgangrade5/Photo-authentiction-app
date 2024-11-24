import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import PhotoUpload from "./upload";
import Contact from "./contact";
import Button from "react-bootstrap/Button";
import { Route, Link, Routes, BrowserRouter as Router } from "react-router-dom";
import About from "./About";
import { useState } from "react";
import Example from "./signup";
import UserProfile from "./UserProfile";
import './navbar.css';

function ColorSchemesExample() {
  const [modalShow, setModalShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevents the default behavior (navigation)
    setModalShow(true); // Open the modal
  };

  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/Home">Navbar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="basic-navbar-nav" className={`navbar-items ${isOpen ? "open" : ""}`}>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Home">Home</Nav.Link>
              <Nav.Link as={Link} to="/About">About</Nav.Link>
              <Nav.Link as={Link} to="/Contact">Contact us</Nav.Link>
              <Button
                as={Link}
                to="/Signup"
                variant="outline-light"
                onClick={handleButtonClick}
              >
                Signup / Signin
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" exact element={<PhotoUpload />} />
        <Route path="/Home" exact element={<PhotoUpload />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
      {modalShow && (
        <Example setModalShow={setModalShow} modalShow={modalShow} />
      )}
    </Router>
  );
}

export default ColorSchemesExample;