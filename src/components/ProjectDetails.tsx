import { Link } from 'react-router-dom';
import formatDateString from '../hooks/formatDateString.js';

const ProjectDetails = ({ data }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="">
          <div>
            <Link
              to={`/projects/${data?._id}`}
              className="size-[250px] md:w-full mx-auto"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${data?.name}`}
                alt="document"
                className="h-60 w-72 md:w-full object-cover rounded-t-xl"
              />
            </Link>
          </div>
          <div className="my-3">
            <div className="text-title-md text-black dark:text-white">
              Name:
              <span className="font-bold"> {data?.name} </span>
            </div>
          </div>
        </div>
        <div className="flex md:justify-center flex-col">
          <div>
            <h3 className="font-semibold">Project info:</h3>
          </div>
          <div>
            <p className="text-sm font-medium">Type: {data?.type}</p>
            <p className="text-sm font-medium">
              Start date: {formatDateString(data?.startDate)}
            </p>
            <p className="text-sm font-medium">
              End date :{formatDateString(data?.endDate)}
            </p>
          </div>
        </div>
      </div>
      <div className="my-2">
        <p className="text-title-sm font-medium">Description:</p>
        <p className="text-sm font-bold mt-2">{data?.description}</p>
      </div>
    </>
  );
};

export default ProjectDetails;
