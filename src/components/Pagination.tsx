const Pagination = ({ data, setPage, page }) => {
  return (
    <nav
      className="flex items-center justify-between text-sm"
      aria-label="Page navigation example"
    >
      <p>
        Showing <strong>{page}</strong> of <strong>{data?.totalPages}</strong>
      </p>

      <ul className="list-style-none flex">
        <li>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 1}
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        {data?.previousPage && (
          <li>
            <button
              onClick={() => {
                if (data?.nextPage) {
                  setPage((old) => old - 1);
                }
              }}
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            >
              {page - 1}
            </button>
          </li>
        )}
        <li aria-current="page">
          <button className="relative block rounded bg-primary px-3 py-1.5 text-sm font-medium text-blue-700 transition-all duration-300">
            {page}
            <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
              (current)
            </span>
          </button>
        </li>
        {data?.nextPage && (
          <li>
            <button
              onClick={() => {
                if (data?.nextPage) {
                  setPage((old) => old + 1);
                }
              }}
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            >
              {page + 1}
            </button>
          </li>
        )}
        <li>
          <button
            onClick={() => {
              if (data?.nextPage) {
                setPage((old) => old + 1);
              }
            }}
            disabled={!data?.nextPage}
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
