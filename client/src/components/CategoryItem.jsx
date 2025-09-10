import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative bg-sky-500 h-60 w-60 overflow-hidden group rounded-xl shadow-lg">
      <Link to={`/category${category.href}`} className="block relative h-full w-full">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0  group-hover:bg-black/15 transition-colors duration-500"></div>

        {/* Text overlay */}
           <div className="absolute bottom-3 left-3">
          <h1 className="text-lg font-semibold text-white drop-shadow-lg">{category.name}</h1>
          <p className="text-sm text-gray-100 drop-shadow-lg">Explore {category.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
