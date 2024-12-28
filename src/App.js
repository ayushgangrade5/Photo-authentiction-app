import React, { useEffect } from "react";
import ColorSchemesExample from "./navbar";
import "./App.css";
import getDeviceFingerprint from "./fingerprint";

function App() {
  useEffect(() => {
    const fingerprint = getDeviceFingerprint();
    console.log(fingerprint); // Use the fingerprint data as needed
  }, []);

  return (
    <>
      <ColorSchemesExample />
    </>
  );
}

export default App;