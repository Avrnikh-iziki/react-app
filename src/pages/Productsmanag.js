import React, { useState, lazy, Suspense, useCallback } from 'react'
import Pagination from '../components/pagination/Pagination'
import LoadingSpinner from '../components/spinner/Spinner'
import './productsmanage.css'
import Addproduct from '../components/addproduct/Addproduct'
const Product = lazy(() => import('../components/productmanage/Product'))

const Productsmanag = () => {

    const [switsh, setswitsh] = useState('product')
    const [numberOfPages, setTotalPages] = useState(0)
    const [item, setitem] = useState({})
    const [page, setpage] = useState(1)

    const handlactive = useCallback(
        (active) => () => {
            setswitsh(active)
        }
        , [])


    return (
        <>
            <div className='menu-product'>
                <span className={switsh === "product" ? " product-ch act" : "product-ch"} onClick={handlactive('product')} > Your Product</span>
                <span className={switsh === "add-product" ? " product-ch act" : "product-ch"} onClick={handlactive('add-product')} >Add New Product</span>
            </div>
            {switsh === "product" &&
                <>
                    <Suspense fallback={<LoadingSpinner />}>
                        <Product setTotalPages={setTotalPages} page={page} setswitsh={setswitsh} setitem={setitem} />
                    </Suspense>
                    {numberOfPages > 0 && <Pagination numberOfPages={numberOfPages} page={page} setpage={setpage} />}

                </>
            }
            {
                switsh === "add-product" &&
                <Addproduct />
            }
            {
                switsh === "update-product" &&
                <Addproduct id={item.id} Name={item.name} Price={item.price} Description={item.description} Image={`${item.image}`} update={true} />
            }
        </>
    )
}

export default Productsmanag