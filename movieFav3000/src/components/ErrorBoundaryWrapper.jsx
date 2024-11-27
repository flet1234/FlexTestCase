import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import "../css/notFound.css";

// Fallback component for rendering on errors
const FallbackUI = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const resetToHome = () => {
    resetErrorBoundary();
    navigate("/");
  }

  return (
    <div className="notFoundContainer">
      <h1>Sorry, something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={resetToHome}>Go Back Home</button>
    </div>
  );
};

// Main Functional Error Boundary Component
const ErrorBoundaryWrapper = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackUI}
      onError={(error, info) => {
        console.error("Error caught:", error, info);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
