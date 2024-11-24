import React from 'react';
import './About.css';

function About() {
  return (
    <div className="container2">
      <h1 className="title">About Us</h1>
      <p className="vision">
        Hello, I’m Ayush, a software engineer specializing in web development and cryptography. My vision is to counter fake photographs, which can have serious consequences in today’s digital world.
      </p>
      <div className="section">
        <h2 className="subtitle">Our Concept</h2>
        <p className="text">
          Our application provides a unique solution to authenticate images by combining both the hash of the image and its metadata. We calculate the hash of the image and store it along with key metadata like the file creation time, device used, and more.
        </p>
      </div>
      <div className="section">
        <h2 className="subtitle">How It Works</h2>
        <p className="text">
          When an image is uploaded, our system calculates a unique hash and stores it with important metadata. During verification, we compare both the hash and metadata to ensure the image hasn’t been altered in any way. This makes it nearly impossible to use tampered images without detection.
        </p>
      </div>
      <div className="footer">
        <p>Thank you for visiting. Let’s work together to make digital media trustworthy.</p>
      </div>
    </div>
  );
}

export default About;
