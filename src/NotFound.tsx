import { useNavigate } from 'react-router-dom';

// import React from 'react';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="error flex h-screen w-full items-center justify-center transition-all duration-300">
      <div className="error__container container">
        <div className="error__data text-center">
          <h1 className="error__title section-title text-[36px] sm:text-[42px] lg:text-[56px]">
            404 Not Found!
          </h1>
          <p className="error__text section-text">
            The page you&lsquo;re looking for was not found
          </p>
          {/* <button onClick={() => navigate(-1)} className="xs:inline-flex">
						Back to Previous page
					</button> */}
          <button onClick={() => navigate('/')} className="xs:inline-flex">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
