import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/slice'
import './order.css'
import Alert from '../../utiles/alert/Alert'

const Order = () => {

    const dispatch = useDispatch()
    const access = useSelector((state) => state.user.access)
    const [orders, setorders] = useState([])
    const [allorders, setallorders] = useState(-1)
    const [response, setresponse] = useState({ type: "", message: "", isExist: false , action:null })


    const handlchek = useCallback(
        (product) => async () => {
            try {
                const products = async () => {
                    const data = await fetch(`https://imade-store.herokuapp.com/orders/${product.id}/`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access,
                        },
                        body: JSON.stringify(product)
                    })
                    if (data.status === 200) window.location.reload(true)
                    else setresponse({ type: "error", message: "failed to archive order , please login and  try again!!", isExist: true , action:"login" })
                }
                products()
            } catch (err) {
                setresponse({ type: "error", message: "failed to archive order , please login and  try again!!", isExist: true, action:"login" })
            }
        }
        , [access])

    const handldelete = useCallback(
        (product) => async () => {
            try {
                const products = async () => {
                    const data = await fetch(`https://imade-store.herokuapp.com/orders/${product.id}/`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access,
                        },
                    })

                    if (data.status === 204) window.location.reload(true)
                    else setresponse({ type: "error", message: "failed to delete order , please  login and try again!!", isExist: true, action:"login" })
                }
                products()
            } catch (err) {
                setresponse({ type: "error", message: "failed to delete order , please  login and try again!!", isExist: true , action:"login"})
            }
        }
        , [access])

    useEffect(() => {
        try {
            const products = async () => {
                const data = await fetch(`https://imade-store.herokuapp.com/orders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + access,
                    },
                })
                const { order } = await data.json()
                setallorders(order?.length)
                setorders(order)
                if (data.status === 401) {
                    dispatch(logout())
                    window.location = '/signin'
                }
            }

            products()
        } catch (err) {
            setresponse({ type: "error", message: "faild to load data , please login", isExist: true, admin: true ,  action:"login"})
        }
    }, [access, dispatch])

    return (
        <>
            {allorders > 0
                ? <div className='product_container'>
                    <div className='order_title'> <p>your orders {allorders > 0 && <span>{allorders}</span>}</p></div>
                    {response.isExist && <Alert setresponse={setresponse} response={response} />}

                    {
                        orders.map((el, index) => {
                            return <div className='product_order' key={index}>
                                <div className='customer_detail'>
                                    <div className='customer_name'>{el.username}</div>
                                    <div className='customer_email'>{el.email}</div>
                                    <div className='customer_phone'>{el.phone_number}</div>
                                    <div className='ordered_at'>{el.placed_at.split('.')[0].replace('T', ' ')}</div>
                                </div>
                                <div className='product_detail '>
                                    {
                                        <div className='self_product p-nomination' >
                                            <div className='p-name'> P Name</div>
                                            <div className='p-price'> P </div>
                                            <div className='p-quantitty'> Q </div>
                                            <div className='p-product_total'>P * Q</div>
                                        </div>
                                    }
                                    {
                                        el['listorder'].map((el, index) => {
                                            return <div className='self_product' key={index}>
                                                <div className='p-name'>{el.name}</div>
                                                <div className='p-price'>{el.price}</div>
                                                <div className='p-quantitty'>{el.quantity}</div>
                                                <div className='p-product_total'>{(el.price * el.quantity).toFixed(1)} $</div>
                                            </div>
                                        })
                                    }
                                </div>
                                <div className='data_important'>
                                    <div className='customer_totals'>
                                        {el.total} $
                                    </div>
                                    <div className='customer_button'>
                                        <button onClick={handlchek(el)}><FontAwesomeIcon icon={faCheck} /></button>
                                        <button onClick={handldelete(el)}><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                : <div className='product_container empty_order'>
                    you don't have any orders
                </div>
            }
        </>
    )
}

export default Order