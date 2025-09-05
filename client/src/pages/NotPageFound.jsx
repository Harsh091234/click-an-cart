import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 ">
      {/* Illustration */}
      <img
        className="w-60 sm:w-72 md:w-80 mb-6"
        src="/undraw_feeling-blue_8si6.svg"
        alt="Page not found"
      />

      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl md:text-6xl font-extrabold text-sky-500">
        404
      </h1>

      {/* Subtitle */}
      <p className="mt-1 text-sm text-center md:text-lg text-gray-500 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <div className="mt-3 w-full lg:max-w-[13rem]">
        <Link
          to="/"
          className="flex  justify-center items-center gap-2 px-5 py-2 lg:py-2.5 bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-600 transition text-xs lg:text-sm   font-medium"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
