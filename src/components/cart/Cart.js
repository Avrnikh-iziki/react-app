import React, { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { deletteItem, increment, decrement, reset, logout } from '../../redux/slice'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Alert from '../../utiles/alert/Alert'
import { Navigate } from 'react-router-dom'
import './cart.css'
import '../orders/order.css'


const Cart = () => {

    const [response, setresponse] = useState({ type: "", message: "", isExist: false })
    const items = useSelector((state) => state.cart.items)
    const totaleItems = useSelector((state) => state.cart.allItems)
    const user = useSelector((state) => state.user.user)
    const access = useSelector((state) => state.user.access)
    const total = items.reduce((a, b) => a + (b.quantity * b.price), 0).toFixed(2)

    const dispatch = useDispatch()

    const handleAddItem = useCallback(
        (item) => () => {
            dispatch(deletteItem(item))
        }
        , [dispatch])

    const handleIncrement = useCallback(
        (item) => () => {
            dispatch(increment(item))
        }
        , [dispatch])

    const handleDecrement = useCallback(
        (item) => () => {
            dispatch(decrement(item))
        }
        , [dispatch])

    const handlechekout = async () => {

        const { id, ...order } = user
        const list_product = items.map(el => ({ "name": el.name, "price": el.price, "quantity": el.quantity }))
        order["customer_id"] = id
        order["total"] = total
        order["listorder"] = list_product
        const response = await fetch('https://imade-store.herokuapp.com/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access,
            },
            body: JSON.stringify(order),
        })

        if (response.status === 201) {
            setresponse({ type: "success", message: "your order has been placed successfully!!", isExist: true })

            setTimeout(() => {
                window.location = '/'
                dispatch(reset())
            }, 3000)
        } else {
            setresponse({ type: "error", message: "faild to depose your order please try again later", isExist: true })
            setTimeout(() => {
                Navigate('/signin')
                dispatch(logout())
            }, 3000)
        }
    }

    return (
        <>
            {
                totaleItems > 0
                    ? <>
                        <div className='cart'>
                            {
                                items.map((el, index) => {
                                    return <div key={index} className="cart-container">
                                        <div className='image'>
                                            <img className='cartimage' src={`${el.image}`} alt="procductimage" />
                                        </div>
                                        <div className='info'>
                                            <div className='name gradient__text '>
                                                {el.name.length > 17 ? el.name.substring(0, 16) + " ..." : el.name}
                                            </div>
                                            <div className='price'>
                                                <span> {el.price} $</span>
                                            </div>
                                            <div className='quantity'>
                                                <button onClick={handleIncrement(el)}>+</button>
                                                {el.quantity}
                                                <button onClick={handleDecrement(el)}>-</button>
                                            </div>
                                        </div>
                                        <div className='cartdescription'>
                                            {el.description.substring(0, 50) + '...'}
                                        </div>
                                        <div className='delette'>
                                            <div>
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        onClick={handleAddItem(el)}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }

                        </div>
                        <div className='totale'>
                            <div className='inner'>
                                <div>
                                    <span>
                                        total :
                                    </span>
                                    {total} $
                                </div>
                                <button onClick={handlechekout}>
                                    chek out
                                </button>
                            </div>
                        </div>
                        {response.isExist && <Alert setresponse={setresponse} response={response} />} </>
                    : <div className='cartempty'> cart is empty !! </div>
            }
        </>
    )
}

export default Cart