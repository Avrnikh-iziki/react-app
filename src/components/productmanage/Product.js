import React, { useCallback, useEffect, useState } from 'react'
import './product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Alert from '../../utiles/alert/Alert';

const Product = ({ setTotalPages, page , setswitsh , setitem}) => {
    const [products, setProduct] = useState([])
    const [response, setresponse] = useState({ type: "", message: "", isExist: false , action:null })
    const access = useSelector((state) => state.user.access)

    const handlUpdate = useCallback(
        (item) => () => {
            setswitsh('update-product')
            setitem(item)
        }
        , [setitem, setswitsh])

    const handlDelete = useCallback(
        (product) => () => {
            try {
                const products = async () => {
                    const data = await fetch(`https://imade-store.herokuapp.com/products/edit/${product.id}/`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access,
                        },
                    })

                    if (data.status === 204) window.location.reload(true)
                    else setresponse({ type: "error", message: "failed to delete  product , please login and try again!!", isExist: true , action:"login" })
                }
                products()
            } catch (err) {
                setresponse({ type: "error", message: "failed to delete  product , please login and try again!!", isExist: true, action:"login" })
            }
        }
        , [access])

    useEffect(() => {
        try {
            const products = async () => {
                const data = await fetch(`https://imade-store.herokuapp.com/products/${page}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                const { product, pages } = await data.json()
                setProduct(product)
                setTotalPages(pages)
            }
            products()
        } catch (err) {
            setresponse({ type: "error", message: "failed to load data , please login and try again!!", isExist: true, action:"login" })
        }
        window.scrollTo(0, 0)
    }, [page, setTotalPages])

    return (
        <>
            {response.isExist && <Alert setresponse={setresponse} response={response} />}
            <div className='con'>
                {
                    products.map((el, index) => (
                        <div className="card" key={index}>
                            <div className='card_image' style={{
                                backgroundImage: `url(${el.image})`
                            }}>
                            </div>
                            <div className='details'>
                                <div className='title gradient__text '>{el.name}</div>
                                <div className='description'>{el.description.substring(0, 120)}...</div>
                                <div className='reflexionSection'>
                                    <div className='buy'>
                                        <div onClick={handlDelete(el)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </div>
                                        <div onClick={handlUpdate(el)}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </div>
                                    </div>
                                    <div className='homeprice'><p> {el.price} $ </p></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Product