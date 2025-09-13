import React, { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import EmptyCart from "../components/EmptyCart";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";
import CartItemSkeleton from "../components/skeletons/CartItemSkeleton"
import OrderSummarySkeleton from "../components/skeletons/OrderSummarySkeleton"
import PeopleAlsoBoughtSkeleton from "../components/skeletons/PeopleAlsoBoughtSkeleton"



const CartPage = () => {
  const { cart, loading } = useCartStore();
   
  return (
    <div className="h-full py-5 px-6">
   
      <div className="h-full flex flex-col md:flex-row gap-7 justify-start overflow-y-auto">
         
           {cart.length === 0 ? (
            
             <div className=" h-full w-full">
             <EmptyCart />
          </div>
      ) : (
        <div className="h-full w-[100%] md:w-[60%] flex flex-col gap-2  ">
           <h1 className="text-2xl  font-semibold text-sky-500">
  Your Cart Items
</h1>   {loading? 
  <CartItemSkeleton /> :  cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))
}
         {cart.length > 0 && 
      (<div className=" hidden md:flex mt-4">
        <PeopleAlsoBought />
      </div>)
      }
          
        </div>
      )}
       {
        cart.length > 0 && (
          <div className="w-full  mt-20 md:mt-8 sm:w-[70%]  md:w-[33%]">
           <OrderSummary />
            
            <GiftCouponCard />
          </div>
        )
      }
      </div>
     
     

     
    </div>
  );
};

export default CartPage;
