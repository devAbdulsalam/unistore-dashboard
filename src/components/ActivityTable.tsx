import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import getError from './../hooks/getError';
import formatDateString from './../hooks/formatDateString';
import AuthContext from '../context/authContext';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
import { useQueryClient } from '@tanstack/react-query';
interface activityProps {
  data: Array;
  projectId: String;
}
const ActivityTable = ({ data, projectId, setLoading }: activityProps) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token || user.accessToken}`,
    },
  };
  const handleStatusChange = async (activityId: String, prevStatus: String) => {
    const { value: status } = await Swal.fire({
      title: 'Change Status',
      input: 'select',
      inputOptions: {
        SCHEDULED: 'SCHEDULED',
        START: 'START',
        ONGOING: 'ONGOING',
        COMPLETED: 'COMPLETED',
        INCOMPLETED: 'INCOMPLETED',
        CANCELED: 'CANCELED',
      },
      inputPlaceholder: `${prevStatus}`,
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === prevStatus) {
            resolve('You need to change status');
          } else {
            resolve();
          }
        });
      },
      confirmButtonColor: '#3085d6',
    });
    if (status) {
      setLoading(true);
      const data = { status };
      axios
        .patch(
          `${apiUrl}/projects/${projectId}/activity/${activityId}`,
          data,
          config,
        )
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            queryClient.invalidateQueries(['projects', projectId]);
            Swal.fire({
              title: 'Activity updated',
              icon: 'success',
              text: 'Activity  updated successfully!',
            });
            navigate(`/projects/${projectId}`);
          }
        })
        .catch((error) => {
          const message = getError(error);
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div className="max-w-full overflow-x-auto mt-10">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
              Name
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              type
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Start date
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              End date
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Status
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data?.map((data) => (
              <tr key={data._id}>
                <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                  <Link
                    to={`/projects/${projectId}/${data?._id}`}
                    className="font-medium text-black dark:text-white capitalize cursor-pointer"
                  >
                    {data?.name.slice(0, 14)}
                  </Link>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{data?.type}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDateString(data?.startDate)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDateString(data?.endDate)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <button
                    onClick={() => handleStatusChange(data._id, data.status)}
                    className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success cursor-pointer"
                  >
                    {data.status}
                  </button>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link
                      to={`/projects/${projectId}/${data?._id}`}
                      className="text-primary hover:text-primary/50"
                      title="details"
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default ActivityTable;
