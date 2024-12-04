import React, { useState, useRef } from "react";
import HashPhoto from "./hashing";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { imgDB, hashDB } from "./firebase";
import SearchHash from "./searchimg";
import "./Photoupload.css"; // Import the CSS file

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [hash, setHash] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const photoUploadHeader = useRef();

  const handleFileChange = (event) => {
    setHash(null);
    setStatusMessage("");
    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imgd = ctx.getImageData(0, 0, img.width, img.height).data;
        setImageData(imgd);
      };

      img.src = previewUrl;
    } else {
      setImagePreview(null);
    }
  };

  const handleHashGenerated = (generatedHash) => {
    setHash(generatedHash);
  };

  const handleCheck = async () => {
    if (!hash) return;

    const q = query(
      collection(hashDB, "images"),
      where("imageHash", "==", hash)
    );

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setStatusMessage(
          "This photograph already exists! Please upload another photograph."
        );
        photoUploadHeader.current.className = "checkMessage";
      } else {
        await handleUpload();
        setStatusMessage(
          "Photograph and hash successfully uploaded to the database."
        );
        photoUploadHeader.current.className = "successful-Upload";
      }
    } catch (error) {
      console.error("Error during check:", error);
      setStatusMessage("An error occurred while verifying the photograph.");
    }
  };

  const handleUpload = async () => {
    if (selectedFile && hash) {
      const uniqueID = uuidv4();
      const imgRef = ref(imgDB, `Imgs/${uniqueID}`);

      try {
        const uploadResult = await uploadBytes(imgRef, selectedFile);
        const downloadURL = await getDownloadURL(uploadResult.ref);

        await setDoc(doc(hashDB, "images", uniqueID), {
          imageUrl: downloadURL,
          imageHash: hash,
          uploadedAt: new Date(),
        });
      } catch (error) {
        console.error(
          "Error uploading image or storing data in Firestore:",
          error
        );
      }
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h2 className="heading-upload">Upload a Photograph</h2>
        <input
          type="file"
          className="upImg"
          onChange={handleFileChange}
          accept="image/*"
        />
        <div className="image-preview">
          {imagePreview && (
            <img className="imgpre" src={imagePreview} alt="Preview" />
          )}
        </div>
        <HashPhoto file={imageData} onHashGenerated={handleHashGenerated} />
        <button className="upbtn" onClick={handleCheck} disabled={!hash}>
          Upload Image with Hash
        </button>
        <h3 ref={photoUploadHeader} aria-live="polite">
          {statusMessage || <>&nbsp;</>}
        </h3>
      </div>
      <div className="right">
        <SearchHash />
      </div>
    </div>
  );
};

export default PhotoUpload;
