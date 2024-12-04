import React, { useState, useEffect,useRef,useCallback} from "react";
import { hashDB } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { SHA256 } from "crypto-js";
import './searchimg.css'

function SearchHash() {
  const [searchTerm, setSearchTerm] = useState("");
  const [imageData, setImageData] = useState();
  const [results, setResults] = useState([]);
  const[messageDis,setmessageDis]=useState(false);
  // const [searchFile, setSearchFile] = useState(null);
  const [previewSearchFile, setPreviewSearchFile] = useState(null);
  const headerRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setResults([]);
    setmessageDis(false);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewSearchFile(previewUrl);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        // Extract image data
        const imgd = ctx.getImageData(0, 0, img.width, img.height).data;
        setImageData(imgd);
      };
      img.src = previewUrl;
    } else {
      setImageData(null);
    }
  };
  const hashOfImage = useCallback(() => {
    if (imageData) {
      const base64s = btoa(imageData);
      const toHash = SHA256(base64s);
      const searchHash = toHash.toString();
      setSearchTerm(searchHash);
    }
  }, [imageData]);
  useEffect(() => {
    hashOfImage();
  }, [hashOfImage]);
  const handleSearch = async () => {
    const q = query(
      collection(hashDB, "images"),
      where("imageHash", "==", searchTerm)
    );
    try {
      const querySnapshot = await getDocs(q);
      const firstDoc = querySnapshot.docs[0].data();
      setResults(firstDoc);
     
      console.log(firstDoc.imageHash, "handle search working");
    } catch (error) {
      console.error("Error fetching data:", error);
      setmessageDis(true)
    }
  };
  const changeMessageDisText = useCallback(() => {
    if (headerRef.current) {
      if (!previewSearchFile) {
        headerRef.current.textContent = "Please choose a photograph to verify.";
        headerRef.current.className = "choose-photo-message";
      } else if (results.imageHash) {
        headerRef.current.textContent =
          "The photograph is intact and unaltered.";
          headerRef.current.className = "intact-photo-message";
      } else if (messageDis) {
        headerRef.current.textContent =
          "The photograph has been tampered with or is not uploaded.";
          headerRef.current.className = "tampered-photo-message";
      } else {
        headerRef.current.textContent = "";
      }
    }
  }, [previewSearchFile, results, messageDis]);

  
  useEffect(() => {
   changeMessageDisText()
  }, [changeMessageDisText]);

  return (
    <div>
      <h2 className="search-heading"> Verify your image</h2>
      <input
        type="file"
        className="SearchSelect"
        placeholder="Search..."
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="searchPreview">
        {previewSearchFile && (
        
          <img className="imgst"
            src={previewSearchFile}
            alt="Preview"
            // style={{ maxWidth: "100%", maxHeight: "auto" }}
          />
      )}
      </div>
      <button className="chkbtn"onClick={handleSearch}disabled={!previewSearchFile}>CHECK PHOTO</button>
      <h3 ref={headerRef}aria-live="polite"> prcocessing...</h3>
    </div>
  );
}
export default SearchHash;
