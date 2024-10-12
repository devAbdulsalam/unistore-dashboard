import Breadcrumb from '../components/Breadcrumb.js';
import Loader from '../components/Loader.js';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import getError from '../hooks/getError.js';
import AuthContext from '../context/authContext.jsx';
import { fetchCategories } from '../hooks/axiosApis.js';
// import { categoriesData } from '../data.js';
const apiUrl = import.meta.env.VITE_API_URL;
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface FormData {
  [key: string]: string | Blob | number;
}

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  // const [price, setPrice] = useState<number>(100);
  const [quantity, setQuantity] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>('image');
  const validTypes = ['image/svg+xml', 'image/jpeg', 'image/png'];
  const isValidFileType = (file: File): boolean => {
    return validTypes.includes(file.type);
  };
  const { isLoading: categoryLoading, data: categoriesData } = useQuery({
    queryKey: ['category'],
    queryFn: () => fetchCategories(user),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (selectedFile) {
      if (!isValidFileType) {
        toast.error('Invalid file type. Please select a valid file.');
        event.target.value = '';
        return;
      }
      if (selectedFile.size > maxSize) {
        toast.error('Image size must be less than 10Mb');
        event.target.value = '';
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategory(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token || user.accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const handleSubmit = async () => {
    if (!name.trim()) {
      return toast.error('Product name is required!');
    }
    // if (!price > 0) {
    //   return toast.error('Product price is required!');
    // }
    if  (!quantity || isNaN(quantity) || quantity <= 0) {
      return toast.error('Product quantity is required!');
    }
    if (!category) {
      return toast.error('Product category is required!');
    }
    console.log('product data', category);

    if (!file) {
      return toast.error('Product image is required!');
    }
    const data: FormData = {
      name,
      quantity,
      userName,
      category: 'book',
      description,
    };

    setLoading(true);
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append('file', file);
    axios
      .post(`${apiUrl}/products`, formData, config)
      .then((res) => {
        if (res.data) {
          toast.success('Products added successfully');
        }
        queryClient.invalidateQueries({ queryKey: ['products'] });
        navigate('/products');
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

  return (
    <>
      <Breadcrumb pageName="Add Products" />

      <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add product
                </h3>
              </div>
              <div>
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Product name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      User <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter user"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Department
                    </label>
                    <textarea
                      rows={6}
                      value={description}
                      onChange={handleDescriptionChange}
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            {/* <!-- File upload --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  File upload
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter Product quantity   "
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-2.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={category}
                      onChange={handleCategoryChange}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Category</option>
                      {categoriesData?.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name || item.category}
                          </option>
                        );
                      })}
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
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Attach file
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="flex w-full justify-center rounded bg-primary p-3 mt-3 font-medium text-gray"
        >
          Add Product
        </button>
      </div>
      {loading || categoryLoading ? <Loader /> : ''}
    </>
  );
};

export default AddProduct;
