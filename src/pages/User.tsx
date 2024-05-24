import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/authContext';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';
import getError from '../hooks/getError';
import { fetchUser } from '../hooks/axiosApis';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
import DeleteToolTip from '../components/DeleteToolTip';
import EditTooltip from '../components/EditTooltip';

const User = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const info = { token: user?.token || user.accessToken, id };
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['users', 'admins', id],
    queryFn: () => fetchUser(info),
  });

  useEffect(() => {
    if (data) {
      setResult(data.user || data);
      navigate(`/users/${id}`);
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
  const handleEdit = () => {
    // console.log(id);
    navigate(`/users/${id}`);
  };
  const handelDelete = () => {
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
          .delete(`${apiUrl}/users/${id}`, config)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              queryClient.invalidateQueries(['users', 'admins', id]);
              Swal.fire({
                title: 'User deleted',
                icon: 'success',
                text: 'User deleted successfully!',
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
      <Breadcrumb pageName="User" />
      <div className="flex justify-between my-2 bg-white rounded p-2 px-2">
        <h2 className="text-title-md font-bold text-black dark:text-white">
          Name: {result?.username}
        </h2>
        <div className="flex gap-2 text-center items-center">
          <EditTooltip handleEdit={handleEdit} />
          <DeleteToolTip handleDelete={handelDelete} />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">User info:</h3>
        <div>
          <p>User role: {result?.role}</p>
          <p>Email: {result?.email}</p>
          <p>Phone: {result?.phone}</p>
        </div>
      </div>
      {isLoading || loading ? <Loader /> : ''}
    </>
  );
};

export default User;
