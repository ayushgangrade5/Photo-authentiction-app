import React, { useState } from 'react';
import { suggestionsDB } from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import './contact.css';

function Contact() {
  const [formValues, setFormValues] = useState({
    Name: '',
    Email: '',
    suggestion: '',
  });
  const [statusMessage, setStatusMessage] = useState(null); 
  const [statusType, setStatusType] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return formValues.Email ? emailRegex.test(formValues.Email) : false;
  };

  const uploadSuggestions = async (e) => {
    e.preventDefault();
    try {
      const documentId = uuidv4();
      const docRef = doc(suggestionsDB, 'SuggestionsRecord', documentId);
      await setDoc(docRef, formValues);

      setStatusMessage('Data saved successfully!');
      setStatusType('success');

      setFormValues({
        Name: '',
        Email: '',
        suggestion: '',
      });
    } catch (error) {
      console.error('Error uploading data', error);
      setStatusMessage('Error uploading data. Please try again.');
      setStatusType('error');
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-heading">Contact Us</h2>
      <form className="contact-form" onSubmit={uploadSuggestions}>
        <input
          type="text"
          name="Name"
          className="contact-input"
          placeholder="Name"
          value={formValues.Name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Email"
          className="contact-input"
          placeholder="E-mail"
          value={formValues.Email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="suggestion"
          className="contact-input"
          placeholder="Put your suggestions!"
          value={formValues.suggestion}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="contact-button"
          disabled={!formValues.Name || !formValues.suggestion || !validateEmail()}
        >
          Drop
        </button>
      </form>
      {statusMessage && (
        <div className={`status-message ${statusType}`}>
          {statusMessage}
        </div>
      )}
    </div>
  );
}

export default Contact;
