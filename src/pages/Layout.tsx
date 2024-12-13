import { Outlet, useLocation, useNavigate } from "react-router";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { toast } from "react-toastify";


const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('PLAYER_APP_TOKEN');
        if (!token) {
            toast.info('Unauthorized, pls login')
            navigate('/login')
        }
    }, [location.pathname])
    return (
        <>
            <div>
                <Navbar />
                <div className="mx-auto md:max-w-[50%] mt-10">
                    <Outlet />
                </div>

            </div>
        </>
    )
}

export default Layout;