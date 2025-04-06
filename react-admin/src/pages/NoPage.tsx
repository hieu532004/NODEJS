// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router';

const NotFound: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="text-center text-white px-4">
        <h1 className="text-9xl font-bold animate-bounce md:text-[12rem]">404</h1>
        <h2 className="text-3xl font-semibold mt-4 md:text-4xl">Page Not Found</h2>
        <p className="mt-4 text-gray-400 max-w-md mx-auto text-sm md:text-base">
          Oops! It seems like you've wandered into the digital wilderness.
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8 space-y-4">
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
          >
            Back to Home
          </Link>
          <p className="text-gray-500 text-sm">
            Error code: 404 | Date: {currentDate}
          </p>
        </div>

        {/* Animation dots */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse [animation-delay:200ms]"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse [animation-delay:400ms]"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;