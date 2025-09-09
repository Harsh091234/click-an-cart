import React from 'react';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const CartItem = ({ item, onDelete, onIncrement, onDecrement }) => {
const {removeFromCart} = useCartStore();

   


  return (
    <div className=" flex items-center justify-between bg-white p-4 rounded-xl shadow-md mb-2.5 hover:shadow-lg transition">
      
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-sky-50 flex items-center justify-center">
        <img
          src={item.image }
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 ml-4">
        <h1 className="text-lg font-semibold text-sky-700">{item.name}</h1>
        <p className="text-gray-500 text-sm">{item.description }</p>
        <button
          onClick={() => removeFromCart(item._id)}
          className="flex items-center gap-1 text-red-500 hover:text-red-600 mt-2"
        >
          <Trash2 className="w-4 h-4" />
          
        </button>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 mr-24">
        <button
          onClick={onDecrement}
          className="px-2.5 py-0.5 font-bold  bg-sky-100 text-sky-700 rounded hover:bg-sky-200 transition"
        >
          -
        </button>
        <span className="text-sm font-semibold">{item.quantity }</span>
        <button
          onClick={onIncrement}
          className="px-2 font-bold py-0.5 bg-sky-100 text-sky-700 rounded hover:bg-sky-200 transition"
        >
          +
        </button>
      </div>

      {/* Price */}
      <h1 className="text-base font-semibold text-sky-700">${item.price}</h1>
    </div>
  );
};

export default CartItem;
