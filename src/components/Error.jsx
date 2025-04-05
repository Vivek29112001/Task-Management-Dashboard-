import React from 'react';

const Error = () => (
  <div className="text-center text-red-500">
      {/* Error Heading */}
      <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
      {/* Additional error info */}
      <p>Please try again later.</p>
  </div>
);

export default Error;