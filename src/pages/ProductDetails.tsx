import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/authContext';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';
import getError from '../hooks/getError';
import { fetchProduct } from '../hooks/axiosApis';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Card from '../components/BusinessCard';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
import DeleteToolTip from '../components/DeleteToolTip';
import EditTooltip from '../components/EditTooltip';
import toast from 'react-hot-toast';
import { BsCart } from 'react-icons/bs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';

const Business = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const info = { token: user?.token || user.accessToken, id };
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProduct(info),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
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
    navigate(`/products/${id}/edit-product`);
  };
  const handelDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `These products would be deleted!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`${apiUrl}/products/${id}`, config)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              queryClient.invalidateQueries(['products', id]);
              Swal.fire({
                title: 'Product deleted',
                icon: 'success',
                text: 'Product deleted successfully!',
              });
              navigate('/products');
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
  const handleCart = async () => {
    const product = data;
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
  const downloadPDF = (name: any) => {
    const table = document.getElementById(name);

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      // const imgWidth = 300;
      // const pageHeight = 290;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${name}-${id}.pdf`);
    });
  };

  const handlePrint = async () => {
    await downloadPDF('receipt');
  };

  return (
    <>
      <Breadcrumb pageName="Product" />
      <div className="flex justify-between my-2 bg-white rounded p-2 px-2">
        <h2 className="text-title-md font-bold text-black dark:text-white">
          Name: {data?.name}
        </h2>
        {user?.user?.role === 'ADMIN' ? (
          <div className="flex gap-2 text-center items-center">
            <EditTooltip handleEdit={handleEdit} />
            <DeleteToolTip handleDelete={handelDelete} />
          </div>
        ) : (
          <div className="flex gap-2 text-center items-center">
            <BsCart
              className="edit-btn cursor-pointer mx-auto"
              onClick={handleCart}
            />
          </div>
        )}
      </div>
      <div id="receipt" className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <Card data={data} />
        </div>
        <div>
          <h3 className="font-semibold mb-2 mt-4">Product info:</h3>
          <div className="space-y-2">
            <p>
              Deliverd By: <span className="capitalize">{data?.category}</span>
            </p>
            <p>Department: {data?.description}</p>
            <p>Quantity: {data?.quantity}</p>
            <p>Date: {moment(data?.createdAt).format('Do MMM YYYY')}</p>
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="flex w-full justify-center rounded bg-primary p-3 mt-3 font-medium text-gray"
        >
          Print
        </button>
      </div>
      {isLoading || loading ? <Loader /> : ''}
    </>
  );
};

export default Business;
