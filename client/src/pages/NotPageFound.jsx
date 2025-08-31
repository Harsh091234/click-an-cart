import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-7xl font-extrabold text-emerald-500">404</h1>
      <p className="mt-4 text-xl text-gray-300">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <div className="mt-6">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl shadow-md hover:bg-emerald-700 transition"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

     
    </div>
  );
};

export default NotFoundPage;
