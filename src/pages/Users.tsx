import Breadcrumb from '../components/Breadcrumb.tsx';
import Table from '../components/UsersTable.tsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../components/Loader';
import { fetchUsers } from '../hooks/axiosApis';
import getError from '../hooks/getError';
import AuthContext from '../context/authContext';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => fetchUsers(user),
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
    navigate(`/users/${id}`);
  };
  const handleDelete = (id: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `These user would be deleted!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`${apiUrl}/admins/users/${id}`, config)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              queryClient.invalidateQueries(['admins', 'users']);
              Swal.fire({
                title: 'User deleted',
                icon: 'success',
                text: 'User Deleted successfully!',
              });
              navigate('/users');
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
      <Breadcrumb pageName="Users" />
      <div className="flex flex-col gap-10">
        <Table
          data={data || []}
          header="Users"
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
      {isLoading || loading ? <Loader /> : ''}
    </>
  );
};

export default Users;
