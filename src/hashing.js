import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SHA256 } from "crypto-js";
import './hash.css'

const HashPhoto = ({ file, onHashGenerated }) => {
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (file) {
      const base64String= btoa(file)
      const wordArray = SHA256(base64String);
      const hashValue = wordArray.toString();
      setHash(hashValue);
      onHashGenerated(hashValue);
    }
  }, [file, onHashGenerated]);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  return (
    <div className="Show-hash-date">
      <h5>Hash of the photo is: {hash}</h5>
      <h3>Date: {formattedDate}</h3>
    </div>
  );
};
HashPhoto.prototype = {
  file: PropTypes.instanceOf(File).isRequired,
  onHashGenerated: PropTypes.func.isRequired,
};

export default HashPhoto;
