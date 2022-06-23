
import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Cart from './pages/Cart';
import SharedLayoute from './utiles/SharedLayoute'
import ProtectedRoute from './utiles/ProtectedRoute'
import { useSelector, useDispatch } from 'react-redux'
import { logout, login } from './redux/slice';
import Orders from './pages/Orders';
import Productsmanag from './pages/Productsmanag';


function App() {

  const dispatch = useDispatch()
  const isRefresh = useSelector((state) => state.user.refresh)
  const isSuperUser = useSelector((state) => state.user.isSuperUser)
  const [user, setUser] = useState(useSelector((state) => state.user.isAuth))

  const updateToken = useCallback(async () => {

    try {
      const response = await fetch('https://imade-store.herokuapp.com/auth/token/refresh/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 'refresh': isRefresh })
        })

      const { access, refresh } = await response.json()
      if (response.status === 200) dispatch(login({ access, refresh }))
      else {
        dispatch(logout())
        window.location = "/"
      }
    } catch (err) {
      dispatch(logout())
      window.location = "/"
    }

  }, [dispatch, isRefresh])

  useEffect(() => {
    const interval = setInterval(() => {
      isRefresh && updateToken()
    }, 1000 * 60 * 14)
    return () => clearInterval(interval)
  }, [isRefresh, updateToken])


  useEffect(() => {
    window.addEventListener('storage', () => {
      window.location = '/'
    }, false)
    window.scrollTo(0, 0)
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayoute />}>
          <Route index element={<Home />} />
          <Route path='signin' element={<Signin setUser={setUser}></Signin>} />
          <Route path='signup' element={<Signup setUser={setUser}></Signup>} />
          <Route path='cart' element={
            <ProtectedRoute user={user} >
              <Cart />
            </ProtectedRoute>}
          />
          <Route path='orders' element={
            <ProtectedRoute user={isSuperUser}  >
              < Orders />
            </ProtectedRoute>}
          />
          <Route path='products' element={
            <ProtectedRoute user={isSuperUser}  >
              <Productsmanag />
            </ProtectedRoute>}
          />
          <Route path='*' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
