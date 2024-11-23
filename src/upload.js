import React, { useState } from "react";
import HashPhoto from "./hashing";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { imgDB, hashDB } from "./firebase";
import SearchHash from "./searchimg";
import './Photoupload.css'; // Import the CSS file

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [hash, setHash] = useState(null);

  const handleFileChange = (event) => {
    setHash(null);
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
        console.log("Image and hash stored successfully in Firestore");
      } catch (error) {
        console.error("Error uploading image or storing data in Firestore", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h2>Upload a Photograph</h2>
        <input type="file" id="upImg" onChange={handleFileChange} accept="image/*" />
        {imagePreview && (
          <div>
            <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />
          </div>
        )}
        <HashPhoto file={imageData} onHashGenerated={handleHashGenerated} />
        <button className="upbtn"onClick={handleUpload} disabled={!hash}>Upload Image with Hash</button>
        
      </div>
      <div className="right">
        
        <SearchHash />
      </div>
    </div>
  );
};

export default PhotoUpload;
