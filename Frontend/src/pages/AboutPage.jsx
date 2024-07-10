import React from "react";

function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-6">
        Welcome to our company! We are dedicated to providing the best service
        to our customers. Our mission is to deliver high-quality products that
        bring value and satisfaction.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
      <ul className="list-disc list-inside">
        <li>John Doe - CEO</li>
        <li>Jane Smith - CTO</li>
        <li>Emily Johnson - COO</li>
      </ul>
    </div>
  );
}

export default AboutPage;
