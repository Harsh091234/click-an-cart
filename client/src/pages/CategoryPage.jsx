import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
    const  { fetchProductsByCategory, products} = useProductStore();
    const {category} = useParams();
    useEffect(() => {
            fetchProductsByCategory(category);
    }, [fetchProductsByCategory])
  return (
   <div className="h-full p-6 ">
  {/* Category Heading */}
    <h1 className="text-3xl font-bold text-sky-600 mb-6   text-center capitalize">
    {category}
  </h1>


  {/* Products Grid */}
  <div className="flex flex-wrap gap-6">
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
  </div>
</div>

  )
}

export default CategoryPage