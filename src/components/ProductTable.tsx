import { BsFillTrashFill, BsFillPencilFill, BsCart } from 'react-icons/bs';
import BrandOne from '../images/brand/brand-01.svg';
import { Link } from 'react-router-dom';
import { useContext, useMemo, useState } from 'react';
import AuthContext from '../context/authContext';
const Table = ({ data, header, handleEdit, handleDelete, handleCart }) => {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  console.log('data t', data);
  const filteredData = useMemo(() => {
    return data?.filter((data: any) => {
      // Filter by query (search)
      const matchesQuery =
        data._id?.toLowerCase().includes(query.toLowerCase()) ||
        data.name?.toLowerCase().includes(query.toLowerCase()) ||
        data.quantity?.toString().includes(query) ||
        data.status?.toString().includes(query);

      return matchesQuery;
    });
  }, [query, data]);
  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-center justify-between flex-wrap gap-1 my-2">
        <h3 className="text-[#212B36] text-base font-semibold -tracking-[0.15px] whitespace-nowrap">
          {header}
        </h3>
        <div className="flex items-center justify-between flex-wrap gap-1 w-full md:w-auto">
          <div className="w-full lg:max-w-sm  border focus-within:border-blue-600 rounded-lg border-[#E7E7E7] py-3 px-4 justify-between items-center max-h-10 flex">
            <input
              type="text"
              className="outline-none w-9/12"
              placeholder="Search..."
              value={query}
              onChange={handleChange}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16667 3.33335C5.94501 3.33335 3.33334 5.94503 3.33334 9.16669C3.33334 12.3883 5.94501 15 9.16667 15C12.3883 15 15 12.3883 15 9.16669C15 5.94503 12.3883 3.33335 9.16667 3.33335ZM1.66667 9.16669C1.66667 5.02455 5.02454 1.66669 9.16667 1.66669C13.3088 1.66669 16.6667 5.02455 16.6667 9.16669C16.6667 13.3088 13.3088 16.6667 9.16667 16.6667C5.02454 16.6667 1.66667 13.3088 1.66667 9.16669Z"
                fill="#637381"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2857 13.2858C13.6112 12.9603 14.1388 12.9603 14.4643 13.2858L18.0893 16.9108C18.4147 17.2362 18.4147 17.7638 18.0893 18.0893C17.7638 18.4147 17.2362 18.4147 16.9108 18.0893L13.2857 14.4643C12.9603 14.1388 12.9603 13.6112 13.2857 13.2858Z"
                fill="#637381"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto table-wrapper">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Quantity
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((row: any, idx: number) => {
              return (
                <tr key={idx} className="content-center">
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark capitalize flex items-center gap-2">
                    <div className="flex-shrink-0">
                      <img
                        src={row?.image || BrandOne}
                        alt="Brand"
                        className="w-[60px] h-[60px] rounded-full"
                      />
                    </div>
                    <Link to={`/products/${row?._id}`}>{row?.name}</Link>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {row.quantity < 0 ? (
                      <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
                        {row.quantity}
                      </p>
                    ) : row.quantity < 10 ? (
                      <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                        {row.quantity}
                      </p>
                    ) : (
                      <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                        {row.quantity}
                      </p>
                    )}
                  </td>
                  {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    &#8358; {row.price}
                  </td> */}
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span>{row.status || 'Approved'}</span>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {user?.user?.role === 'ADMIN' ? (
                      <span className="actions flex grid-cols-2 gap-4">
                        <BsCart
                          className="edit-btn cursor-pointer"
                          onClick={() => handleCart(row)}
                        />
                        <BsFillTrashFill
                          className="delete-btn cursor-pointer"
                          onClick={() => handleDelete(row._id)}
                        />

                        <BsFillPencilFill
                          className="edit-btn cursor-pointer"
                          onClick={() => handleEdit(row._id)}
                        />
                      </span>
                    ) : (
                      <BsCart
                        className="edit-btn cursor-pointer mx-auto"
                        onClick={() => handleCart(row)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Table;
