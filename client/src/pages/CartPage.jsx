import React from 'react'
import {useCartStore} from "../store/useCartStore"
import EmptyCart from '../components/EmptyCart';
import CartItem from '../components/CartItem';
import PeopleAlsoBought from '../components/PeopleAlsoBought';
const CartPage = () => {
    const {cart} = useCartStore();
  return (
    <div className='h-full py-3 px-3'>
     {
  cart.length === 0 ? (<EmptyCart />) : (
    cart.map(item => (
      <CartItem key={item._id} item={item}/>
    ))
  ) 
}
{
    cart.length > 0 && <PeopleAlsoBought />
}
    </div>
  )
}

export default CartPage