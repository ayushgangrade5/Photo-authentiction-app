import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import{getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {app} from "./firebase";
import { useNavigate,BrowserRouter as Router  } from 'react-router-dom';
import UserProfile from './UserProfile';
const auth= getAuth(app);
function Example({modalShow,setModalShow}) {
const [Email,setEmail]= useState("");
const [Password,setPassword]= useState("");
// const [Name,setName]= useState("")
const Navigate = useNavigate();
const createUser =()=>{
createUserWithEmailAndPassword(auth, Email, Password)
.then((userCredential) => {
  // After successful signup, you can redirect the user to their profile page
  Navigate('/UserProfile'); // Assuming '/profile' is the route for the user's profile page
  userCredential? handleClose():console.log("error");
})

.catch((error) => {
  console.error("Error signing up:", error.message);
});
};

const handleClose = () => setModalShow(false);
  return (
    
      <Modal
        show={modalShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        
        <Modal.Header centered closeButton>
          <Col sm={10}> 
          <Modal.Title className="mb-7">SignUP</Modal.Title>
           </Col> 
        </Modal.Header>
        
        <Modal.Body>
        <Form>
          {/* <Form.Group as={Row} className='mb-3' >
            <Form.Label column >Anonymous Name</Form.Label>
            <Col sm={8}>
              <Form.Control type='text' value={Name} onChange={e=> setName(e.target.value)} placeholder='Anonymous Name'/>
            </Col>
          </Form.Group> */}
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="email" value={Email} onChange={e=> setEmail(e.target.value)} placeholder="Email" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="password" value={Password} onChange={e=> setPassword(e.target.value)} placeholder="Password" />
        </Col>
      </Form.Group>
      <fieldset>

      </fieldset>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
        <Col sm={{ span: 10, offset: 2 }}>
          <Form.Check label="Remember me" />

        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button  onClick={createUser}>Register</Button>
        </Col>
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
    
  );
}
export default Example;
