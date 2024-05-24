import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useContext } from 'react';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';
import getError from '../hooks/getError';
import AuthContext from '../context/authContext';
import { fetchOrder } from '../hooks/axiosApis';
import { useParams, useNavigate, Link } from 'react-router-dom';
// import Card from '../components/CardTable';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
import DeleteToolTip from '../components/DeleteToolTip';
import EditTooltip from '../components/EditTooltip';

const Order = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const info = { token: user?.token || user.accessToken, id };
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['orders', id],
    queryFn: () => fetchOrder(info),
  });

  useEffect(() => {
    if (data) {
      console.log(data?.resources);
    }
    if (error || isError) {
      const message = getError(error);
      console.log(message);
    }
  }, [data, error, isError]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token || user.accessToken}`,
    },
  };
  const handelEdit = async () => {
    const { value: status } = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: {
        APPROVED: 'APPROVED',
        PENDING: 'PENDING',
        REJECT: 'REJECT',
      },
      inputPlaceholder: 'Select a status',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
          } else {
            resolve('You need to select a status :)');
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        setLoading(true);
        axios
          .patch(`${apiUrl}/orders/${id}`, {data: result.value}, config)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              queryClient.invalidateQueries({ queryKey: ['orders', id] });
              Swal.fire({
                title: 'order Up',
                icon: 'success',
                text: `Order is ${result.value} successfully!`,
              });
              navigate('/orders');
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
  const handelDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `These order would be deleted!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`${apiUrl}/orders/${id}`, config)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              queryClient.invalidateQueries(['orders', id]);
              Swal.fire({
                title: 'order deleted',
                icon: 'success',
                text: 'order deleted successfully!',
              });
              navigate('/orders');
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
      <Breadcrumb pageName="Order" />
      <div className="flex justify-between my-2 bg-white rounded p-2 px-2">
        <h2 className="text-title-md font-bold text-black dark:text-white">
          Name: {data?.product?.name}
        </h2>
        {user?.user?.role === 'ADMIN' && (
          <div className="flex gap-2 text-center">
            <EditTooltip handleEdit={handelEdit} />
            <DeleteToolTip handleDelete={handelDelete} />
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Order info:</h3>
        <div>
          <p>Order Quantity: {data?.quantity}</p>
          <p>Total Price: {data?.total}</p>
          <h3 className="font-semibold my-2">Product info:</h3>
          <Link to={`/products/${data?.product_id}`}>
            Product Name: {data?.product?.name}
          </Link>
          <p>Product Description: {data?.product?.description}</p>
          <p>Product Quantity: {data?.product?.quantity}</p>
          <p>Price: {data?.product?.price}</p>
          {user?.user?.role === 'ADMIN' && (
            <>
              <h3 className="font-semibold my-2">user info:</h3>
              <Link to={`/users/${data?.user_id}`}>
                Name: {data?.user?.username}
              </Link>
              <p>User role: {data?.user?.role}</p>
              <p>Email: {data?.user?.email}</p>
              <p>Address: {data?.user?.phone}</p>
            </>
          )}
        </div>
      </div>
      {isLoading || loading ? <Loader /> : ''}
    </>
  );
};

export default Order;
