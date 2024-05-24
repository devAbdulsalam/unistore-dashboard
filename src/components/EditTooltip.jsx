/* eslint-disable react/prop-types */
import { useState } from 'react';

const EditTooltip = ({ handleEdit }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  const handleMouseLeave = () => {
    setShowTooltip(null);
  };
  return (
    <div className="relative">
      <button
        className="w-10 h-10 leading-10 text-tiny bg-success text-white rounded-md hover:bg-green-600"
        onClick={handleEdit}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={handleMouseLeave}
        aria-label="Edit"
      >
        <svg
          className="-translate-y-px mx-auto"
          height="12"
          viewBox="0 0 492.49284 492"
          width="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0"
          />
          <path
            fill="currentColor"
            d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0"
          />
        </svg>
      </button>
      {showTooltip && (
        <div className="flex flex-col items-center z-50 absolute left-1/2 -translate-x-1/2 bottom-full mb-1">
          <span className="relative z-10 p-2  leading-none font-medium text-white whitespace-no-wrap w-max bg-black rounded inline-block">
            Edit
          </span>
          <div className="tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default EditTooltip;
