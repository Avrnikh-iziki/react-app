import React, { useState, useCallback } from 'react'
import Request from '../components/cart/Cart'
import './cart.css'
import Historyorders from '../components/historyorders/Historyorders'
function Cart() {
  const [switsh, setswitsh] = useState("your-orders")
  const handlswitch = useCallback(
    (el) => () => {
      setswitsh(el)
    }
    , [])

  return (
    <>
      <div className='top-button'>
        <div className={switsh === "your-orders" ? "order active" : "order"} onClick={handlswitch("your-orders")}> Your Orders</div>
        <div className={switsh === "order-in-process" ? "order  active" : "order"} onClick={handlswitch("order-in-process")}>Orders In process</div>
      </div>
      {
        switsh === "your-orders" &&
        < Request />
      }
      {
        switsh === "order-in-process" &&
        <Historyorders setswitsh={setswitsh} />
      }
    </>
  )
}

export default Cart