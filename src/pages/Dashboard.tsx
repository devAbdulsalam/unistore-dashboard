import CardFour from '../components/CardFour.tsx';
import CardOne from '../components/CardOne.tsx';
import CardThree from '../components/CardThree.tsx';
import CardTwo from '../components/CardTwo.tsx';
import ChartOne from '../components/ChartOne.tsx';
import ChartThree from '../components/ChartThree.tsx';
import ChartTwo from '../components/ChartTwo.tsx';
import ProductTable from '../components/ProductTable';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '../hooks/axiosApis.js';
import Loader from '../components/Loader.tsx';
import getError from '../hooks/getError.js';
import AuthContext from '../context/authContext.jsx';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => fetchDashboard(user),
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      const message = getError(error);
      console.log(message);
    }
  }, [data, error]);
  const handleEdit = (id) => {
    navigate(`/products/${id}/edit-product`);
  };
  const handleDelete = (id) => {
    navigate(`/products/${id}`);
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardFour data={data?.totalUsers} />
        <CardTwo data={data?.totalProducts} />
        <CardOne data={data?.totalListing} />
        <CardThree data={data?.totalOrders} />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne data={data} />
        <ChartTwo data={data} />
        <ChartThree data={data} />
        <div className="col-span-12 xl:col-span-6">
          {/* <TableOne products={data?.products} /> */}
          <ProductTable
            data={data?.products}
            header="Products"
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      {isLoading ? <Loader /> : ''}
    </>
  );
};

export default Dashboard;
