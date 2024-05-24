import { BsFillTrashFill, BsFillPencilFill, BsCart } from 'react-icons/bs';
import BrandOne from '../images/brand/brand-01.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/authContext';
const Table = ({ data, header, handleEdit, handleDelete, handleCart }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {header}
      </h4>
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
                Price
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
            {data?.map((row: any, idx: number) => {
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
                    <Link to={`/products/${row?.id}`}>{row?.name}</Link>
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
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    &#8358; {row.price}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span>{row.status || 'Approved'}</span>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {user?.user?.role === 'ADMIN' ? (
                      <span className="actions flex grid-cols-2 gap-4">
                        <BsFillTrashFill
                          className="delete-btn cursor-pointer"
                          onClick={() => handleDelete(row.id)}
                        />

                        <BsFillPencilFill
                          className="edit-btn cursor-pointer"
                          onClick={() => handleEdit(row.id)}
                        />
                      </span>
                    ) : (
                      <BsCart
                        className="edit-btn cursor-pointer mx-auto"
                        onClick={() => handleCart(row.id)}
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
