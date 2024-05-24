import React, { useState } from 'react';

const SearchUser = ({ result, setResult }) => {
  const [query, setQuery] = useState('');
  return (
    <div className="flex flex-col gap-5.5 p-6.5">
      <div>
        <label className="mb-3 block text-black dark:text-white">
          Search User
        </label>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={setQuery}
            className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
