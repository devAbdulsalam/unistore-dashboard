import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useContext } from 'react';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb2';
import ProductTable from '../components/ProductTable';
// import Pagination from '../components/Pagination';
import getError from '../hooks/getError';
import AuthContext from '../context/authContext';
// import { fetchBusinesses } from '../hooks/axiosApis';
import { fetchProducts } from '../hooks/axiosApis';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Products = () => {
  // const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const info = { token: user?.token || user.accessToken };
  const { error, isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(info),
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (data) {
      console.log('pro datatt', data);
    }
    if (error) {
      const message = getError(error);
      console.log(message);
    }
  }, [data, error]);

  const handleEdit = (id) => {
    // console.log('edit');
    navigate(`/products/${id}/edit-product`);
  };
  const handleDelete = (id) => {
    // console.log('delete');
    navigate(`/products/${id}`);
  };
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token || user.accessToken}`,
    },
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  const handleCart = async (id) => {
    const product = data.find((p) => p.id == id);
    if (!product) {
      return toast.error('Product not found');
    }
    if (product.quantity == 0) {
      return toast.error('Product not available');
    }
    Swal.fire({
      title: 'Enter your order quantity',
      input: 'number',
      inputLabel: 'Order qunatity',
      inputValue: 0,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to add quantity!';
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const quantity = Number(result.value);
        const order = {
          user_id: user.user.id,
          product_id: id,
          quantity,
          total: Number(product.price * quantity),
          status: 'PENDING',
        };

        console.log('order', order);
        if (quantity < 1) {
          return Swal.fire(`Quantity is required`);
        }
        if (quantity > product.quantity) {
          return Swal.fire('Not enough product quantity available');
        }

        setLoading(true);
        axios
          .post(`${apiUrl}/orders`, order, config)
          .then((res) => res.data)
          .then((data) => {
            // console.log('order data', data);
            queryClient.invalidateQueries({ queryKey: ['products', id] });
            return Swal.fire('Not enough product quantity available');
          })
          .catch((error) => {
            console.error(error);
            const message = getError(error);
            toast.error(message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  return (
    <div className="relative min-h-[800px]">
      <Breadcrumb
        pageName="Products"
        link="products/add-product"
        linkName="add product"
      />
      <ProductTable
        data={data}
        header="Products"
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleCart={handleCart}
      />
      {isLoading || loading ? <Loader /> : ''}
    </div>
  );
};

export default Products;
