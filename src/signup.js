import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";
import { useNavigate } from "react-router-dom";
// import UserProfile from './UserProfile';
const auth = getAuth(app);
function SignUp({ setModalShow }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const Navigate = useNavigate();
  const handleClose = () => setModalShow(false);
  const createUser = () => {
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        Navigate("/UserProfile"); 
        userCredential ? handleClose() : console.log("error");
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
      });
  };
  
  return (
    <Form>
    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
      <Form.Label column sm={2}>
        Email
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </Col>
    </Form.Group>

    <Form.Group
      as={Row}
      className="mb-3"
      controlId="formHorizontalPassword"
    >
      <Form.Label column sm={2}>
        Password
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Col>
    </Form.Group>
    <fieldset></fieldset>
    <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
      <Col sm={{ span: 10, offset: 2 }}>
        <Form.Check label="Remember me" />
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Col sm={{ span: 10, offset: 2 }}>
        <Button onClick={createUser} disabled={!Email||!Password}>Register</Button>
      </Col>
    </Form.Group>
  </Form>
  );
}
export default SignUp;
