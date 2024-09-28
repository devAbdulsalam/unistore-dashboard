import Breadcrumb from '../components/Breadcrumb3.js';
import Loader from '../components/Loader.js';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import getError from '../hooks/getError.js';
import { fetchProduct, fetchCategories } from '../hooks/axiosApis.js';
import AuthContext from '../context/authContext.jsx';
// import { categoriesData } from '../data.js';
const apiUrl = import.meta.env.VITE_API_URL;
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface FormData {
  [key: string]: string | Blob;
}

const EditProduct = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const info = { token: user?.token || user.accessToken, id };
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProduct(info),
  });
  const { isLoading: categoryLoading, data: categoriesData } = useQuery({
    queryKey: ['category'],
    queryFn: () => fetchCategories(user),
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState<string>(data?.name || '');
  const [description, setDescription] = useState<string>(data?.description);
  const [price, setPrice] = useState<string>(data?.price);
  const [quantity, setQuantity] = useState<string>(data?.quantity);
  const [category, setCategory] = useState<string>(data?.category);
  useEffect(() => {
    if (data) {
      console.log(data);
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setQuantity(data.quantity);
      // setCategory(data.category);
      // navigate(`/products/${id}/edit-product`);
    }
    if (error || isError) {
      const message = getError(error);
      console.log(message);
    }
  }, [data, error, isError]);
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

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token || user.accessToken}`,
    },
  };
  const handleSubmit = async () => {
    if (!name.trim()) {
      return toast.error('Product name is required!');
    }
    if (!description) {
      return toast.error('Product description is required!');
    }
    if (!price) {
      return toast.error('Product price is required!');
    }
    console.log('category, evlent.target.value', category);
    if (!category) {
      return toast.error('Product Category is required!');
    }
    if (!quantity) {
      return toast.error('Product price is required!');
    }
    const data: FormData = {
      name,
      price,
      quantity,
      category_id: category,
      description,
    };
    setLoading(true);
    axios
      .put(`${apiUrl}/products/${id}`, data, config)
      .then((res) => {
        if (res.data) {
          toast.success('Product updated successfully');
        }
        queryClient.invalidateQueries({ queryKey: ['product', id] });
        navigate(`/products/${id}`);
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
      <Breadcrumb
        parent="Product"
        link={`products/${id}`}
        pageName="Edit Product"
      />

      <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Product info
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
          <div className="flex flex-col gap-9">
            {/* <!-- File upload --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Product details
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                {/* <div className="">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter Product title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div> */}
                <div className="">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter Product title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value=""
                      onChange={handleCategoryChange}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      {categoriesData?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name || item.category}
                        </option>
                      ))}
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
        <button
          onClick={handleSubmit}
          className="flex w-full justify-center rounded bg-primary p-3 mt-3 font-medium text-gray"
        >
          Update Product
        </button>
      </div>
      {loading || isLoading || categoryLoading ? <Loader /> : ''}
    </>
  );
};

export default EditProduct;
