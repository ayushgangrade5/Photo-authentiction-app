import { useState } from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import UserProfile from './UserProfile';
import { useNavigate } from "react-router-dom";
import { app } from './firebase';

const auth= getAuth(app);
function SignIN({setModalShow}) {
const [Email,setEmail]= useState("");
const [Password,setPassword]= useState("");
const navigateSignIn = useNavigate();
const handleClose = () => setModalShow(false);
const signINuser= async(e)=> {
  e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, Email, Password);
      handleClose();
      navigateSignIn("/UserProfile"); // Redirect to User Page
      
    } catch (err) {
      console.error(err);
    }       
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
        <Button onClick={signINuser}>login</Button>
      </Col>
    </Form.Group>
  </Form>
  );
}

export default SignIN;
