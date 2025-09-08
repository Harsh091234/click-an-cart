import React from "react";
import CategoryItem from "../components/CategoryItem";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  // { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  return (
    <div className="h-full  px-3 py-3 text-black overflow-y-auto">
    <h1 className="mt-8 mb-3 text-center text-4xl font-bold text-sky-500">
    Explore Our Categories
  </h1>
  <p className="mt-2 mb-7  text-center text-gray-600">
    Discover the latest trends in eco-friendly fashion
  </p>

  <div className="flex flex-wrap justify-center px-10 gap-3">
    {categories.map(category => (
      <CategoryItem key={category.name} category={category} />
    ))}
  </div>
</div>

  );
};

export default HomePage;
