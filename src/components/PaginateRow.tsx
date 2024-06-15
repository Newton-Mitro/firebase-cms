const { floor, min, max } = Math;
const range = (lo: number, hi: number) =>
  Array.from({ length: hi - lo }, (_, i) => i + lo);

const pagination =
  (count: number, ellipsis = "…") =>
  (page: number, total: number) => {
    const start = max(1, min(page - floor((count - 3) / 2), total - count + 2));
    const end = min(total, max(page + floor((count - 2) / 2), count - 1));
    return [
      ...(start > 2 ? [1, ellipsis] : start > 1 ? [1] : []),
      ...range(start, end + 1),
      ...(end < total - 1 ? [ellipsis, total] : end < total ? [total] : []),
    ];
  };

function PaginateRow({
  totalRecords,
  limit,
  setLimit,
  currentViewStartFrom,
  setCurrentViewStartFrom,
  activeView,
  firstView,
  lastView,
  previousView,
  nextView,
  totalView,
}: any) {
  const paginatePages = pagination(6)(activeView, totalView);

  return (
    <div className="mt-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <select
          className="py-0.5 w-20 bg-primary border border-borderColor shadow-sm focus:border-borderColor focus:ring focus:ring-gray-700 focus:ring-opacity-50"
          name="limit"
          id="limit"
          value={limit}
          onChange={(e) => {
            setLimit(parseInt(e.target.value));
          }}
        >
          <option className="odd:bg-accent even:bg-gray-900" value={10}>
            10
          </option>
          <option className="odd:bg-accent even:bg-gray-900" value={50}>
            50
          </option>
          <option className="odd:bg-accent even:bg-gray-900" value={100}>
            100
          </option>
          <option className="odd:bg-accent even:bg-gray-900" value={500}>
            500
          </option>
          <option className="odd:bg-accent even:bg-gray-900" value={1000}>
            1000
          </option>
        </select>
        <div className="">
          {`showing ${
            currentViewStartFrom === 1
              ? currentViewStartFrom
              : limit * currentViewStartFrom - limit + 1 > totalRecords
              ? totalRecords
              : limit * currentViewStartFrom - limit + 1
          } to ${
            currentViewStartFrom * limit > totalRecords
              ? totalRecords
              : currentViewStartFrom * limit
          } out of ${totalRecords} records`}
        </div>
      </div>
      <nav
        className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
        aria-label="Pagination"
      >
        <button
          type="button"
          className="hidden md:flex w-8 h-8 mr-1 justify-center items-center 
                disabled:bg-disabledColor rounded-full border border-borderColor hover:border-gray-300"
          disabled={currentViewStartFrom === 1 ? true : false}
          title="First Page"
          onClick={() => {
            setCurrentViewStartFrom(firstView);
          }}
        >
          <span className="sr-only">First Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </button>
        <button
          type="button"
          className="flex w-8 h-8 mr-1 justify-center items-center 
                disabled:bg-disabledColor rounded-full border border-borderColor hover:border-gray-300"
          title="Previous Page"
          disabled={currentViewStartFrom > 1 ? false : true}
          onClick={() => {
            setCurrentViewStartFrom(previousView);
          }}
        >
          <span className="sr-only">Previous Page</span>
          <svg
            className="block w-4 h-4 fill-current"
            viewBox="0 0 256 512"
            aria-hidden="true"
            role="presentation"
          >
            <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
          </svg>
        </button>
        {paginatePages.map((page) => {
          if (typeof page === "number") {
            return (
              <button
                key={page}
                className={`hidden md:flex w-8 h-8 mx-1 justify-center items-center 
                      ${
                        activeView === page
                          ? "border-green-800"
                          : "border-borderColor"
                      } rounded-full border  hover:border-gray-300`}
                type="button"
                title={`page - ${page}`}
                onClick={() => {
                  setCurrentViewStartFrom(page);
                }}
              >
                {page}
              </button>
            );
          } else {
            return (
              <div key={page} className="hidden md:flex">
                {page}
              </div>
            );
          }
        })}

        <button
          className="flex w-8 h-8 mr-1 justify-center items-center 
                disabled:bg-disabledColor rounded-full border border-borderColor hover:border-gray-300"
          type="button"
          title="Next Page"
          disabled={currentViewStartFrom < totalView ? false : true}
          onClick={() => {
            setCurrentViewStartFrom(nextView);
          }}
        >
          <span className="sr-only">Next Page</span>
          <svg
            className="block w-4 h-4 fill-current"
            viewBox="0 0 256 512"
            aria-hidden="true"
            role="presentation"
          >
            <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
          </svg>
        </button>
        <button
          type="button"
          className="hidden md:flex w-8 h-8 mr-1 justify-center items-center 
                disabled:bg-disabledColor rounded-full border border-borderColor hover:border-gray-300"
          title="Last Page"
          disabled={currentViewStartFrom === lastView ? true : false}
          onClick={() => {
            setCurrentViewStartFrom(lastView);
          }}
        >
          <span className="sr-only">Last Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}

export default PaginateRow;
