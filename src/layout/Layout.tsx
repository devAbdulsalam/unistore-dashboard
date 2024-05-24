import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <div className="relative h-full">
      <Outlet />
    </div>
  );
};

export default Layout;
