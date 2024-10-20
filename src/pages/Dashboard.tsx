import CardFour from '../components/CardFour.tsx';
import CardThree from '../components/CardThree.tsx';
import CardTwo from '../components/CardTwo.tsx';
import OrderModal from '../components/OrderModal.jsx';
import ProductTable from '../components/ProductTable';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchDashboard } from '../hooks/axiosApis.js';
import Loader from '../components/Loader.tsx';
import getError from '../hooks/getError.js';
import AuthContext from '../context/authContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isModal, setIsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({});
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => fetchDashboard(user),
  });
  const navigate = useNavigate();
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
  const handleEdit = (id) => {
    navigate(`/products/${id}/edit-product`);
  };
  const handleDelete = (id) => {
    navigate(`/products/${id}`);
  };
  const apiUrl = import.meta.env.VITE_API_URL;
  // const handleCart = async (id) => {
  //   const product = data.find((p) => p.id == id);
  //   if (!product) {
  //     return toast.error('Product not found');
  //   }
  //   if (product.quantity == 0) {
  //     return toast.error('Product not available');
  //   }
  //   Swal.fire({
  //     title: 'Enter your order quantity',
  //     input: 'number',
  //     inputLabel: 'Order qunatity',
  //     inputValue: 0,
  //     showCancelButton: true,
  //     inputValidator: (value) => {
  //       if (!value) {
  //         return 'You need to add quantity!';
  //       }
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed && result.value) {
  //       const quantity = Number(result.value);
  //       const order = {
  //         user_id: user.user.id,
  //         product_id: id,
  //         quantity,
  //         total: Number(product.price * quantity),
  //         status: 'PENDING',
  //       };

  //       console.log('order', order);
  //       if (quantity < 1) {
  //         return Swal.fire(`Quantity is required`);
  //       }
  //       if (quantity > product.quantity) {
  //         return Swal.fire('Not enough product quantity available');
  //       }

  //       setLoading(true);
  //       axios
  //         .post(`${apiUrl}/orders`, order, config)
  //         .then((res) => res.data)
  //         .then((data) => {
  //           // console.log('order data', data);
  //           queryClient.invalidateQueries({ queryKey: ['products', id] });
  //           return Swal.fire('Order successfully');
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           const message = getError(error);
  //           toast.error(message);
  //         })
  //         .finally(() => {
  //           setLoading(false);
  //         });
  //     }
  //   });
  // };
  const handleCart = async (product) => {
    setAccount(() => product);
    setIsModal(true);
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardFour data={data?.totalUsers} />
        <CardTwo data={data?.totalProducts} />
        {/* <CardOne data={data?.totalListing} /> */}
        <CardThree data={data?.totalOrders} />
      </div>

      <div className="mt-4 grid  gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <div className="col-span-12 xl:col-span-6"> */}
        {/* <TableOne products={data?.products} /> */}
        <ProductTable
          data={data?.products}
          header="Products"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleCart={handleCart}
        />
        <OrderModal
          show={isModal}
          setShow={setIsModal}
          setLoading={setLoading}
          loading={isLoading}
          account={account}
        />
      </div>
      {isLoading || loading ? <Loader /> : ''}
    </>
  );
};

export default Dashboard;
