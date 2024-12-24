import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import SignIN from "./sign-in";
import SignUp from "./signup";


function SignInSignUp({ modalShow, setModalShow }) {
  const [currentPage, setCurrentPage] = useState(1); // Set default to SignUp
  const pages = [<SignIN setModalShow ={setModalShow}/>, <SignUp setModalShow ={setModalShow}/>];

  const handleClose = () => setModalShow(false);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

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
          <Modal.Title className="mb-7">
            {currentPage === 0 ? "Sign In" : "Sign Up"}
          </Modal.Title>
        </Col>
      </Modal.Header>

      <Modal.Body>{pages[currentPage]}</Modal.Body>

      <Modal.Footer>

        <Button
          variant="primary"
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 0}
        >
          Sign In
        </Button>
        <Button
          variant="primary"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignInSignUp;