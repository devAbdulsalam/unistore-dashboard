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
  [key: string]: string | Blob;
}

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [price, setPrice] = useState<number>(100);
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
    if (!price > 0) {
      return toast.error('Product price is required!');
    }
    if (!quantity > 0) {
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
      description,
    };

    setLoading(true);
    axios
      .post(`${apiUrl}/order`, data, config)
      .then((res) => {
        if (res.data) {
          toast.success('Products added successfully');
        }
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        navigate('/orders');
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
                  New Order
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
                      placeholder="Enter name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Quantity <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter quantity"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Description
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
        </div>
        <button
          onClick={handleSubmit}
          className="flex w-full justify-center rounded bg-primary p-3 mt-3 font-medium text-gray"
        >
          Add Order
        </button>
      </div>
      {loading || categoryLoading ? <Loader /> : ''}
    </>
  );
};

export default AddProduct;
