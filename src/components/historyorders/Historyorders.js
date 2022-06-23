import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Alert from '../../utiles/alert/Alert'
import './historyorders.css'

const Historyorders = ({ setswitsh }) => {

    const [orders, setorders] = useState([])
    const [response, setresponse] = useState({ type: "", message: "", isExist: false , action:null})
    const user = useSelector((state) => state.user.user)
    const access = useSelector((state) => state.user.access)

    useEffect(() => {
        const handlorders = async () => {
            const { id } = user
            const response = await fetch(`https://imade-store.herokuapp.com/orders/order/${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access,
                },
            })
            const data = await response.json()
            if (response.status === 200) {
                setorders(data)
            } else {
                setresponse({ type: "error", message: "faild to load your orders , plais login", isExist: true , action:'login' })
                
            }
        }
        handlorders()

    }, [access, user, setswitsh])

    return (
        <div className='hostoryorders-container'>
            <div className='current-orders'>
                <div className='order-body'>
                    {
                        orders.length > 0 &&
                        orders.map((el, index) =>
                        (
                            < div className='p_product_order' key={index}>
                                <div className='p_customer_detail'>
                                    <div className='p_customer_name'>
                                        orderd by {el.username}
                                    </div>
                                    <div className='p_ordered_at'>
                                        {el.placed_at.split('.')[0].replace('T', ' ')}
                                    </div>
                                </div>
                                <div className='p_product_detail '>
                                    {
                                        <div className='p_self_product p_p-nomination' >
                                            <div className='p_p-name'> P Name</div>
                                            <div className='p_p-price'> P </div>
                                            <div className='p_p-quantitty'> Q </div>
                                            <div className='p_p-product_total'>P * Q</div>
                                        </div>
                                    }
                                    {
                                        el['listorder'].map((el, index) =>
                                        (
                                            <div className='p_self_product' key={index}>
                                                <div className='p_p-name'>{el.name}</div>
                                                <div className='p_p-price'>{el.price}</div>
                                                <div className='p_p-quantitty'>{el.quantity}</div>
                                                <div className='p_p-product_total'>{(el.price * el.quantity).toFixed(1)} $</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                   
                </div>
            </div>
            {response.isExist && <Alert setresponse={setresponse} response={response} />}
        </div>
    )
}

export default Historyorders