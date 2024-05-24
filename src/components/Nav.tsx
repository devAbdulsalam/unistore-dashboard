import logo from '../images/logo/logo-dark.png';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav
      className={`w-full mt-0 ${
        pathname !== '/' ? 'bg-primary' : 'transparent'
      }`}
    >
      <div className="w-full md:w-4/6 mx-auto bg-gray-500 rounded-md mt-2 p-2 flex justify-between items-center">
        <div className="">
          <NavLink
            to="/"
            className="rounded-md hover:bg-slate-300/10 text-white hover:text-primary-light transition duration-500 ease-in"
          >
            <img src={logo} alt="ischool logo" className="" />
          </NavLink>
        </div>
        <ul className="flex justify-end gap-2 md:gap-5 items-center">
          {(pathname === '/' || pathname.includes('dashboard')) && (
            <li className="text-lg md:text-xl py-2 px-3 font-semibold rounded-md hover:bg-slate-300/10 text-white hover:text-primary-light transition duration-500 ease-in">
              <Link to="#contact">About</Link>
            </li>
          )}
          {(pathname === '/' || !pathname.includes('signin')) && (
            <li className="text-lg md:text-xl py-2 px-3 font-semibold rounded-md hover:bg-slate-300/10 text-white hover:text-primary-light transition duration-500 ease-in">
              <NavLink to="/auth/signin">Login</NavLink>
            </li>
          )}
          {(pathname === '/' || !pathname.includes('signup')) && (
            <li className="text-lg md:text-xl py-2 px-3 font-semibold rounded-md hover:bg-slate-300/10 text-white hover:text-primary-light transition duration-500 ease-in">
              <NavLink to="/auth/signup">Signup </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
