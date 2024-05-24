import { Link } from 'react-router-dom';

const Card = ({ data }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-2 px-3 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mx-auto">
        <Link to={`/business/${data?._id}`} className="size-[250px] mx-auto">
          <img
            src={data?.logo?.url}
            alt="fileImage"
            className="h-full object-fit"
          />
        </Link>
      </div>
      <div className="my-3 flex flex-col items-start">
        <div>
          <Link
            to={`/business/${data?._id}`}
            className="text-title-md font-bold text-black dark:text-white"
          >
            {data?.name}
          </Link>
        </div>
        <p className="text-sm font-medium">{data?.status}</p>
        <p className="text-sm font-medium ">
          Claimed :{data?.claimed ? 'True' : 'False'}
        </p>
        <p className="text-sm font-medium">
          totalReviews: {data?.totalReviews}
        </p>
        <p className="text-sm font-medium">
          average Rating: {data?.averageRating}
        </p>
      </div>
    </div>
  );
};

export default Card;
