import React, { useEffect } from 'react'
import CartDetails from '../../Components/CartDetails/CartDetails'

const Cart = () => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
        <CartDetails/>
    </>
  )
}

export default Cart