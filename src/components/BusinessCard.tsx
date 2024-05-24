import { Suspense } from 'react';

const Card = ({ data }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-2 px-3 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="size-[400px]">
        <>
          <Suspense
            fallback={
              <img
                src={`https://ui-avatars.com/api/?name=${data?.name}`}
                alt="product image"
                className="object-contain rounded-t-xl"
              />
            }
          >
            <img
              src={`${data?.image}`}
              alt="product image"
              className=" object-contain rounded-t-xl"
            />
          </Suspense>
        </>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <p className="text-sm font-medium">{data?.category}</p>
      </div>
    </div>
  );
};

export default Card;
