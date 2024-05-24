import { Link } from 'react-router-dom';
import AuthContext from '../context/authContext';
import { useContext } from 'react';
interface BreadcrumbProps {
  pageName: string;
  linkName: string;
  link: string;
}
const Breadcrumb = ({ pageName, link, linkName }: BreadcrumbProps) => {  
  const { user } = useContext(AuthContext);
  return (
    <div className="mb-6">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/">Dashboard /</Link>
            </li>
            <li className="text-primary">{pageName}</li>
          </ol>
        </nav>
        {user?.user?.role === 'ADMIN' && (
          <Link
            to={`/${link}`}
            className="capitalize flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-80"
          >
            {linkName}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
