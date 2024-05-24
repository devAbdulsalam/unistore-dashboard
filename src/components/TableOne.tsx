import BrandOne from '../images/brand/brand-01.svg';
import { Link } from 'react-router-dom';
const TableOne = ({ data, handleDelete }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Users
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Users
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Role
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Country
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>
        {data?.data?.length > 0 &&
          data?.data?.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-6"
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <img src={user?.avatar?.url || BrandOne} alt="Brand" />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {user.firstname}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user.email}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">APPROVED</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{user.role}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">NIGERIA</p>
              </div>
              <div className="flex items-center justify-center p-2.5 gap-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-white hover:text-danger px-2 py-1 bg-danger/50 hover:bg-danger/20 rounded-md"
                >
                  Delete
                </button>

                <Link
                  to={`/users/${user._id}`}
                  className="text-white hover:text-danger px-2 py-1 bg-success/50 hover:text-success/30 rounded-md"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TableOne;
