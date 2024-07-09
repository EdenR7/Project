import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
