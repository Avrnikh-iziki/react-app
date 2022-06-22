import { Outlet } from "react-router-dom";
import Navbar from '../components/navbar/Navbar'
import Fotter from "../components/fotter/Fotter";
import { useSelector } from "react-redux";

const SharedLayoute = () => {
   const totaleItems = useSelector(state => state.cart.allItems)
    return (
        <>
            <Navbar totaleItems={totaleItems} />
            <Outlet />
            <Fotter />
        </>
    )
}

export default SharedLayoute