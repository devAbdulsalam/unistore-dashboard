import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import BrandOne from '../images/brand/brand-01.svg';
import { Link } from 'react-router-dom';
import moment from 'moment';
const Table = ({ data, header, handleEdit, handleDelete, user }) => {
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
              {user?.user?.role === 'ADMIN' && (
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  User
                </th>
              )}
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Quantity
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Collect Date
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Return Date
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>{' '}
              {user?.user?.role === 'ADMIN' && (
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data?.map((row: any, idx: number) => {
              return (
                <tr key={idx} className="content-center">
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark capitalize flex items-center gap-2">
                    <Link to={`/requests/${row?._id}`} className="flex-shrink-0">
                      <img
                        src={row?.product?.image || BrandOne}
                        alt="Brand"
                        className="w-[60px] h-[60px] rounded-full"
                      />
                    </Link>
                    <Link to={`/requests/${row?._id}`}>
                      {row?.product_id?.name}
                    </Link>
                  </td>
                  {user?.user?.role === 'ADMIN' && (
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Link
                        to={`/users`}
                        className={`label label-${row?.user_id} capitalize`}
                      >
                        {row?.user_id == user?.user?.id ? row?.name : 'Admin'}
                      </Link>
                    </td>
                  )}
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {row?.quantity}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {moment(row?.createdAt).format('MMM Do')}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {row.status === 'pending'
                      ? moment(row?.createdAt).format('MMM Do')
                      : ''}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark capitalize">
                    <span>{row.status || 'Approved'}</span>
                  </td>
                  {user?.user?.role === 'ADMIN' && (
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <span className="actions flex grid-cols-2 gap-4">
                        <BsFillTrashFill
                          className="delete-btn cursor-pointer"
                          onClick={() => handleDelete(row?._id)}
                        />

                        <BsFillPencilFill
                          className="edit-btn cursor-pointer"
                          onClick={() => handleEdit(row?._id)}
                        />
                      </span>
                    </td>
                  )}
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
