import React, { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import EmptyCart from "../components/EmptyCart";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";
import CartItemSkeleton from "../components/skeletons/CartItemSkeleton";
import OrderSummarySkeleton from "../components/skeletons/OrderSummarySkeleton";
import PeopleAlsoBoughtSkeleton from "../components/skeletons/PeopleAlsoBoughtSkeleton";

const CartPage = () => {
  const { cart, loading } = useCartStore();

  if(cart.length === 0) return  <div className=" h-full w-full ">
          <EmptyCart />
        </div>
  return (
   
      <div className="bg-green-50 h-full flex flex-col md:flex-row  overflow-y-auto py-4 px-7 gap-3 md:gap-10">

    
        <div className=" w-[100%] md:w-[60%] flex flex-col gap-2  ">
          <h1 className="text-2xl  font-semibold text-sky-500">
            Your Cart Items
          </h1>{" "}
          <div className="">
             {loading ? (
            <CartItemSkeleton />
          ) : (
            
            cart.map((item) => <CartItem key={item._id} item={item} />)
          )}
          </div>
         
         
            <div className=" hidden md:flex mt-3 pb-7 ">
              <PeopleAlsoBought />
            </div>
        
        </div>
    

  
    <div className="w-full  md:mt-8 sm:w-[70%]  md:w-[33%]">
  
       
          <OrderSummary />

          <GiftCouponCard />
      
  
    </div>
    
    </div>
  );
};

export default CartPage;
