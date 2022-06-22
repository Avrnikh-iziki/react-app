import React, { lazy, Suspense, useState } from 'react'
import Pagination from '../components/pagination/Pagination'
import LoadingSpinner from '../components/spinner/Spinner'
//const Header = lazy(() => import('../components/header/Header'))
import Header from '../components/header/Header'
const Products = lazy(() => import('../components/products/Products'))
function Home() {

  const [numberOfPages, setTotalPages] = useState(0)
  const [page, setpage] = useState(1)

  return (
    <>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        < Products setTotalPages={setTotalPages} page={page} />
      </Suspense>
      { numberOfPages > 0 && <Pagination numberOfPages={numberOfPages} page={page} setpage={setpage} />}
    </>
  )
}

export default Home