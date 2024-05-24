import { Link } from 'react-router-dom';

const Card = ({ project }) => {
  return (
    <>
      {project?.length > 0 &&
        project.map((data: any) => (
          <div
            key={data._id}
            className="rounded-sm border border-stroke bg-white py-2 px-3 shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <div>
              <Link
                to={`/projects/${data?._id}`}
                className="size-[250px] mx-auto"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${data?.name}`}
                  alt="project"
                  className="h-80 w-72 object-cover rounded-t-xl"
                />
              </Link>
            </div>
            <div className="my-3">
              <div>
                <Link
                  to={`/projects/${data?._id}`}
                  className="text-title-md font-bold text-black dark:text-white"
                >
                  {data?.name?.slice(0, 14)}
                </Link>
              </div>
              <div>
                <p className="text-sm font-medium">{data?.type}</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Card;
