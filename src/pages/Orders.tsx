import Breadcrumb from '../components/Breadcrumb.tsx';
import Table from '../components/Table.tsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../components/Loader.tsx';
import { fetchOrders } from '../hooks/axiosApis.js';
import getError from '../hooks/getError.js';
import AuthContext from '../context/authContext.jsx';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => fetchOrders(user),
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
      Authorization: `Bearer ${user?.token || user?.accessToken}`,
    },
  };
  const handleEdit = (id: any) => {
    navigate(`/orders/${id}`);
  };
  const handleDelete = (id: any) => {
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
              queryClient.invalidateQueries({ queryKey: ['users'] });
              Swal.fire({
                title: 'Order deleted',
                icon: 'success',
                text: 'Order Deleted successfully!',
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
      <Breadcrumb pageName="Orders" />
      <div className="flex flex-col gap-10">
        <Table
          data={data}
          user={user}
          header="Orders"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
      {isLoading || loading ? <Loader /> : ''}
    </>
  );
};

export default Orders;
