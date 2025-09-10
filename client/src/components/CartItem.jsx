import React from "react";
import { Trash2 } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const CartItem = ({ item, onDelete, onIncrement, onDecrement }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className=" flex items-center  bg-white p-2 rounded-xl shadow-sm mb-2.5 hover:shadow-md transition">
      {/* Product Image */}
      <div className="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-sky-50 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

   <div className="flex w-full  justify-between " >
     <div className="flex flex-col ml-2 ">
        <h1 className="text-lg font-semibold text-sky-600">{item.name}</h1>
        <p className="text-gray-500 text-sm">{item.description}</p>
        <button
          onClick={() => removeFromCart(item._id)}
          className="flex items-center gap-1 text-red-500 hover:text-red-600 mt-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Quantity Controls */}
      
      <div className="flex  items-center gap-7">
<div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
          className="px-2.5 py-0.5 font-bold  text-base  text-sky-600 rounded hover:bg-sky-100 transition"
        >
          -
        </button>
        <span className="text-sm font-semibold">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          className="px-2 font-bold py-0.5 text-base text-sky-600 rounded hover:bg-sky-100 transition"
        >
          +
        </button>

      </div>
      {/* Price */}
      <h1 className="text-base font-semibold text-sky-600 mr-2">${item.price}</h1>
      </div>
      
   </div>
     
    </div>
  );
};

export default CartItem;
