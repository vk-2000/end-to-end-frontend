import React from 'react';
import { useParams } from 'react-router-dom';
import './Error.css';

const Error = () => {
  const { errorCode } = useParams();
  return (
    <div>
      <div className="error-contents">
        <div>
          <h1>Oops! Something went wrong</h1>
          {errorCode && (
          <h2>
            Error Code:
            {' '}
            {errorCode}
          </h2>
          )}
        </div>
      </div>

    </div>
  );
};

export default Error;
