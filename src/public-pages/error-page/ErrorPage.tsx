import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-secondary text-gray-300">
      <div className="text-center">
        <div className="flex justify-center my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
        <h1 className="display text-3xl">404</h1>
        <p className="fs-3">
          <span className="text-red-600">Opps!</span> Page not found.
        </p>
        <p className="pb-2">The page you’re looking for doesn’t exist.</p>
        <Link to="/">
          <button className="p-2 border bg-accent border-borderColor rounded-sm hover:bg-zinc-900 text-gray-300">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
