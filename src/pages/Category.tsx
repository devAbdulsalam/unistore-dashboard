import Breadcrumb from '../components/Breadcrumb';
import { useState, useContext, useEffect } from 'react';
import Table from '../components/AmenityTable.tsx';
import { fetchCategories } from '../hooks/axiosApis.js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../components/Loader.tsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import getError from '../hooks/getError';
import AuthContext from '../context/authContext';
const apiUrl = import.meta.env.VITE_API_URL;
import Swal from 'sweetalert2';
interface FormData {
  [key: string]: string | Blob;
}
const Category = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<string>('ACTIVE');
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ['category'],
    queryFn: async () => fetchCategories(user),
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      const message = getError(error);
      console.log(message);
    }
  }, [data, error]);
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token || user.accessToken}`,
    },
  };
  const handleSubmit = async () => {
    if (!name.trim()) {
      return toast.error('Name is required!');
    }
    const data: FormData = {
      category: name,
      status,
    };
    setLoading(true);
    axios
      .post(`${apiUrl}/products/categories`, data, config)
      .then((res) => {
        if (res.data) {
          toast.success('New Category added successfully');
        }
        queryClient.invalidateQueries({ queryKey: ['category'] });
      })
      .catch((error) => {
        console.error(error);
        const message = getError(error);
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleEdit = (id: any) => {
    console.log(id);
    // navigate(`/adverts/${id}`);
  };
  const handleDelete = (id: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `These Category would be deleted!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`${apiUrl}/products/categories/${id}`, config)
          .then((res) => {
            if (res.data) {
              // console.log(res.data);
              queryClient.invalidateQueries({ queryKey: ['category'] });
              Swal.fire({
                title: 'Category deleted',
                icon: 'success',
                text: 'Category deleted successfully!',
              });
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
    });
  };
  return (
    <>
      <Breadcrumb pageName="Category" />
      <div className="flex flex-col gap-10">
        <Table
          data={data}
          user={user}
          header="Category"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Category info
                </h3>
              </div>
              <div>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={handleTitleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Status
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        value={status}
                        onChange={handleStatusChange}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select Status</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="flex w-full justify-center rounded bg-primary p-3 mt-3 font-medium text-gray"
        >
          Add Category
        </button>
      </div>
      {loading || isLoading ? <Loader /> : ''}
    </>
  );
};

export default Category;
